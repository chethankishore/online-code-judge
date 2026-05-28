// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import toast from 'react-hot-toast';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await login(email, password);
//       toast.success('Welcome back!');
//       navigate('/dashboard');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <span style={styles.logo}>{'</>'}</span>
//           <h1 style={styles.title}>CodeJudge</h1>
//           <p style={styles.subtitle}>Welcome back, coder</p>
//         </div>

//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             style={styles.input}
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//           />
//           <input
//             style={styles.input}
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//           <button style={styles.button} type="submit" disabled={loading}>
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>

//         <div style={styles.divider}><span>or continue with</span></div>

//         <div style={styles.oauthRow}>
//           <a href={`${API_URL}/api/auth/google`} style={styles.oauthBtn}>
//             <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="20" height="20" alt="Google" />
//             Google
//           </a>
//           <a href={`${API_URL}/api/auth/github`} style={styles.oauthBtn}>
//             <img src="https://www.svgrepo.com/show/512317/github-142.svg" width="20" height="20" alt="GitHub" style={{filter:'invert(1)'}} />
//             GitHub
//           </a>
//         </div>

//         <p style={styles.footer}>
//           No account? <Link to="/register" style={styles.link}>Sign up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: '100vh',
//     background: '#0a0a0a',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontFamily: "'Fira Code', monospace",
//   },
//   card: {
//     background: '#111',
//     border: '1px solid #222',
//     borderRadius: '12px',
//     padding: '48px 40px',
//     width: '100%',
//     maxWidth: '420px',
//   },
//   header: { textAlign: 'center', marginBottom: '32px' },
//   logo: { fontSize: '32px', color: '#00ff88' },
//   title: { color: '#fff', fontSize: '28px', margin: '8px 0 4px', fontWeight: 700 },
//   subtitle: { color: '#555', fontSize: '14px', margin: 0 },
//   form: { display: 'flex', flexDirection: 'column', gap: '12px' },
//   input: {
//     background: '#1a1a1a',
//     border: '1px solid #2a2a2a',
//     borderRadius: '8px',
//     padding: '12px 16px',
//     color: '#fff',
//     fontSize: '14px',
//     outline: 'none',
//     fontFamily: "'Fira Code', monospace",
//   },
//   button: {
//     background: '#00ff88',
//     color: '#000',
//     border: 'none',
//     borderRadius: '8px',
//     padding: '13px',
//     fontSize: '15px',
//     fontWeight: 700,
//     cursor: 'pointer',
//     marginTop: '4px',
//     fontFamily: "'Fira Code', monospace",
//   },
//   divider: {
//     textAlign: 'center',
//     color: '#333',
//     margin: '24px 0',
//     fontSize: '13px',
//   },
//   oauthRow: { display: 'flex', gap: '12px' },
//   oauthBtn: {
//     flex: 1,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '8px',
//     background: '#1a1a1a',
//     border: '1px solid #2a2a2a',
//     borderRadius: '8px',
//     padding: '11px',
//     color: '#fff',
//     fontSize: '14px',
//     textDecoration: 'none',
//     fontFamily: "'Fira Code', monospace",
//   },
//   footer: { textAlign: 'center', color: '#555', fontSize: '14px', marginTop: '24px' },
//   link: { color: '#00ff88', textDecoration: 'none' },
// };




// frontend/src/pages/Login.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// --- Blood Canvas & Cursed Lines (same as in LandingPage) ---
function BloodCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const drips = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -Math.random() * 300,
      speed: 0.3 + Math.random() * 1.4,
      width: 1.5 + Math.random() * 5,
      length: 50 + Math.random() * 160,
      alpha: 0.3 + Math.random() * 0.7,
      splat: false, splatR: 0,
      splatMax: 5 + Math.random() * 15,
    }));

    const embers = Array.from({ length: 150 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.5 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.7,
      vy: -(0.2 + Math.random() * 1),
      alpha: Math.random(),
      type: Math.random() > 0.65 ? 'blue' : 'red',
    }));

    const stains = Array.from({ length: 10 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 80 + Math.random() * 200,
      alpha: 0.02 + Math.random() * 0.06,
    }));

    let frame;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stains.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,0,0,${s.alpha})`;
        ctx.fill();
      });
      drips.forEach(d => {
        if (!d.splat) {
          const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
          grad.addColorStop(0, `rgba(180,0,0,${d.alpha})`);
          grad.addColorStop(0.6, `rgba(120,0,0,${d.alpha * 0.8})`);
          grad.addColorStop(1, `rgba(80,0,0,0)`);
          ctx.beginPath();
          ctx.moveTo(d.x - d.width / 2, d.y);
          ctx.quadraticCurveTo(d.x + d.width * 0.8, d.y + d.length * 0.5, d.x, d.y + d.length);
          ctx.lineWidth = d.width;
          ctx.strokeStyle = grad;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(d.x, d.y + d.length, d.width * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140,0,0,${d.alpha * 0.5})`;
          ctx.fill();
          d.y += d.speed;
          if (d.y + d.length > canvas.height) d.splat = true;
        } else {
          d.splatR += 0.6;
          ctx.beginPath();
          ctx.arc(d.x, canvas.height - 2, d.splatR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(100,0,0,${0.4 * (1 - d.splatR / d.splatMax)})`;
          ctx.fill();
          if (d.splatR >= d.splatMax) {
            d.y = -Math.random() * 300;
            d.x = Math.random() * canvas.width;
            d.splat = false; d.splatR = 0;
            d.speed = 0.3 + Math.random() * 1.4;
          }
        }
      });
      embers.forEach(e => {
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fillStyle = e.type === 'red'
          ? `rgba(255,${30 + Math.floor(e.alpha * 50)},0,${e.alpha * 0.7})`
          : `rgba(0,${80 + Math.floor(e.alpha * 80)},${180 + Math.floor(e.alpha * 75)},${e.alpha * 0.45})`;
        ctx.fill();
        e.x += e.vx; e.y += e.vy; e.alpha -= 0.003;
        if (e.y < 0 || e.alpha <= 0) {
          e.y = canvas.height + 10;
          e.x = Math.random() * canvas.width;
          e.alpha = 0.3 + Math.random() * 0.7;
        }
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}

function CursedLines() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const lines = Array.from({ length: 7 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * Math.PI * 2,
      speed: 0.006 + Math.random() * 0.01,
      len: 120 + Math.random() * 350,
      alpha: 0, dir: 1,
      col: Math.random() > 0.5 ? '0,100,220' : '170,0,0',
    }));
    let frame;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lines.forEach(l => {
        l.alpha += 0.007 * l.dir;
        if (l.alpha >= 0.5) l.dir = -1;
        if (l.alpha <= 0) {
          l.dir = 1;
          l.x = Math.random() * canvas.width;
          l.y = Math.random() * canvas.height;
          l.angle = Math.random() * Math.PI * 2;
          l.len = 120 + Math.random() * 350;
        }
        l.angle += l.speed;
        const x2 = l.x + Math.cos(l.angle) * l.len;
        const y2 = l.y + Math.sin(l.angle) * l.len;
        const g = ctx.createLinearGradient(l.x, l.y, x2, y2);
        g.addColorStop(0, `rgba(${l.col},0)`);
        g.addColorStop(0.5, `rgba(${l.col},${l.alpha})`);
        g.addColorStop(1, `rgba(${l.col},0)`);
        ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(x2, y2);
        ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
      });
      frame = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} />;
}
// ------------------------------------------------------------

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onMouse = useCallback((e) => setMouse({ x: e.clientX, y: e.clientY }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back, sorcerer.', { style: { background: '#1a0000', color: '#ff4444', border: '1px solid #8b0000' } });
      navigate('/problems');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to enter the domain', { style: { background: '#1a0000', color: '#ff4444' } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BloodCanvas />
      <CursedLines />
      
      {/* Mouse aura */}
      <div style={{
        position: 'fixed',
        left: mouse.x - 180, top: mouse.y - 180,
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, #ff00000e 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
        transition: 'left 0.08s, top 0.08s',
      }} />

      <div onMouseMove={onMouse} style={{
        minHeight: '100vh',
        background: '#030000',
        fontFamily: "'Cinzel', serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 3,
      }}>
        {/* Decorative scanlines */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 4, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,#00000008 3px,#00000008 4px)',
        }} />
        <div style={{
          position: 'fixed', left: 0, right: 0, height: 2,
          background: 'linear-gradient(to right,transparent,#ff00001a,transparent)',
          zIndex: 4, pointerEvents: 'none',
          animation: 'scanDown 9s linear infinite',
        }} />

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@700;900&family=Fira+Code:wght@300;400;600&display=swap');
          @keyframes scanDown { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
          @keyframes bloodPulse { 0%,100%{box-shadow:0 0 20px #ff000066,0 0 40px #ff000022} 50%{box-shadow:0 0 60px #ff0000cc,0 0 100px #ff000055} }
          @keyframes borderBleed { 0%,100%{border-color:#8b000044} 50%{border-color:#ff0000aa} }
          @keyframes glitchX { 0%,100%{transform:translateX(0)} 8%{transform:translateX(-2px)} 16%{transform:translateX(2px)} 24%{transform:translateX(0)} }
        `}</style>

        <div style={{
          width: '100%',
          maxWidth: 500,
          padding: '20px',
          animation: 'fadeUp 0.8s ease forwards',
        }}>
          <div style={{
            background: 'linear-gradient(145deg, #0a0000, #130000)',
            border: '1px solid #8b000066',
            borderRadius: 12,
            padding: '48px 40px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(139,0,0,0.2)',
          }}>
            {/* Top blood glow */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: 'linear-gradient(to right, transparent, #ff000088, transparent)',
            }} />

            {/* Icon */}
            <div style={{
              textAlign: 'center', marginBottom: 32,
              animation: 'glitchX 5s infinite',
            }}>
              <div style={{
                fontSize: 56, filter: 'drop-shadow(0 0 20px #ff0000)',
                display: 'inline-block',
              }}>⚔</div>
              <div style={{
                fontSize: 12, color: '#ff444455', letterSpacing: '0.6em',
                marginTop: 8, fontFamily: "'Cinzel', serif",
              }}>DOMAIN LOGIN</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 24 }}>
                <label style={{
                  display: 'block', color: '#aa4444', fontSize: 12,
                  letterSpacing: '0.3em', marginBottom: 8,
                  fontFamily: "'Cinzel', serif",
                }}>CURSED ID</label>
                <input
                  type="email"
                  placeholder="sorcerer@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: '#1a0000',
                    border: '1px solid #8b0000',
                    borderRadius: 4,
                    padding: '14px 16px',
                    color: '#fff',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 14,
                    outline: 'none',
                    transition: 'all 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff0000'}
                  onBlur={(e) => e.target.style.borderColor = '#8b0000'}
                />
              </div>

              <div style={{ marginBottom: 32 }}>
                <label style={{
                  display: 'block', color: '#aa4444', fontSize: 12,
                  letterSpacing: '0.3em', marginBottom: 8,
                  fontFamily: "'Cinzel', serif",
                }}>CURSED SEAL</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    background: '#1a0000',
                    border: '1px solid #8b0000',
                    borderRadius: 4,
                    padding: '14px 16px',
                    color: '#fff',
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 14,
                    outline: 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff0000'}
                  onBlur={(e) => e.target.style.borderColor = '#8b0000'}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #6b0000, #cc0000)',
                  border: '1px solid #ff000044',
                  color: '#fff',
                  padding: '16px',
                  fontSize: 16,
                  fontFamily: "'Cinzel Decorative', serif",
                  letterSpacing: '0.2em',
                  borderRadius: 4,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  animation: 'bloodPulse 2.5s infinite',
                }}
                className="btn-blood"
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {loading ? 'ENTERING DOMAIN...' : 'UNSEAL THE GATE'}
              </button>
            </form>

            {/* Divider */}
            <div style={{
              margin: '32px 0 20px',
              textAlign: 'center',
              color: '#8b000044',
              fontSize: 11,
              letterSpacing: '0.3em',
              position: 'relative',
            }}>
              <span style={{ background: '#130000', padding: '0 16px' }}>OR</span>
              <div style={{
                position: 'absolute', top: '50%', left: 0, right: 0,
                height: 1, background: '#8b000033', zIndex: -1,
              }} />
            </div>

            {/* OAuth Buttons */}
            <div style={{ display: 'flex', gap: 16 }}>
              <a
                href="http://localhost:5000/api/auth/google"
                className="oauth-btn"
                style={{
                  flex: 1,
                  background: '#1a0000',
                  border: '1px solid #8b000066',
                  borderRadius: 4,
                  padding: '12px',
                  textAlign: 'center',
                  color: '#ff8888',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ff0000'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#8b000066'; e.currentTarget.style.color = '#ff8888'; }}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="16" height="16" alt="Google" />
                Google
              </a>
              <a
                href="http://localhost:5000/api/auth/github"
                className="oauth-btn"
                style={{
                  flex: 1,
                  background: '#1a0000',
                  border: '1px solid #8b000066',
                  borderRadius: 4,
                  padding: '12px',
                  textAlign: 'center',
                  color: '#ff8888',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontFamily: "'Cinzel', serif",
                  letterSpacing: '0.1em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ff0000'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#8b000066'; e.currentTarget.style.color = '#ff8888'; }}
              >
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" width="16" height="16" alt="GitHub" style={{ filter: 'invert(1)' }} />
                GitHub
              </a>
            </div>

            {/* Register link */}
            <div style={{
              marginTop: 32,
              textAlign: 'center',
              color: '#884444',
              fontSize: 13,
              fontFamily: "'Cinzel', serif",
            }}>
              No cursed mark?{' '}
              <Link to="/register" style={{
                color: '#ff6666',
                textDecoration: 'none',
                borderBottom: '1px dashed #ff0000',
                transition: 'color 0.2s',
              }} onMouseEnter={(e) => e.target.style.color = '#ff0000'} onMouseLeave={(e) => e.target.style.color = '#ff6666'}>
                Forge your Oath
              </Link>
            </div>
          </div>

          {/* Rune footer */}
          <div style={{
            textAlign: 'center', marginTop: 24,
            color: '#8b000033', fontSize: 12,
            letterSpacing: '0.4em', fontFamily: 'serif',
          }}>
            ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ
          </div>
        </div>
      </div>

      <style>{`
        .oauth-btn {
          transition: all 0.2s ease;
        }
        .oauth-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 12px #ff000044;
        }
        .btn-blood {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .btn-blood:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px #ff000066;
        }
      `}</style>
    </>
  );
}