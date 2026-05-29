// // import { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// // import api from '../api/axios';
// // import toast from 'react-hot-toast';
// // import TierLocked from '../components/TierLocked';

// // export default function Problems() {
// //   const [problems, setProblems] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search, setSearch] = useState('');
// //   const [difficulty, setDifficulty] = useState('');
// //   const [category, setCategory] = useState('');
// //   const [unlockedTiers, setUnlockedTiers] = useState(['Easy']);
// //   const [lockedDifficulty, setLockedDifficulty] = useState(null);
// //   const [searchTrigger, setSearchTrigger] = useState(0);
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchProblems = async () => {
// //       setLoading(true);
// //       setLockedDifficulty(null);
// //       try {
// //         const params = {};
// //         if (search) params.search = search;
// //         if (difficulty) params.difficulty = difficulty;
// //         if (category) params.category = category;

// //         const res = await api.get('/problems', { params });
// //         setProblems(res.data.problems || []);
// //         if (res.data.unlockedTiers) setUnlockedTiers(res.data.unlockedTiers);
// //       } catch (err) {
// //         console.error('Failed to fetch problems:', err);
// //         if (err.response?.status === 403) {
// //           setLockedDifficulty(difficulty);
// //           setProblems([]);
// //         } else if (err.response?.status === 401) {
// //           toast.error('Please login to continue');
// //           navigate('/login');
// //         } else {
// //           toast.error('Failed to load problems');
// //           setProblems([]);
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProblems();
// //   }, [difficulty, category, searchTrigger]);

// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     setSearchTrigger(prev => prev + 1);
// //   };

// //   const handleLogout = async () => {
// //     await logout();
// //     navigate('/login');
// //   };

// //   const difficultyColor = (d) => {
// //     if (d === 'Easy') return '#00ff88';
// //     if (d === 'Medium') return '#ffaa00';
// //     return '#ff4444';
// //   };

// //   const handleProblemClick = (problem) => {
// //     if (!unlockedTiers.includes(problem.difficulty)) {
// //       toast.error(`🔒 Complete all Easy problems first to unlock ${problem.difficulty}!`);
// //       return;
// //     }
// //     navigate(`/problems/${problem._id}`);
// //   };

// //   if (loading) return <div style={styles.loading}>Loading problems...</div>;
// //   if (lockedDifficulty) {
// //     const requiredTier = lockedDifficulty === 'Medium' ? 'Easy' : 'Medium';
// //     return <TierLocked difficulty={lockedDifficulty} requiredTier={requiredTier} />;
// //   }

// //   return (
// //     <div style={styles.container}>
// //       <nav style={styles.nav}>
// //         <span style={styles.logo}>{'</>'} CodeJudge</span>
// //         <div style={styles.navRight}>
// //           <span style={styles.username}>👤 {user?.firstName || user?.username}</span>
// //           <button onClick={() => navigate('/dashboard')} style={styles.navBtn}>Dashboard</button>
// //           <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
// //         </div>
// //       </nav>

// //       <div style={styles.main}>
// //         <div style={styles.header}>
// //           <h1 style={styles.title}>Problems</h1>
// //         </div>

// //         <div style={styles.filters}>
// //           <form onSubmit={handleSearch} style={styles.searchForm}>
// //             <input
// //               style={styles.searchInput}
// //               placeholder="Search problems..."
// //               value={search}
// //               onChange={e => setSearch(e.target.value)}
// //             />
// //             <button type="submit" style={styles.searchBtn}>Search</button>
// //           </form>

// //           <div style={styles.diffBtns}>
// //             {['', 'Easy', 'Medium', 'Hard'].map(d => (
// //               <button
// //                 key={d}
// //                 onClick={() => setDifficulty(d)}
// //                 style={{
// //                   ...styles.diffBtn,
// //                   background: difficulty === d ? '#00ff8822' : 'transparent',
// //                   color: difficulty === d ? '#00ff88' : '#555',
// //                   border: difficulty === d ? '1px solid #00ff8844' : '1px solid #222',
// //                 }}
// //               >
// //                 {d || 'All'}
// //               </button>
// //             ))}
// //           </div>

// //           <div style={styles.categories}>
// //             {['Arrays', 'Strings', 'Stack', 'Math', 'Recursion', 'DP'].map(cat => (
// //               <button
// //                 key={cat}
// //                 onClick={() => setCategory(cat === category ? '' : cat)}
// //                 style={{
// //                   ...styles.diffBtn,
// //                   background: category === cat ? '#00ff8822' : 'transparent',
// //                   color: category === cat ? '#00ff88' : '#555',
// //                   border: category === cat ? '1px solid #00ff8844' : '1px solid #222',
// //                 }}
// //               >
// //                 {cat}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {problems.length === 0 ? (
// //           <div style={styles.empty}>No problems found</div>
// //         ) : (
// //           <div style={styles.table}>
// //             <div style={styles.tableHeader}>
// //               <span style={{ flex: 0.5 }}>#</span>
// //               <span style={{ flex: 3 }}>Title</span>
// //               <span style={{ flex: 1 }}>Difficulty</span>
// //               <span style={{ flex: 1 }}>Category</span>
// //               <span style={{ flex: 0.5 }}>Points</span>
// //             </div>
// //             {problems.map((problem, idx) => {
// //               const isLocked = !unlockedTiers.includes(problem.difficulty);
// //               return (
// //                 <div
// //                   key={problem._id}
// //                   style={{
// //                     ...styles.tableRow,
// //                     cursor: isLocked ? 'not-allowed' : 'pointer',
// //                     opacity: isLocked ? 0.6 : 1,
// //                   }}
// //                   onClick={() => handleProblemClick(problem)}
// //                 >
// //                   <span style={{ flex: 0.5, color: '#444' }}>{idx + 1}</span>
// //                   <span style={{ flex: 3, color: '#fff' }}>
// //                     {isLocked && '🔒 '}{problem.title}
// //                   </span>
// //                   <span style={{ flex: 1, color: difficultyColor(problem.difficulty) }}>
// //                     {problem.difficulty}
// //                     {isLocked && (
// //                       <span style={{ fontSize: '10px', marginLeft: '8px', color: '#ffaa00' }}>
// //                         (Locked)
// //                       </span>
// //                     )}
// //                   </span>
// //                   <span style={{ flex: 1, color: '#888', fontSize: '12px' }}>
// //                     {problem.category || problem.tags?.[0] || 'Others'}
// //                   </span>
// //                   <span style={{ flex: 0.5, color: '#ffaa00' }}>{problem.points}</span>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: {
// //     minHeight: '100vh',
// //     background: '#0a0a0a',
// //     fontFamily: "'Fira Code', monospace",
// //   },
// //   nav: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     padding: '16px 32px',
// //     borderBottom: '1px solid #1a1a1a',
// //     background: '#0d0d0d',
// //   },
// //   logo: {
// //     color: '#00ff88',
// //     fontSize: '18px',
// //     fontWeight: 700,
// //   },
// //   navRight: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '16px',
// //   },
// //   username: {
// //     color: '#555',
// //     fontSize: '14px',
// //   },
// //   navBtn: {
// //     background: 'transparent',
// //     border: '1px solid #222',
// //     color: '#aaa',
// //     padding: '6px 14px',
// //     borderRadius: '6px',
// //     cursor: 'pointer',
// //   },
// //   logoutBtn: {
// //     background: 'transparent',
// //     border: '1px solid #ff444433',
// //     color: '#ff4444',
// //     padding: '6px 14px',
// //     borderRadius: '6px',
// //     cursor: 'pointer',
// //   },
// //   main: {
// //     maxWidth: '1100px',
// //     margin: '0 auto',
// //     padding: '40px 24px',
// //   },
// //   header: {
// //     marginBottom: '32px',
// //   },
// //   title: {
// //     color: '#fff',
// //     fontSize: '28px',
// //     fontWeight: 700,
// //   },
// //   filters: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     gap: '16px',
// //     marginBottom: '24px',
// //   },
// //   searchForm: {
// //     display: 'flex',
// //     gap: '8px',
// //   },
// //   searchInput: {
// //     flex: 1,
// //     background: '#111',
// //     border: '1px solid #222',
// //     borderRadius: '8px',
// //     padding: '10px 16px',
// //     color: '#fff',
// //     fontSize: '14px',
// //     outline: 'none',
// //   },
// //   searchBtn: {
// //     background: '#00ff8822',
// //     border: '1px solid #00ff8844',
// //     color: '#00ff88',
// //     padding: '10px 20px',
// //     borderRadius: '8px',
// //     cursor: 'pointer',
// //   },
// //   diffBtns: {
// //     display: 'flex',
// //     gap: '8px',
// //     flexWrap: 'wrap',
// //   },
// //   categories: {
// //     display: 'flex',
// //     gap: '8px',
// //     flexWrap: 'wrap',
// //     marginTop: '8px',
// //   },
// //   diffBtn: {
// //     padding: '8px 16px',
// //     borderRadius: '8px',
// //     cursor: 'pointer',
// //     fontSize: '13px',
// //     transition: 'all 0.2s',
// //   },
// //   table: {
// //     background: '#0d0d0d',
// //     border: '1px solid #1a1a1a',
// //     borderRadius: '12px',
// //     overflow: 'hidden',
// //   },
// //   tableHeader: {
// //     display: 'flex',
// //     padding: '14px 20px',
// //     borderBottom: '1px solid #1a1a1a',
// //     color: '#444',
// //     fontSize: '13px',
// //   },
// //   tableRow: {
// //     display: 'flex',
// //     padding: '16px 20px',
// //     borderBottom: '1px solid #111',
// //     alignItems: 'center',
// //     transition: 'background 0.2s',
// //     cursor: 'pointer',
// //   },
// //   loading: {
// //     textAlign: 'center',
// //     padding: '60px',
// //     color: '#555',
// //   },
// //   empty: {
// //     textAlign: 'center',
// //     padding: '60px',
// //     color: '#555',
// //   },
// // };


// // frontend/src/pages/Problems.jsx
// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import api from '../api/axios';
// import toast from 'react-hot-toast';
// import TierLocked from '../components/TierLocked';
// import SukunaDomain from '../components/SukunaDomain';

// // --- Blood Canvas & Cursed Lines (same as in other pages) ---
// function BloodCanvas() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const canvas = ref.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
//     resize();
//     window.addEventListener('resize', resize);

//     const drips = Array.from({ length: 35 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: -Math.random() * 300,
//       speed: 0.3 + Math.random() * 1.4,
//       width: 1.5 + Math.random() * 5,
//       length: 50 + Math.random() * 160,
//       alpha: 0.3 + Math.random() * 0.7,
//       splat: false, splatR: 0,
//       splatMax: 5 + Math.random() * 15,
//     }));

//     const embers = Array.from({ length: 150 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       r: 0.5 + Math.random() * 3,
//       vx: (Math.random() - 0.5) * 0.7,
//       vy: -(0.2 + Math.random() * 1),
//       alpha: Math.random(),
//       type: Math.random() > 0.65 ? 'blue' : 'red',
//     }));

//     const stains = Array.from({ length: 10 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       r: 80 + Math.random() * 200,
//       alpha: 0.02 + Math.random() * 0.06,
//     }));

//     let frame;
//     function draw() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       stains.forEach(s => {
//         ctx.beginPath();
//         ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(100,0,0,${s.alpha})`;
//         ctx.fill();
//       });
//       drips.forEach(d => {
//         if (!d.splat) {
//           const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
//           grad.addColorStop(0, `rgba(180,0,0,${d.alpha})`);
//           grad.addColorStop(0.6, `rgba(120,0,0,${d.alpha * 0.8})`);
//           grad.addColorStop(1, `rgba(80,0,0,0)`);
//           ctx.beginPath();
//           ctx.moveTo(d.x - d.width / 2, d.y);
//           ctx.quadraticCurveTo(d.x + d.width * 0.8, d.y + d.length * 0.5, d.x, d.y + d.length);
//           ctx.lineWidth = d.width;
//           ctx.strokeStyle = grad;
//           ctx.stroke();
//           ctx.beginPath();
//           ctx.arc(d.x, d.y + d.length, d.width * 1.8, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(140,0,0,${d.alpha * 0.5})`;
//           ctx.fill();
//           d.y += d.speed;
//           if (d.y + d.length > canvas.height) d.splat = true;
//         } else {
//           d.splatR += 0.6;
//           ctx.beginPath();
//           ctx.arc(d.x, canvas.height - 2, d.splatR, 0, Math.PI * 2);
//           ctx.fillStyle = `rgba(100,0,0,${0.4 * (1 - d.splatR / d.splatMax)})`;
//           ctx.fill();
//           if (d.splatR >= d.splatMax) {
//             d.y = -Math.random() * 300;
//             d.x = Math.random() * canvas.width;
//             d.splat = false; d.splatR = 0;
//             d.speed = 0.3 + Math.random() * 1.4;
//           }
//         }
//       });
//       embers.forEach(e => {
//         ctx.beginPath();
//         ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
//         ctx.fillStyle = e.type === 'red'
//           ? `rgba(255,${30 + Math.floor(e.alpha * 50)},0,${e.alpha * 0.7})`
//           : `rgba(0,${80 + Math.floor(e.alpha * 80)},${180 + Math.floor(e.alpha * 75)},${e.alpha * 0.45})`;
//         ctx.fill();
//         e.x += e.vx; e.y += e.vy; e.alpha -= 0.003;
//         if (e.y < 0 || e.alpha <= 0) {
//           e.y = canvas.height + 10;
//           e.x = Math.random() * canvas.width;
//           e.alpha = 0.3 + Math.random() * 0.7;
//         }
//       });
//       frame = requestAnimationFrame(draw);
//     }
//     draw();
//     return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
//   }, []);
//   return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
// }

// function CursedLines() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const canvas = ref.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     const lines = Array.from({ length: 7 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: Math.random() * window.innerHeight,
//       angle: Math.random() * Math.PI * 2,
//       speed: 0.006 + Math.random() * 0.01,
//       len: 120 + Math.random() * 350,
//       alpha: 0, dir: 1,
//       col: Math.random() > 0.5 ? '0,100,220' : '170,0,0',
//     }));
//     let frame;
//     function draw() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       lines.forEach(l => {
//         l.alpha += 0.007 * l.dir;
//         if (l.alpha >= 0.5) l.dir = -1;
//         if (l.alpha <= 0) {
//           l.dir = 1;
//           l.x = Math.random() * canvas.width;
//           l.y = Math.random() * canvas.height;
//           l.angle = Math.random() * Math.PI * 2;
//           l.len = 120 + Math.random() * 350;
//         }
//         l.angle += l.speed;
//         const x2 = l.x + Math.cos(l.angle) * l.len;
//         const y2 = l.y + Math.sin(l.angle) * l.len;
//         const g = ctx.createLinearGradient(l.x, l.y, x2, y2);
//         g.addColorStop(0, `rgba(${l.col},0)`);
//         g.addColorStop(0.5, `rgba(${l.col},${l.alpha})`);
//         g.addColorStop(1, `rgba(${l.col},0)`);
//         ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(x2, y2);
//         ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
//       });
//       frame = requestAnimationFrame(draw);
//     }
//     draw();
//     return () => cancelAnimationFrame(frame);
//   }, []);
//   return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} />;
// }
// // ------------------------------------------------------------

// export default function Problems() {
//   const [problems, setProblems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState('');
//   const [difficulty, setDifficulty] = useState('');
//   const [category, setCategory] = useState('');
//   const [unlockedTiers, setUnlockedTiers] = useState(['Easy']);
//   const [lockedDifficulty, setLockedDifficulty] = useState(null);
//   const [searchTrigger, setSearchTrigger] = useState(0);
//   const [mouse, setMouse] = useState({ x: 0, y: 0 });
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProblems = async () => {
//       setLoading(true);
//       setLockedDifficulty(null);
//       try {
//         const params = {};
//         if (search) params.search = search;
//         if (difficulty) params.difficulty = difficulty;
//         if (category) params.category = category;

//         const res = await api.get('/problems', { params });
//         setProblems(res.data.problems || []);
//         if (res.data.unlockedTiers) setUnlockedTiers(res.data.unlockedTiers);
//       } catch (err) {
//         console.error('Failed to fetch problems:', err);
//         if (err.response?.status === 403) {
//           setLockedDifficulty(difficulty);
//           setProblems([]);
//         } else if (err.response?.status === 401) {
//           toast.error('Please login to continue');
//           navigate('/login');
//         } else {
//           toast.error('Failed to load problems');
//           setProblems([]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProblems();
//   }, [difficulty, category, searchTrigger]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearchTrigger(prev => prev + 1);
//   };

//   const onMouse = useCallback((e) => setMouse({ x: e.clientX, y: e.clientY }), []);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/login');
//   };

//   const difficultyColor = (d) => {
//     if (d === 'Easy') return '#00ff88';
//     if (d === 'Medium') return '#ffaa00';
//     return '#ff4444';
//   };

//   // Inside Problems component
// const [showSukuna, setShowSukuna] = useState(false);
// const [selectedProblem, setSelectedProblem] = useState(null);

// const handleProblemClick = (problem) => {
//   if (!unlockedTiers.includes(problem.difficulty)) {
//     toast.error(`🔒 Complete all Easy problems first to unlock ${problem.difficulty}!`);
//     return;
//   }
//   setSelectedProblem(problem);
//   setShowSukuna(true);
// };

// const onSukunaComplete = () => {
//   setShowSukuna(false);
//   navigate(`/problems/${selectedProblem._id}`);
// };

// // In the return, before the main content, conditionally render SukunaDomain
// {showSukuna && selectedProblem && (
//   <SukunaDomain 
//     onComplete={onSukunaComplete} 
//     problemTitle={selectedProblem.title}
//   />
// )}

//   return (
//     <>
//       <BloodCanvas />
//       <CursedLines />

//       {/* Mouse aura */}
//       <div style={{
//         position: 'fixed',
//         left: mouse.x - 180, top: mouse.y - 180,
//         width: 360, height: 360, borderRadius: '50%',
//         background: 'radial-gradient(circle, #ff00000e 0%, transparent 70%)',
//         pointerEvents: 'none', zIndex: 2,
//         transition: 'left 0.08s, top 0.08s',
//       }} />

//       <div onMouseMove={onMouse} style={styles.container}>
//         {/* Scanlines */}
//         <div style={{
//           position: 'fixed', inset: 0, zIndex: 4, pointerEvents: 'none',
//           background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,#00000008 3px,#00000008 4px)',
//         }} />
//         <div style={{
//           position: 'fixed', left: 0, right: 0, height: 2,
//           background: 'linear-gradient(to right,transparent,#ff00001a,transparent)',
//           zIndex: 4, pointerEvents: 'none',
//           animation: 'scanDown 9s linear infinite',
//         }} />

//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@700;900&family=Fira+Code:wght@300;400;600&display=swap');
//           @keyframes scanDown { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
//           @keyframes bloodPulse { 0%,100%{box-shadow:0 0 20px #ff000066} 50%{box-shadow:0 0 60px #ff0000cc} }
//           @keyframes glitchX { 0%,100%{transform:translateX(0)} 8%{transform:translateX(-2px)} 16%{transform:translateX(2px)} 24%{transform:translateX(0)} }
//         `}</style>

//         <nav style={styles.nav}>
//           <span style={styles.logo}>{'</>'} CodeJudge</span>
//           <div style={styles.navRight}>
//             <span style={styles.username}>👤 {user?.firstName || user?.username}</span>
//             <button onClick={() => navigate('/dashboard')} style={styles.navBtn}>Dashboard</button>
//             <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
//           </div>
//         </nav>

//         <div style={styles.main}>
//           <div style={{ textAlign: 'center', marginBottom: 32 }}>
//             <div style={{ fontSize: 14, color: '#ff444455', letterSpacing: '0.4em', marginBottom: 8, fontFamily: "'Cinzel', serif" }}>
//               CURSED DOMAINS
//             </div>
//             <h1 style={styles.title}>Problems</h1>
//           </div>

//           <div style={styles.filters}>
//             <form onSubmit={handleSearch} style={styles.searchForm}>
//               <input
//                 style={styles.searchInput}
//                 placeholder="Search cursed problems..."
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//               />
//               <button type="submit" style={styles.searchBtn}>Hunt</button>
//             </form>

//             <div style={styles.diffBtns}>
//               {['', 'Easy', 'Medium', 'Hard'].map(d => (
//                 <button
//                   key={d}
//                   onClick={() => setDifficulty(d)}
//                   style={{
//                     ...styles.diffBtn,
//                     background: difficulty === d ? '#ff000022' : 'transparent',
//                     color: difficulty === d ? '#ff6666' : '#ff8888',
//                     border: difficulty === d ? '1px solid #ff0000' : '1px solid #8b000066',
//                   }}
//                 >
//                   {d || 'All'}
//                 </button>
//               ))}
//             </div>

//             <div style={styles.categories}>
//               {['Arrays', 'Strings', 'Stack', 'Math', 'Recursion', 'DP'].map(cat => (
//                 <button
//                   key={cat}
//                   onClick={() => setCategory(cat === category ? '' : cat)}
//                   style={{
//                     ...styles.diffBtn,
//                     background: category === cat ? '#ff000022' : 'transparent',
//                     color: category === cat ? '#ff6666' : '#ff8888',
//                     border: category === cat ? '1px solid #ff0000' : '1px solid #8b000066',
//                   }}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {problems.length === 0 ? (
//             <div style={styles.empty}>No cursed records found</div>
//           ) : (
//             <div style={styles.table}>
//               <div style={styles.tableHeader}>
//                 <span style={{ flex: 0.5 }}>#</span>
//                 <span style={{ flex: 3 }}>Title</span>
//                 <span style={{ flex: 1 }}>Domain</span>
//                 <span style={{ flex: 1 }}>Category</span>
//                 <span style={{ flex: 0.5 }}>Points</span>
//               </div>
//               {problems.map((problem, idx) => {
//                 const isLocked = !unlockedTiers.includes(problem.difficulty);
//                 return (
//                   <div
//                     key={problem._id}
//                     style={{
//                       ...styles.tableRow,
//                       cursor: isLocked ? 'not-allowed' : 'pointer',
//                       opacity: isLocked ? 0.6 : 1,
//                     }}
//                     onClick={() => handleProblemClick(problem)}
//                   >
//                     <span style={{ flex: 0.5, color: '#884444' }}>{idx + 1}</span>
//                     <span style={{ flex: 3, color: '#fff' }}>
//                       {isLocked && '🔒 '}{problem.title}
//                     </span>
//                     <span style={{ flex: 1, color: difficultyColor(problem.difficulty) }}>
//                       {problem.difficulty}
//                       {isLocked && (
//                         <span style={{ fontSize: '10px', marginLeft: '8px', color: '#ffaa00' }}>
//                           (Sealed)
//                         </span>
//                       )}
//                     </span>
//                     <span style={{ flex: 1, color: '#ff8888', fontSize: '12px' }}>
//                       {problem.category || problem.tags?.[0] || 'Other'}
//                     </span>
//                     <span style={{ flex: 0.5, color: '#ffaa00' }}>{problem.points}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>

//         <div style={{
//           textAlign: 'center', marginTop: 48, paddingBottom: 32,
//           color: '#8b000033', fontSize: 12, letterSpacing: '0.4em', fontFamily: 'serif',
//         }}>
//           ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ
//         </div>
//       </div>
//     </>
//   );
// }

// const styles = {
//   container: {
//     minHeight: '100vh',
//     background: '#030000',
//     fontFamily: "'Cinzel', serif",
//     position: 'relative',
//     zIndex: 3,
//   },
//   nav: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: '18px 48px',
//     background: 'linear-gradient(to bottom, #06000099, transparent)',
//     borderBottom: '1px solid #8b000020',
//     position: 'relative',
//     zIndex: 10,
//   },
//   logo: {
//     fontFamily: "'Cinzel Decorative', serif",
//     fontSize: 18,
//     fontWeight: 900,
//     color: '#ff2200',
//     textShadow: '0 0 20px #ff0000aa',
//     letterSpacing: '0.1em',
//   },
//   navRight: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '20px',
//   },
//   username: {
//     color: '#ff8888',
//     fontSize: 13,
//     letterSpacing: '0.1em',
//   },
//   navBtn: {
//     background: 'transparent',
//     border: '1px solid #8b000066',
//     color: '#ff8888',
//     padding: '8px 20px',
//     borderRadius: 3,
//     cursor: 'pointer',
//     fontFamily: "'Cinzel', serif",
//     fontSize: 12,
//     letterSpacing: '0.15em',
//     transition: 'all 0.2s',
//   },
//   logoutBtn: {
//     background: '#1a0000',
//     border: '1px solid #ff000033',
//     color: '#ff8888',
//     padding: '8px 20px',
//     borderRadius: 3,
//     cursor: 'pointer',
//     fontFamily: "'Cinzel', serif",
//     fontSize: 12,
//     letterSpacing: '0.15em',
//     transition: 'all 0.2s',
//   },
//   main: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '40px 24px',
//     position: 'relative',
//     zIndex: 5,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 'clamp(32px,6vw,54px)',
//     fontWeight: 700,
//     fontFamily: "'Cinzel Decorative', serif",
//     textShadow: '0 0 20px #ff0000',
//     letterSpacing: '0.1em',
//   },
//   filters: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '16px',
//     marginBottom: '32px',
//   },
//   searchForm: {
//     display: 'flex',
//     gap: '12px',
//   },
//   searchInput: {
//     flex: 1,
//     background: '#1a0000',
//     border: '1px solid #8b0000',
//     borderRadius: 4,
//     padding: '12px 16px',
//     color: '#fff',
//     fontSize: 14,
//     outline: 'none',
//     fontFamily: "'Fira Code', monospace",
//   },
//   searchBtn: {
//     background: '#6b0000',
//     border: '1px solid #ff000044',
//     color: '#fff',
//     padding: '10px 24px',
//     borderRadius: 4,
//     cursor: 'pointer',
//     fontFamily: "'Cinzel', serif",
//     letterSpacing: '0.1em',
//     transition: 'all 0.2s',
//   },
//   diffBtns: {
//     display: 'flex',
//     gap: '12px',
//     flexWrap: 'wrap',
//   },
//   categories: {
//     display: 'flex',
//     gap: '12px',
//     flexWrap: 'wrap',
//     marginTop: '4px',
//   },
//   diffBtn: {
//     padding: '8px 18px',
//     borderRadius: 4,
//     cursor: 'pointer',
//     fontSize: 12,
//     letterSpacing: '0.1em',
//     background: 'transparent',
//     transition: 'all 0.2s',
//   },
//   table: {
//     background: '#0a0000',
//     border: '1px solid #8b000033',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   tableHeader: {
//     display: 'flex',
//     padding: '16px 24px',
//     background: '#1a0000',
//     borderBottom: '1px solid #8b000033',
//     color: '#ff8888',
//     fontSize: 12,
//     fontWeight: 600,
//     letterSpacing: '0.15em',
//   },
//   tableRow: {
//     display: 'flex',
//     padding: '14px 24px',
//     borderBottom: '1px solid #1a0000',
//     alignItems: 'center',
//     color: '#ccc',
//     fontSize: 13,
//     transition: 'background 0.2s',
//   },
//   loading: {
//     textAlign: 'center',
//     padding: '60px',
//     color: '#ff6666',
//     fontFamily: "'Cinzel', serif",
//   },
//   empty: {
//     textAlign: 'center',
//     padding: '60px',
//     color: '#ff8888',
//     fontSize: 14,
//   },
// };

// frontend/src/pages/Problems.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import TierLocked from '../components/TierLocked';

// --------------------------------------------------------------
// Blood Canvas & Cursed Lines (same as in other cursed pages)
// --------------------------------------------------------------
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

export default function Problems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [unlockedTiers, setUnlockedTiers] = useState(['Easy']);
  const [lockedDifficulty, setLockedDifficulty] = useState(null);
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, [difficulty, category, searchTrigger]);

  const fetchProblems = async () => {
    setLoading(true);
    setLockedDifficulty(null);
    try {
      const params = {};
      if (search) params.search = search;
      if (difficulty) params.difficulty = difficulty;
      if (category) params.category = category;

      const res = await api.get('/problems', { params });
      setProblems(res.data.problems || []);
      if (res.data.unlockedTiers) setUnlockedTiers(res.data.unlockedTiers);
    } catch (err) {
      console.error('Failed to fetch problems:', err);
      if (err.response?.status === 403) {
        setLockedDifficulty(difficulty);
        setProblems([]);
      } else if (err.response?.status === 401) {
        toast.error('Please login to continue');
        navigate('/login');
      } else {
        toast.error('Failed to load problems');
        setProblems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTrigger(prev => prev + 1);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const onMouse = useCallback((e) => setMouse({ x: e.clientX, y: e.clientY }), []);

  const difficultyColor = (d) => {
    if (d === 'Easy') return '#00ff88';
    if (d === 'Medium') return '#ffaa00';
    return '#ff4444';
  };

  const handleProblemClick = (problem) => {
    if (!unlockedTiers.includes(problem.difficulty)) {
      toast.error(`🔒 Complete all Easy problems first to unlock ${problem.difficulty}!`);
      return;
    }
    navigate(`/problems/${problem._id}`);
  };

  if (loading) return <div style={styles.loading}>Loading problems...</div>;
  if (lockedDifficulty) {
    const requiredTier = lockedDifficulty === 'Medium' ? 'Easy' : 'Medium';
    return <TierLocked difficulty={lockedDifficulty} requiredTier={requiredTier} />;
  }

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
            <span style={styles.username}>👤 {user?.firstName || user?.username}</span>
            <button onClick={() => navigate('/dashboard')} style={styles.navBtn}>Dashboard</button>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        </nav>

        <div style={styles.main}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: 14, color: '#ff444455', letterSpacing: '0.4em', marginBottom: 8, fontFamily: "'Cinzel', serif" }}>
              CURSED DOMAINS
            </div>
            <h1 style={styles.title}>Problems</h1>
          </div>

          <div style={styles.filters}>
            <form onSubmit={handleSearch} style={styles.searchForm}>
              <input
                style={styles.searchInput}
                placeholder="Search cursed problems..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <button type="submit" style={styles.searchBtn}>Hunt</button>
            </form>

            <div style={styles.diffBtns}>
              {['', 'Easy', 'Medium', 'Hard'].map(d => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  style={{
                    ...styles.diffBtn,
                    background: difficulty === d ? '#ff000022' : 'transparent',
                    color: difficulty === d ? '#ff6666' : '#ff8888',
                    border: difficulty === d ? '1px solid #ff0000' : '1px solid #8b000066',
                  }}
                >
                  {d || 'All'}
                </button>
              ))}
            </div>

            <div style={styles.categories}>
              {['Arrays', 'Strings', 'Stack', 'Math', 'Recursion', 'DP'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat === category ? '' : cat)}
                  style={{
                    ...styles.diffBtn,
                    background: category === cat ? '#ff000022' : 'transparent',
                    color: category === cat ? '#ff6666' : '#ff8888',
                    border: category === cat ? '1px solid #ff0000' : '1px solid #8b000066',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {problems.length === 0 ? (
            <div style={styles.empty}>No cursed records found</div>
          ) : (
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <span style={{ flex: 0.5 }}>#</span>
                <span style={{ flex: 3 }}>Title</span>
                <span style={{ flex: 1 }}>Domain</span>
                <span style={{ flex: 1 }}>Category</span>
                <span style={{ flex: 0.5 }}>Points</span>
              </div>
              {problems.map((problem, idx) => {
                const isLocked = !unlockedTiers.includes(problem.difficulty);
                return (
                  <div
                    key={problem._id}
                    style={{
                      ...styles.tableRow,
                      cursor: isLocked ? 'not-allowed' : 'pointer',
                      opacity: isLocked ? 0.6 : 1,
                    }}
                    onClick={() => handleProblemClick(problem)}
                  >
                    <span style={{ flex: 0.5, color: '#884444' }}>{idx + 1}</span>
                    <span style={{ flex: 3, color: '#fff' }}>
                      {isLocked && '🔒 '}{problem.title}
                    </span>
                    <span style={{ flex: 1, color: difficultyColor(problem.difficulty) }}>
                      {problem.difficulty}
                      {isLocked && <span style={{ fontSize: '10px', marginLeft: '8px', color: '#ffaa00' }}>(Sealed)</span>}
                    </span>
                    <span style={{ flex: 1, color: '#ff8888', fontSize: '12px' }}>
                      {problem.category || problem.tags?.[0] || 'Other'}
                    </span>
                    <span style={{ flex: 0.5, color: '#ffaa00' }}>{problem.points}</span>
                  </div>
                );
              })}
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
  filters: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '32px',
  },
  searchForm: {
    display: 'flex',
    gap: '12px',
  },
  searchInput: {
    flex: 1,
    background: '#1a0000',
    border: '1px solid #8b0000',
    borderRadius: 4,
    padding: '12px 16px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    fontFamily: "'Fira Code', monospace",
  },
  searchBtn: {
    background: '#6b0000',
    border: '1px solid #ff000044',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: 4,
    cursor: 'pointer',
    fontFamily: "'Cinzel', serif",
    letterSpacing: '0.1em',
    transition: 'all 0.2s',
  },
  diffBtns: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  categories: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '4px',
  },
  diffBtn: {
    padding: '8px 18px',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 12,
    letterSpacing: '0.1em',
    background: 'transparent',
    transition: 'all 0.2s',
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
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.15em',
  },
  tableRow: {
    display: 'flex',
    padding: '14px 24px',
    borderBottom: '1px solid #1a0000',
    alignItems: 'center',
    color: '#ccc',
    fontSize: 13,
    transition: 'background 0.2s',
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