// import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import api from '../api/axios';

// export default function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get('/dashboard');
//         setDashboardData(res.data);
//       } catch (err) {
//         console.error('Dashboard fetch error:', err);
//         setError('Failed to load dashboard data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboard();
//   }, []);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   if (loading) {
//     return (
//       <div style={styles.container}>
//         <nav style={styles.nav}>
//           <span style={styles.logo}>{'</>'} CodeJudge</span>
//         </nav>
//         <div style={styles.loading}>Loading dashboard...</div>
//       </div>
//     );
//   }

//   if (error || !dashboardData) {
//     return (
//       <div style={styles.container}>
//         <nav style={styles.nav}>
//           <span style={styles.logo}>{'</>'} CodeJudge</span>
//         </nav>
//         <div style={styles.error}>{error || 'Something went wrong'}</div>
//       </div>
//     );
//   }

//   const { user: userInfo, stats, solvedByDifficulty, unlockedTiers, recentSubmissions } = dashboardData;

//   return (
//     <div style={styles.container}>
//       <nav style={styles.nav}>
//         <span style={styles.logo}>{'</>'} CodeJudge</span>
//         <div style={styles.navRight}>
//           <button onClick={() => navigate('/problems')} style={styles.navBtn}>Problems</button>
//           <button onClick={() => navigate('/leaderboard')} style={styles.navBtn}>Leaderboard</button>
//           <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
//         </div>
//       </nav>

//       <div style={styles.main}>
//         <div style={styles.welcome}>
//           <h1 style={styles.title}>
//             Welcome back, <span style={styles.name}>{userInfo.firstName || userInfo.username}</span>! 👋
//           </h1>
//           <p style={styles.subtitle}>
//             Total Score: <strong style={{ color: '#00ff88' }}>{userInfo.totalScore}</strong> points
//           </p>
//         </div>

//         <div style={styles.statsGrid}>
//           <div style={styles.statCard}>
//             <div style={{ ...styles.statNum, color: '#00ff88' }}>{solvedByDifficulty.Easy}</div>
//             <div style={styles.statLabel}>Easy Solved</div>
//           </div>
//           <div style={styles.statCard}>
//             <div style={{ ...styles.statNum, color: '#ffaa00' }}>{solvedByDifficulty.Medium}</div>
//             <div style={styles.statLabel}>Medium Solved</div>
//           </div>
//           <div style={styles.statCard}>
//             <div style={{ ...styles.statNum, color: '#ff4444' }}>{solvedByDifficulty.Hard}</div>
//             <div style={styles.statLabel}>Hard Solved</div>
//           </div>
//           <div style={styles.statCard}>
//             <div style={{ ...styles.statNum, color: '#aaa' }}>{stats.totalSubmissions}</div>
//             <div style={styles.statLabel}>Total Submissions</div>
//           </div>
//         </div>

//         <div style={styles.extraStats}>
//           <div style={styles.extraCard}>
//             <div>📊 Acceptance Rate</div>
//             <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>{stats.acceptanceRate}</div>
//           </div>
//           <div style={styles.extraCard}>
//             <div>🏆 Your Rank</div>
//             <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '8px' }}>#{stats.rank}</div>
//           </div>
//         </div>

//         <div style={styles.tiersSection}>
//           <h2 style={styles.sectionTitle}>Your Tiers</h2>
//           <div style={styles.tiersGrid}>
//             {['Easy', 'Medium', 'Hard'].map(tier => {
//               const unlocked = unlockedTiers.includes(tier);
//               const color = tier === 'Easy' ? '#00ff88' : tier === 'Medium' ? '#ffaa00' : '#ff4444';
//               return (
//                 <div key={tier} style={{ ...styles.tierCard, borderColor: unlocked ? color + '44' : '#1a1a1a' }}>
//                   <div style={{ fontSize: '32px' }}>{unlocked ? '🔓' : '🔒'}</div>
//                   <div style={{ color: unlocked ? color : '#444', fontWeight: 700, marginTop: '8px' }}>{tier}</div>
//                   <div style={{ color: '#555', fontSize: '12px', marginTop: '4px' }}>
//                     {unlocked ? 'Unlocked' : 'Complete previous tier'}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {recentSubmissions && recentSubmissions.length > 0 && (
//           <div style={styles.recentSection}>
//             <h2 style={styles.sectionTitle}>Recent Submissions</h2>
//             <div style={styles.submissionsTable}>
//               <div style={styles.tableHeader}>
//                 <span>Problem</span>
//                 <span>Difficulty</span>
//                 <span>Status</span>
//                 <span>Date</span>
//               </div>
//               {recentSubmissions.map(sub => (
//                 <div
//                   key={sub._id}
//                   style={styles.tableRow}
//                   onClick={() => navigate(`/submissions/${sub._id}`)}
//                   title="Click to view full submission details"
//                 >
//                   <span>{sub.problemId?.title || 'Unknown'}</span>
//                   <span style={{
//                     color: sub.problemId?.difficulty === 'Easy' ? '#00ff88'
//                       : sub.problemId?.difficulty === 'Medium' ? '#ffaa00'
//                       : '#ff4444'
//                   }}>
//                     {sub.problemId?.difficulty || '-'}
//                   </span>
//                   <span style={{ color: sub.status === 'Accepted' ? '#00ff88' : '#ff6666' }}>{sub.status}</span>
//                   <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <button onClick={() => navigate('/problems')} style={styles.startBtn}>
//           Continue Solving →
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: { minHeight: '100vh', background: '#0a0a0a', fontFamily: "'Fira Code', monospace" },
//   nav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 32px', borderBottom: '1px solid #1a1a1a', background: '#0d0d0d' },
//   logo: { color: '#00ff88', fontSize: '18px', fontWeight: 700 },
//   navRight: { display: 'flex', gap: '12px' },
//   navBtn: { background: 'transparent', border: '1px solid #222', color: '#aaa', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Fira Code', monospace" },
//   logoutBtn: { background: 'transparent', border: '1px solid #ff444433', color: '#ff4444', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Fira Code', monospace" },
//   main: { maxWidth: '1000px', margin: '0 auto', padding: '60px 24px' },
//   welcome: { marginBottom: '48px' },
//   title: { color: '#fff', fontSize: '32px', fontWeight: 700, margin: '0 0 8px' },
//   name: { color: '#00ff88' },
//   subtitle: { color: '#555', margin: 0, fontSize: '16px' },
//   statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' },
//   statCard: { background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '24px', textAlign: 'center' },
//   statNum: { fontSize: '36px', fontWeight: 700 },
//   statLabel: { color: '#555', fontSize: '12px', marginTop: '4px' },
//   extraStats: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '48px' },
//   extraCard: { background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '24px', textAlign: 'center', color: '#aaa' },
//   tiersSection: { marginBottom: '48px' },
//   sectionTitle: { color: '#fff', fontSize: '18px', marginBottom: '16px' },
//   tiersGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' },
//   tierCard: { background: '#0d0d0d', border: '1px solid', borderRadius: '12px', padding: '24px', textAlign: 'center' },
//   recentSection: { marginBottom: '48px' },
//   submissionsTable: { background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: '12px', overflow: 'hidden' },
//   tableHeader: { display: 'grid', gridTemplateColumns: '3fr 1fr 1.5fr 2fr', padding: '12px 16px', background: '#1a1a1a', color: '#aaa', fontSize: '12px', fontWeight: 600 },
//   tableRow: { display: 'grid', gridTemplateColumns: '3fr 1fr 1.5fr 2fr', padding: '12px 16px', borderBottom: '1px solid #1a1a1a', color: '#aaa', fontSize: '13px', cursor: 'pointer', transition: 'background 0.2s' },
//   startBtn: { background: '#00ff88', color: '#000', border: 'none', padding: '14px 32px', borderRadius: '10px', fontSize: '16px', fontWeight: 700, cursor: 'pointer', fontFamily: "'Fira Code', monospace", width: '100%' },
//   loading: { textAlign: 'center', padding: '60px', color: '#aaa' },
//   error: { textAlign: 'center', padding: '60px', color: '#ff4444' },
// };



// frontend/src/pages/Dashboard.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

// --- Blood Canvas & Cursed Lines (same as in other pages) ---
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

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/dashboard');
        setDashboardData(res.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const onMouse = useCallback((e) => setMouse({ x: e.clientX, y: e.clientY }), []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ background: '#030000', minHeight: '100vh' }}>
        <nav style={styles.nav}>
          <span style={styles.logo}>{'</>'} CodeJudge</span>
        </nav>
        <div style={styles.loading}>Loading dashboard...</div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div style={{ background: '#030000', minHeight: '100vh' }}>
        <nav style={styles.nav}>
          <span style={styles.logo}>{'</>'} CodeJudge</span>
        </nav>
        <div style={styles.error}>{error || 'Something went wrong'}</div>
      </div>
    );
  }

  const { user: userInfo, stats, solvedByDifficulty, unlockedTiers, recentSubmissions } = dashboardData;

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

        <nav style={styles.nav}>
          <span style={styles.logo}>{'</>'} CodeJudge</span>
          <div style={styles.navRight}>
            <button onClick={() => navigate('/problems')} style={styles.navBtn}>Problems</button>
            <button onClick={() => navigate('/leaderboard')} style={styles.navBtn}>Leaderboard</button>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </nav>

        <div style={styles.main}>
          <div style={styles.welcome}>
            <div style={{
              fontSize: 14, color: '#ff444455', letterSpacing: '0.4em',
              marginBottom: 16, fontFamily: "'Cinzel', serif",
            }}>DOMAIN STATS</div>
            <h1 style={styles.title}>
              Welcome back, <span style={styles.name}>{userInfo.firstName || userInfo.username}</span>!
            </h1>
            <p style={styles.subtitle}>
              Cursed Energy: <strong style={{ color: '#ff4444' }}>{userInfo.totalScore}</strong> points
            </p>
          </div>

          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={{ ...styles.statNum, color: '#00ff88' }}>{solvedByDifficulty.Easy}</div>
              <div style={styles.statLabel}>Easy Cleared</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statNum, color: '#ffaa00' }}>{solvedByDifficulty.Medium}</div>
              <div style={styles.statLabel}>Medium Cleared</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statNum, color: '#ff4444' }}>{solvedByDifficulty.Hard}</div>
              <div style={styles.statLabel}>Hard Cleared</div>
            </div>
            <div style={styles.statCard}>
              <div style={{ ...styles.statNum, color: '#aaa' }}>{stats.totalSubmissions}</div>
              <div style={styles.statLabel}>Total Strikes</div>
            </div>
          </div>

          <div style={styles.extraStats}>
            <div style={styles.extraCard}>
              <div>📊 Acceptance Rate</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#ff6666' }}>{stats.acceptanceRate}</div>
            </div>
            <div style={styles.extraCard}>
              <div>🏆 Your Rank</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', marginTop: '8px', color: '#ffaa00' }}>#{stats.rank}</div>
            </div>
          </div>

          <div style={styles.tiersSection}>
            <h2 style={styles.sectionTitle}>Your Domains</h2>
            <div style={styles.tiersGrid}>
              {['Easy', 'Medium', 'Hard'].map(tier => {
                const unlocked = unlockedTiers.includes(tier);
                const color = tier === 'Easy' ? '#00ff88' : tier === 'Medium' ? '#ffaa00' : '#ff4444';
                return (
                  <div key={tier} style={{ ...styles.tierCard, borderColor: unlocked ? color + '44' : '#1a1a1a' }}>
                    <div style={{ fontSize: '32px' }}>{unlocked ? '🔓' : '🔒'}</div>
                    <div style={{ color: unlocked ? color : '#444', fontWeight: 700, marginTop: '8px' }}>{tier}</div>
                    <div style={{ color: '#555', fontSize: '12px', marginTop: '4px' }}>
                      {unlocked ? 'Unlocked' : 'Defeat previous domain'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {recentSubmissions && recentSubmissions.length > 0 && (
            <div style={styles.recentSection}>
              <h2 style={styles.sectionTitle}>Recent Cursed Records</h2>
              <div style={styles.submissionsTable}>
                <div style={styles.tableHeader}>
                  <span>Problem</span>
                  <span>Difficulty</span>
                  <span>Status</span>
                  <span>Date</span>
                </div>
                {recentSubmissions.map(sub => (
                  <div
                    key={sub._id}
                    style={styles.tableRow}
                    onClick={() => navigate(`/submissions/${sub._id}`)}
                    title="View full details"
                  >
                    <span>{sub.problemId?.title || 'Unknown'}</span>
                    <span style={{
                      color: sub.problemId?.difficulty === 'Easy' ? '#00ff88'
                        : sub.problemId?.difficulty === 'Medium' ? '#ffaa00'
                        : '#ff4444'
                    }}>
                      {sub.problemId?.difficulty || '-'}
                    </span>
                    <span style={{ color: sub.status === 'Accepted' ? '#00ff88' : '#ff6666' }}>{sub.status}</span>
                    <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => navigate('/problems')} style={styles.startBtn}>
            Continue the Hunt →
          </button>
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
    gap: '12px',
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
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '60px 24px 40px',
    position: 'relative',
    zIndex: 5,
  },
  welcome: {
    marginBottom: 48,
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 'clamp(28px,5vw,42px)',
    fontWeight: 700,
    margin: '0 0 8px',
    fontFamily: "'Cinzel Decorative', serif",
  },
  name: {
    color: '#ff4444',
    textShadow: '0 0 20px #ff000066',
  },
  subtitle: {
    color: '#884444',
    fontSize: 16,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  statCard: {
    background: 'linear-gradient(145deg, #0a0000, #130000)',
    border: '1px solid #8b000033',
    borderRadius: 8,
    padding: '24px',
    textAlign: 'center',
    transition: 'transform 0.2s',
  },
  statNum: {
    fontSize: '42px',
    fontWeight: 700,
  },
  statLabel: {
    color: '#884444',
    fontSize: '11px',
    letterSpacing: '0.2em',
    marginTop: '8px',
    fontFamily: "'Cinzel', serif",
  },
  extraStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '48px',
  },
  extraCard: {
    background: '#0a0000',
    border: '1px solid #8b000033',
    borderRadius: 8,
    padding: '28px',
    textAlign: 'center',
    color: '#ffaa00',
  },
  tiersSection: {
    marginBottom: '48px',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: '22px',
    marginBottom: '24px',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '0.2em',
    textAlign: 'center',
  },
  tiersGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
  },
  tierCard: {
    background: '#0a0000',
    border: '1px solid',
    borderRadius: 8,
    padding: '28px 16px',
    textAlign: 'center',
    transition: 'transform 0.2s',
  },
  recentSection: {
    marginBottom: '48px',
  },
  submissionsTable: {
    background: '#0a0000',
    border: '1px solid #8b000033',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 1.5fr 2fr',
    padding: '14px 20px',
    background: '#1a0000',
    color: '#ff8888',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.1em',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 1.5fr 2fr',
    padding: '14px 20px',
    borderBottom: '1px solid #1a0000',
    color: '#aaa',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  startBtn: {
    background: 'linear-gradient(135deg, #6b0000, #cc0000)',
    border: '1px solid #ff000044',
    color: '#fff',
    padding: '14px 28px',
    borderRadius: 6,
    fontSize: '16px',
    fontFamily: "'Cinzel Decorative', serif",
    letterSpacing: '0.2em',
    cursor: 'pointer',
    width: '100%',
    transition: 'transform 0.2s, box-shadow 0.2s',
    animation: 'bloodPulse 2.5s infinite',
  },
  loading: {
    textAlign: 'center',
    padding: '60px',
    color: '#ff6666',
    fontFamily: "'Cinzel', serif",
  },
  error: {
    textAlign: 'center',
    padding: '60px',
    color: '#ff4444',
  },
};