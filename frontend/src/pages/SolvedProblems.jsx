import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';

// Blood Canvas & Cursed Lines (same as other pages – reuse or include here)
// For brevity, I'm including them inline. You can move to a shared component later.

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

export default function SolvedProblems() {
  const [solved, setSolved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolved = async () => {
      try {
        const res = await api.get('/auth/solved');
        setSolved(res.data.solved);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load solved problems');
      } finally {
        setLoading(false);
      }
    };
    fetchSolved();
  }, []);

  const onMouse = useCallback((e) => setMouse({ x: e.clientX, y: e.clientY }), []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const difficultyColor = (d) => {
    if (d === 'Easy') return '#00ff88';
    if (d === 'Medium') return '#ffaa00';
    return '#ff4444';
  };

  if (loading) return <div style={styles.loading}>Loading vanquished curses...</div>;

  return (
    <>
      <BloodCanvas />
      <CursedLines />
      <div style={{
        position: 'fixed', left: mouse.x - 180, top: mouse.y - 180,
        width: 360, height: 360, borderRadius: '50%',
        background: 'radial-gradient(circle, #ff00000e 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 2,
        transition: 'left 0.08s, top 0.08s',
      }} />
      <div onMouseMove={onMouse} style={styles.container}>
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
        `}</style>

        <nav style={styles.nav}>
          <span style={styles.logo}>{'</>'} CodeJudge</span>
          <div style={styles.navRight}>
            <span style={styles.username}>👤 {user?.firstName || user?.username}</span>
            <button onClick={() => navigate('/problems')} style={styles.navBtn}>Problems</button>
            <button onClick={() => navigate('/dashboard')} style={styles.navBtn}>Dashboard</button>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </nav>

        <div style={styles.main}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 14, color: '#ff444455', letterSpacing: '0.4em', marginBottom: 8, fontFamily: "'Cinzel', serif" }}>
              VANQUISHED CURSES
            </div>
            <h1 style={styles.title}>Solved Problems</h1>
          </div>

          {solved.length === 0 ? (
            <div style={styles.empty}>You haven't conquered any domains yet.</div>
          ) : (
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <span style={{ flex: 0.5 }}>#</span>
                <span style={{ flex: 4 }}>Title</span>
                <span style={{ flex: 1.5 }}>Difficulty</span>
                <span style={{ flex: 1.5 }}>Category</span>
                <span style={{ flex: 1 }}>Points</span>
                <span style={{ flex: 2 }}>Date</span>
              </div>
              {solved.map((problem, idx) => (
                <div
                  key={problem._id}
                  style={styles.tableRow}
                  onClick={() => navigate(`/problems/${problem._id}`)}
                  title="Re-enter domain"
                >
                  <span style={{ flex: 0.5, color: '#884444' }}>{idx + 1}</span>
                  <span style={{ flex: 4, color: '#fff' }}>{problem.title}</span>
                  <span style={{ flex: 1.5, color: difficultyColor(problem.difficulty) }}>
                    {problem.difficulty}
                  </span>
                  <span style={{ flex: 1.5, color: '#ff8888' }}>{problem.category || 'Other'}</span>
                  <span style={{ flex: 1, color: '#ffaa00' }}>{problem.points}</span>
                  <span style={{ flex: 2, color: '#aaa', fontSize: 12 }}>
                    {new Date(problem.solvedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{
          textAlign: 'center', marginTop: 48, paddingBottom: 32,
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
    position: 'relative',
    zIndex: 3,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 48px',
    background: 'linear-gradient(to bottom, #06000099, transparent)',
    borderBottom: '1px solid #8b000020',
    position: 'relative',
    zIndex: 10,
  },
  logo: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: 18,
    fontWeight: 900,
    color: '#ff2200',
    textShadow: '0 0 20px #ff0000aa',
    letterSpacing: '0.1em',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  username: {
    color: '#ff8888',
    fontSize: 13,
    letterSpacing: '0.1em',
  },
  navBtn: {
    background: 'transparent',
    border: '1px solid #8b000066',
    color: '#ff8888',
    padding: '8px 20px',
    borderRadius: 3,
    cursor: 'pointer',
    fontFamily: "'Cinzel', serif",
    fontSize: 12,
    letterSpacing: '0.15em',
    transition: 'all 0.2s',
  },
  logoutBtn: {
    background: '#1a0000',
    border: '1px solid #ff000033',
    color: '#ff8888',
    padding: '8px 20px',
    borderRadius: 3,
    cursor: 'pointer',
    fontFamily: "'Cinzel', serif",
    fontSize: 12,
    letterSpacing: '0.15em',
    transition: 'all 0.2s',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 24px',
    position: 'relative',
    zIndex: 5,
  },
  title: {
    color: '#fff',
    fontSize: 'clamp(32px,6vw,54px)',
    fontWeight: 700,
    fontFamily: "'Cinzel Decorative', serif",
    textShadow: '0 0 20px #ff0000',
    letterSpacing: '0.1em',
  },
  table: {
    background: '#0a0000',
    border: '1px solid #8b000033',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    padding: '16px 24px',
    background: '#1a0000',
    borderBottom: '1px solid #8b000033',
    color: '#ff8888',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
  },
  tableRow: {
    display: 'flex',
    padding: '14px 24px',
    borderBottom: '1px solid #1a0000',
    alignItems: 'center',
    color: '#ccc',
    fontSize: 13,
    transition: 'background 0.2s',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '60px',
    color: '#ff6666',
    fontFamily: "'Cinzel', serif",
  },
  empty: {
    textAlign: 'center',
    padding: '60px',
    color: '#ff8888',
    fontSize: 14,
  },
};