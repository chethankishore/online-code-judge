// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios';
// import toast from 'react-hot-toast';
// import { useAuth } from '../context/AuthContext';

// export default function CompleteProfile() {
//   const [form, setForm] = useState({ firstName: '', lastName: '', username: '', password: '', confirmPassword: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { refreshUser } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
//     if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
//     setLoading(true);
//     try {
//       await api.post('/auth/complete-profile', form);
//       await refreshUser();
//       toast.success('Profile complete! Welcome 🎉');
//       navigate('/dashboard');
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <div style={styles.header}>
//           <span style={styles.logo}>{'</>'}</span>
//           <h1 style={styles.title}>One Last Step</h1>
//           <p style={styles.subtitle}>Complete your profile to get started</p>
//         </div>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <div style={styles.row}>
//             <input style={styles.input} name="firstName" placeholder="First Name" value={form.firstName} onChange={onChange} required />
//             <input style={styles.input} name="lastName" placeholder="Last Name" value={form.lastName} onChange={onChange} required />
//           </div>
//           <input style={styles.input} name="username" placeholder="Choose a username" value={form.username} onChange={onChange} required />
//           <input style={styles.input} name="password" type="password" placeholder="Create password (min 6 chars)" value={form.password} onChange={onChange} required />
//           <input style={styles.input} name="confirmPassword" type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={onChange} required />
//           <button style={styles.button} type="submit" disabled={loading}>
//             {loading ? 'Saving...' : 'Complete Setup →'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Fira Code', monospace", padding: '20px' },
//   card: { background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '48px 40px', width: '100%', maxWidth: '440px' },
//   header: { textAlign: 'center', marginBottom: '32px' },
//   logo: { fontSize: '32px', color: '#00ff88' },
//   title: { color: '#fff', fontSize: '28px', margin: '8px 0 4px', fontWeight: 700 },
//   subtitle: { color: '#555', fontSize: '14px', margin: 0 },
//   form: { display: 'flex', flexDirection: 'column', gap: '12px' },
//   row: { display: 'flex', gap: '12px' },
//   input: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none', fontFamily: "'Fira Code', monospace", width: '100%', boxSizing: 'border-box' },
//   button: { background: '#00ff88', color: '#000', border: 'none', borderRadius: '8px', padding: '13px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', marginTop: '4px', fontFamily: "'Fira Code', monospace" },
// };


// frontend/src/pages/CompleteProfile.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

// ---------- Blood Canvas & Cursed Lines (same as other pages) ----------
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
// --------------------------------------------------------------

export default function CompleteProfile() {
  const [form, setForm] = useState({ firstName: '', lastName: '', username: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const onMouse = useCallback((e) => setMouse({ x: e.clientX, y: e.clientY }), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return toast.error('Cursed seals do not match', { style: { background: '#1a0000', color: '#ff4444' } });
    if (form.password.length < 6) return toast.error('Cursed energy must be at least 6 characters', { style: { background: '#1a0000', color: '#ff4444' } });
    setLoading(true);
    try {
      await api.post('/auth/complete-profile', form);
      await refreshUser();
      toast.success('Your oath is complete. Welcome, sorcerer.', { style: { background: '#1a0000', color: '#00ff88' } });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to finalize the pact', { style: { background: '#1a0000', color: '#ff4444' } });
    } finally {
      setLoading(false);
    }
  };

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

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

      <div onMouseMove={onMouse} style={styles.container}>
        {/* Scanlines */}
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
          @keyframes bloodPulse { 0%,100%{box-shadow:0 0 20px #ff000066} 50%{box-shadow:0 0 60px #ff0000cc} }
          @keyframes glitchX { 0%,100%{transform:translateX(0)} 8%{transform:translateX(-2px)} 16%{transform:translateX(2px)} 24%{transform:translateX(0)} }
        `}</style>

        <div style={styles.card}>
          <div style={styles.header}>
            <div style={{
              fontSize: 56, filter: 'drop-shadow(0 0 20px #ff0000)',
              display: 'inline-block', marginBottom: 16,
            }}>⚔</div>
            <h1 style={styles.title}>FORGE YOUR OATH</h1>
            <p style={styles.subtitle}>Complete your cursed profile to enter the arena</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: '#aa4444', fontSize: 11, letterSpacing: '0.3em', marginBottom: 6 }}>FIRST NAME</label>
                <input style={styles.input} name="firstName" placeholder="Yuji" value={form.firstName} onChange={onChange} required />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: '#aa4444', fontSize: 11, letterSpacing: '0.3em', marginBottom: 6 }}>LAST NAME</label>
                <input style={styles.input} name="lastName" placeholder="Itadori" value={form.lastName} onChange={onChange} required />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', color: '#aa4444', fontSize: 11, letterSpacing: '0.3em', marginBottom: 6 }}>CURSED NAME</label>
              <input style={styles.input} name="username" placeholder="sukuna_vessel" value={form.username} onChange={onChange} required />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aa4444', fontSize: 11, letterSpacing: '0.3em', marginBottom: 6 }}>CURSED SEAL</label>
              <input style={styles.input} name="password" type="password" placeholder="••••••••" value={form.password} onChange={onChange} required />
            </div>

            <div>
              <label style={{ display: 'block', color: '#aa4444', fontSize: 11, letterSpacing: '0.3em', marginBottom: 6 }}>CONFIRM SEAL</label>
              <input style={styles.input} name="confirmPassword" type="password" placeholder="••••••••" value={form.confirmPassword} onChange={onChange} required />
            </div>

            <button style={styles.button} type="submit" disabled={loading} className="btn-blood">
              {loading ? 'FORGING OATH...' : 'ᚠ COMPLETE SETUP ᚠ'}
            </button>
          </form>
        </div>

        <div style={{
          textAlign: 'center', marginTop: 32, paddingBottom: 32,
          color: '#8b000033', fontSize: 12, letterSpacing: '0.4em', fontFamily: 'serif',
        }}>
          ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#030000',
    fontFamily: "'Cinzel', serif",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 3,
    padding: '20px',
  },
  card: {
    background: 'linear-gradient(145deg, #0a0000, #130000)',
    border: '1px solid #8b0000aa',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 0 60px rgba(139,0,0,0.2), inset 0 0 20px rgba(255,0,0,0.05)',
    backdropFilter: 'blur(2px)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    color: '#ff4444',
    fontSize: 'clamp(28px,5vw,36px)',
    fontFamily: "'Cinzel Decorative', serif",
    textShadow: '0 0 20px #ff0000',
    letterSpacing: '0.1em',
    marginBottom: '12px',
  },
  subtitle: {
    color: '#ff8888',
    fontSize: '14px',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '0.1em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  row: {
    display: 'flex',
    gap: '16px',
  },
  input: {
    width: '100%',
    background: '#1a0000',
    border: '1px solid #8b0000',
    borderRadius: '8px',
    padding: '12px 16px',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: "'Fira Code', monospace",
    transition: 'border-color 0.2s',
  },
  button: {
    background: 'linear-gradient(135deg, #6b0000, #cc0000)',
    border: '1px solid #ff000044',
    color: '#fff',
    padding: '14px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
    fontFamily: "'Cinzel Decorative', serif",
    letterSpacing: '0.15em',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 0 20px #ff000044',
  },
};

// Add hover effect (global style)
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .btn-blood:hover, button:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px #ff0000aa;
    background: linear-gradient(135deg, #8b0000, #ff0000);
  }
  input:focus {
    border-color: #ff0000;
    box-shadow: 0 0 10px #ff000055;
    outline: none;
  }
`;
document.head.appendChild(styleSheet);