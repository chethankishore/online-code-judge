// // // frontend/src/components/TierLocked.jsx
// // import { useNavigate } from 'react-router-dom';

// // export default function TierLocked({ difficulty, requiredTier }) {
// //   const navigate = useNavigate();

// //   const messages = {
// //     Medium: "The gate to the Medium arena is sealed by the Easy boss. Defeat all Easy enemies first!",
// //     Hard: "Only warriors who have conquered both Easy and Medium realms may enter the Hard dungeon.",
// //   };

// //   const quote = messages[difficulty] || "Complete the previous tier to unlock this challenge.";

// //   return (
// //     <div style={styles.container}>
// //       <div style={styles.content}>
// //         <div style={styles.icon}>🔒</div>
// //         <h1 style={styles.title}>TIER LOCKED</h1>
// //         <p style={styles.message}>
// //           You are trying to enter the <strong style={{ color: '#ffaa00' }}>{difficulty}</strong> arena,<br />
// //           but you must first complete all <strong>{requiredTier}</strong> challenges.
// //         </p>
// //         <p style={styles.quote}>“{quote}”</p>
// //         <button onClick={() => window.location.href = '/problems'} style={styles.button}>
// //   ← Return to the Hall of Problems
// // </button>
// //         {/* <button onClick={() => navigate('/problems')} style={styles.button}>
// //           ← Return to the Hall of Problems
// //         </button> */}
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: {
// //     minHeight: '100vh',
// //     background: '#0a0a0a',
// //     fontFamily: "'Fira Code', monospace",
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   content: {
// //     textAlign: 'center',
// //     maxWidth: '600px',
// //     padding: '40px',
// //     background: '#0d0d0d',
// //     border: '1px solid #1a1a1a',
// //     borderRadius: '20px',
// //     boxShadow: '0 0 30px rgba(255,0,0,0.1)',
// //   },
// //   icon: { fontSize: '80px', display: 'block', marginBottom: '20px' },
// //   title: { color: '#ff4444', fontSize: '36px', marginBottom: '20px' },
// //   message: { color: '#aaa', fontSize: '18px', lineHeight: '1.5', marginBottom: '20px' },
// //   quote: {
// //     color: '#888',
// //     fontStyle: 'italic',
// //     fontSize: '14px',
// //     borderLeft: '3px solid #ffaa00',
// //     paddingLeft: '16px',
// //     margin: '20px 0',
// //     textAlign: 'left',
// //   },
// //   button: {
// //     background: '#00ff88',
// //     color: '#000',
// //     border: 'none',
// //     padding: '12px 24px',
// //     borderRadius: '8px',
// //     fontSize: '16px',
// //     fontWeight: 'bold',
// //     cursor: 'pointer',
// //     marginTop: '20px',
// //   },
// // };


// // // frontend/src/components/TierLocked.jsx
// // // import { useEffect, useRef } from 'react';
// // // import { useNavigate } from 'react-router-dom';

// // // // Blood Canvas & Cursed Lines (same as in other pages – placed here for self‑containment)
// // // function BloodCanvas() {
// // //   const ref = useRef(null);
// // //   useEffect(() => {
// // //     const canvas = ref.current;
// // //     if (!canvas) return;
// // //     const ctx = canvas.getContext('2d');
// // //     const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
// // //     resize();
// // //     window.addEventListener('resize', resize);

// // //     const drips = Array.from({ length: 35 }, () => ({
// // //       x: Math.random() * window.innerWidth,
// // //       y: -Math.random() * 300,
// // //       speed: 0.3 + Math.random() * 1.4,
// // //       width: 1.5 + Math.random() * 5,
// // //       length: 50 + Math.random() * 160,
// // //       alpha: 0.3 + Math.random() * 0.7,
// // //       splat: false, splatR: 0,
// // //       splatMax: 5 + Math.random() * 15,
// // //     }));

// // //     const embers = Array.from({ length: 150 }, () => ({
// // //       x: Math.random() * window.innerWidth,
// // //       y: Math.random() * window.innerHeight,
// // //       r: 0.5 + Math.random() * 3,
// // //       vx: (Math.random() - 0.5) * 0.7,
// // //       vy: -(0.2 + Math.random() * 1),
// // //       alpha: Math.random(),
// // //       type: Math.random() > 0.65 ? 'blue' : 'red',
// // //     }));

// // //     const stains = Array.from({ length: 10 }, () => ({
// // //       x: Math.random() * window.innerWidth,
// // //       y: Math.random() * window.innerHeight,
// // //       r: 80 + Math.random() * 200,
// // //       alpha: 0.02 + Math.random() * 0.06,
// // //     }));

// // //     let frame;
// // //     function draw() {
// // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //       stains.forEach(s => {
// // //         ctx.beginPath();
// // //         ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
// // //         ctx.fillStyle = `rgba(100,0,0,${s.alpha})`;
// // //         ctx.fill();
// // //       });
// // //       drips.forEach(d => {
// // //         if (!d.splat) {
// // //           const grad = ctx.createLinearGradient(d.x, d.y, d.x, d.y + d.length);
// // //           grad.addColorStop(0, `rgba(180,0,0,${d.alpha})`);
// // //           grad.addColorStop(0.6, `rgba(120,0,0,${d.alpha * 0.8})`);
// // //           grad.addColorStop(1, `rgba(80,0,0,0)`);
// // //           ctx.beginPath();
// // //           ctx.moveTo(d.x - d.width / 2, d.y);
// // //           ctx.quadraticCurveTo(d.x + d.width * 0.8, d.y + d.length * 0.5, d.x, d.y + d.length);
// // //           ctx.lineWidth = d.width;
// // //           ctx.strokeStyle = grad;
// // //           ctx.stroke();
// // //           ctx.beginPath();
// // //           ctx.arc(d.x, d.y + d.length, d.width * 1.8, 0, Math.PI * 2);
// // //           ctx.fillStyle = `rgba(140,0,0,${d.alpha * 0.5})`;
// // //           ctx.fill();
// // //           d.y += d.speed;
// // //           if (d.y + d.length > canvas.height) d.splat = true;
// // //         } else {
// // //           d.splatR += 0.6;
// // //           ctx.beginPath();
// // //           ctx.arc(d.x, canvas.height - 2, d.splatR, 0, Math.PI * 2);
// // //           ctx.fillStyle = `rgba(100,0,0,${0.4 * (1 - d.splatR / d.splatMax)})`;
// // //           ctx.fill();
// // //           if (d.splatR >= d.splatMax) {
// // //             d.y = -Math.random() * 300;
// // //             d.x = Math.random() * canvas.width;
// // //             d.splat = false; d.splatR = 0;
// // //             d.speed = 0.3 + Math.random() * 1.4;
// // //           }
// // //         }
// // //       });
// // //       embers.forEach(e => {
// // //         ctx.beginPath();
// // //         ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
// // //         ctx.fillStyle = e.type === 'red'
// // //           ? `rgba(255,${30 + Math.floor(e.alpha * 50)},0,${e.alpha * 0.7})`
// // //           : `rgba(0,${80 + Math.floor(e.alpha * 80)},${180 + Math.floor(e.alpha * 75)},${e.alpha * 0.45})`;
// // //         ctx.fill();
// // //         e.x += e.vx; e.y += e.vy; e.alpha -= 0.003;
// // //         if (e.y < 0 || e.alpha <= 0) {
// // //           e.y = canvas.height + 10;
// // //           e.x = Math.random() * canvas.width;
// // //           e.alpha = 0.3 + Math.random() * 0.7;
// // //         }
// // //       });
// // //       frame = requestAnimationFrame(draw);
// // //     }
// // //     draw();
// // //     return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
// // //   }, []);
// // //   return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
// // // }

// // // function CursedLines() {
// // //   const ref = useRef(null);
// // //   useEffect(() => {
// // //     const canvas = ref.current;
// // //     if (!canvas) return;
// // //     const ctx = canvas.getContext('2d');
// // //     canvas.width = window.innerWidth;
// // //     canvas.height = window.innerHeight;
// // //     const lines = Array.from({ length: 7 }, () => ({
// // //       x: Math.random() * window.innerWidth,
// // //       y: Math.random() * window.innerHeight,
// // //       angle: Math.random() * Math.PI * 2,
// // //       speed: 0.006 + Math.random() * 0.01,
// // //       len: 120 + Math.random() * 350,
// // //       alpha: 0, dir: 1,
// // //       col: Math.random() > 0.5 ? '0,100,220' : '170,0,0',
// // //     }));
// // //     let frame;
// // //     function draw() {
// // //       ctx.clearRect(0, 0, canvas.width, canvas.height);
// // //       lines.forEach(l => {
// // //         l.alpha += 0.007 * l.dir;
// // //         if (l.alpha >= 0.5) l.dir = -1;
// // //         if (l.alpha <= 0) {
// // //           l.dir = 1;
// // //           l.x = Math.random() * canvas.width;
// // //           l.y = Math.random() * canvas.height;
// // //           l.angle = Math.random() * Math.PI * 2;
// // //           l.len = 120 + Math.random() * 350;
// // //         }
// // //         l.angle += l.speed;
// // //         const x2 = l.x + Math.cos(l.angle) * l.len;
// // //         const y2 = l.y + Math.sin(l.angle) * l.len;
// // //         const g = ctx.createLinearGradient(l.x, l.y, x2, y2);
// // //         g.addColorStop(0, `rgba(${l.col},0)`);
// // //         g.addColorStop(0.5, `rgba(${l.col},${l.alpha})`);
// // //         g.addColorStop(1, `rgba(${l.col},0)`);
// // //         ctx.beginPath(); ctx.moveTo(l.x, l.y); ctx.lineTo(x2, y2);
// // //         ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
// // //       });
// // //       frame = requestAnimationFrame(draw);
// // //     }
// // //     draw();
// // //     return () => cancelAnimationFrame(frame);
// // //   }, []);
// // //   return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} />;
// // // }

// // // export default function TierLocked({ difficulty, requiredTier }) {
// // //   const navigate = useNavigate();

// // //   const messages = {
// // //     Medium: "The gate to the Medium arena is sealed by the Easy boss. Defeat all Easy enemies first!",
// // //     Hard: "Only warriors who have conquered both Easy and Medium realms may enter the Hard dungeon.",
// // //   };
// // //   const quote = messages[difficulty] || "Complete the previous tier to unlock this challenge.";

// // //   const handleReturn = () => {
// // //     navigate('/problems');
// // //   };

// // //   return (
// // //     <>
// // //       <BloodCanvas />
// // //       <CursedLines />

// // //       {/* Scanlines / overlay */}
// // //       <div style={{
// // //         position: 'fixed', inset: 0, zIndex: 4, pointerEvents: 'none',
// // //         background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,#00000008 3px,#00000008 4px)',
// // //       }} />
// // //       <div style={{
// // //         position: 'fixed', left: 0, right: 0, height: 2,
// // //         background: 'linear-gradient(to right,transparent,#ff00001a,transparent)',
// // //         zIndex: 4, pointerEvents: 'none',
// // //         animation: 'scanDown 9s linear infinite',
// // //       }} />

// // //       <style>{`
// // //         @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@700;900&family=Fira+Code:wght@300;400;600&display=swap');
// // //         @keyframes scanDown { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
// // //         @keyframes bloodPulse { 0%,100%{box-shadow:0 0 20px #ff000066} 50%{box-shadow:0 0 60px #ff0000cc} }
// // //         @keyframes textBleed { 0%,100%{text-shadow:0 0 10px #ff000077} 50%{text-shadow:0 0 40px #ff0000,0 0 80px #ff000044} }
// // //       `}</style>

// // //       <div style={styles.container}>
// // //         <div style={styles.content}>
// // //           <div style={styles.icon}>🔒</div>
// // //           <h1 style={styles.title}>DOMAIN LOCKED</h1>
// // //           <p style={styles.message}>
// // //             You are trying to enter the <strong style={{ color: '#ffaa00' }}>{difficulty}</strong> arena,<br />
// // //             but you must first complete all <strong>{requiredTier}</strong> challenges.
// // //           </p>
// // //           <p style={styles.quote}>“{quote}”</p>
// // //           <button onClick={handleReturn} style={styles.button}>
// // //             ← Return to the Hall of Problems
// // //           </button>
// // //         </div>

// // //         {/* Runic footer */}
// // //         <div style={{
// // //           position: 'absolute', bottom: 32, left: 0, right: 0,
// // //           textAlign: 'center', color: '#8b000033', fontSize: 12,
// // //           letterSpacing: '0.4em', fontFamily: 'serif',
// // //         }}>
// // //           ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // const styles = {
// // //   container: {
// // //     minHeight: '100vh',
// // //     background: '#030000',
// // //     fontFamily: "'Cinzel', serif",
// // //     display: 'flex',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     position: 'relative',
// // //     zIndex: 3,
// // //   },
// // //   content: {
// // //     textAlign: 'center',
// // //     maxWidth: '600px',
// // //     padding: '50px 40px',
// // //     background: 'linear-gradient(145deg, #0a0000, #130000)',
// // //     border: '1px solid #8b0000aa',
// // //     borderRadius: '16px',
// // //     boxShadow: '0 0 60px rgba(139,0,0,0.3), inset 0 0 20px rgba(255,0,0,0.05)',
// // //     backdropFilter: 'blur(2px)',
// // //   },
// // //   icon: {
// // //     fontSize: '90px',
// // //     display: 'block',
// // //     marginBottom: '24px',
// // //     filter: 'drop-shadow(0 0 20px #ff0000)',
// // //   },
// // //   title: {
// // //     color: '#ff4444',
// // //     fontSize: '42px',
// // //     marginBottom: '20px',
// // //     fontFamily: "'Cinzel Decorative', serif",
// // //     textShadow: '0 0 20px #ff0000',
// // //     letterSpacing: '0.1em',
// // //   },
// // //   message: {
// // //     color: '#ddbbbb',
// // //     fontSize: '18px',
// // //     lineHeight: '1.6',
// // //     marginBottom: '20px',
// // //   },
// // //   quote: {
// // //     color: '#ff8888',
// // //     fontStyle: 'italic',
// // //     fontSize: '14px',
// // //     borderLeft: '3px solid #ffaa00',
// // //     paddingLeft: '20px',
// // //     margin: '30px 0',
// // //     textAlign: 'left',
// // //     background: 'rgba(0,0,0,0.2)',
// // //     borderRadius: '0 8px 8px 0',
// // //   },
// // //   button: {
// // //     background: 'linear-gradient(135deg, #6b0000, #cc0000)',
// // //     border: '1px solid #ff000044',
// // //     color: '#fff',
// // //     padding: '14px 32px',
// // //     borderRadius: '8px',
// // //     fontSize: '16px',
// // //     fontWeight: 'bold',
// // //     cursor: 'pointer',
// // //     marginTop: '20px',
// // //     fontFamily: "'Cinzel Decorative', serif",
// // //     letterSpacing: '0.15em',
// // //     transition: 'all 0.2s ease',
// // //     boxShadow: '0 0 20px #ff000044',
// // //   },
// // // };

// // // // Add hover effect (handled by CSS in global or inline style)
// // // const styleSheet = document.createElement('style');
// // // styleSheet.textContent = `
// // //   button:hover {
// // //     transform: translateY(-2px);
// // //     box-shadow: 0 0 40px #ff0000aa;
// // //     background: linear-gradient(135deg, #8b0000, #ff0000);
// // //   }
// // // `;
// // // document.head.appendChild(styleSheet);






// // frontend/src/components/TierLocked.jsx
// import { useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// // ------------------------------
// // Blood Canvas & Cursed Lines
// // ------------------------------
// function BloodCanvas() {
//   const ref = useRef(null);
//   useEffect(() => {
//     const canvas = ref.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     const drips = Array.from({ length: 35 }, () => ({
//       x: Math.random() * window.innerWidth,
//       y: -Math.random() * 300,
//       speed: 0.3 + Math.random() * 1.4,
//       width: 1.5 + Math.random() * 5,
//       length: 50 + Math.random() * 160,
//       alpha: 0.3 + Math.random() * 0.7,
//       splat: false,
//       splatR: 0,
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
//             d.splat = false;
//             d.splatR = 0;
//             d.speed = 0.3 + Math.random() * 1.4;
//           }
//         }
//       });
//       embers.forEach(e => {
//         ctx.beginPath();
//         ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
//         ctx.fillStyle =
//           e.type === 'red'
//             ? `rgba(255,${30 + Math.floor(e.alpha * 50)},0,${e.alpha * 0.7})`
//             : `rgba(0,${80 + Math.floor(e.alpha * 80)},${180 + Math.floor(e.alpha * 75)},${e.alpha * 0.45})`;
//         ctx.fill();
//         e.x += e.vx;
//         e.y += e.vy;
//         e.alpha -= 0.003;
//         if (e.y < 0 || e.alpha <= 0) {
//           e.y = canvas.height + 10;
//           e.x = Math.random() * canvas.width;
//           e.alpha = 0.3 + Math.random() * 0.7;
//         }
//       });
//       frame = requestAnimationFrame(draw);
//     }
//     draw();
//     return () => {
//       cancelAnimationFrame(frame);
//       window.removeEventListener('resize', resize);
//     };
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
//       alpha: 0,
//       dir: 1,
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
//         ctx.beginPath();
//         ctx.moveTo(l.x, l.y);
//         ctx.lineTo(x2, y2);
//         ctx.strokeStyle = g;
//         ctx.lineWidth = 1.5;
//         ctx.stroke();
//       });
//       frame = requestAnimationFrame(draw);
//     }
//     draw();
//     return () => cancelAnimationFrame(frame);
//   }, []);
//   return <canvas ref={ref} style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} />;
// }

// // ---------------------------------
// // Main Component
// // ---------------------------------
// export default function TierLocked({ difficulty, requiredTier }) {
//   const navigate = useNavigate();

//   const messages = {
//     Medium: 'The gate to the Medium arena is sealed by the Easy boss. Defeat all Easy enemies first!',
//     Hard: 'Only warriors who have conquered both Easy and Medium realms may enter the Hard dungeon.',
//   };
//   const quote = messages[difficulty] || 'Complete the previous tier to unlock this challenge.';

//   const handleReturn = () => {
//     navigate('/problems');
//   };

//   return (
//     <>
//       <BloodCanvas />
//       <CursedLines />

//       {/* Scanlines overlay */}
//       <div
//         style={{
//           position: 'fixed',
//           inset: 0,
//           zIndex: 4,
//           pointerEvents: 'none',
//           background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,#00000008 3px,#00000008 4px)',
//         }}
//       />
//       <div
//         style={{
//           position: 'fixed',
//           left: 0,
//           right: 0,
//           height: 2,
//           background: 'linear-gradient(to right,transparent,#ff00001a,transparent)',
//           zIndex: 4,
//           pointerEvents: 'none',
//           animation: 'scanDown 9s linear infinite',
//         }}
//       />

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@700;900&family=Fira+Code:wght@300;400;600&display=swap');
//         @keyframes scanDown { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
//         @keyframes bloodPulse { 0%,100%{box-shadow:0 0 20px #ff000066} 50%{box-shadow:0 0 60px #ff0000cc} }
//         @keyframes textBleed { 0%,100%{text-shadow:0 0 10px #ff000077} 50%{text-shadow:0 0 40px #ff0000,0 0 80px #ff000044} }
//         button:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 0 40px #ff0000aa;
//           background: linear-gradient(135deg, #8b0000, #ff0000);
//         }
//       `}</style>

//       <div style={styles.container}>
//         <div style={styles.content}>
//           <div style={styles.icon}>🔒</div>
//           <h1 style={styles.title}>DOMAIN LOCKED</h1>
//           <p style={styles.message}>
//             You are trying to enter the <strong style={{ color: '#ffaa00' }}>{difficulty}</strong> arena,<br />
//             but you must first complete all <strong>{requiredTier}</strong> challenges.
//           </p>
//           <p style={styles.quote}>“{quote}”</p>
//           <button onClick={handleReturn} style={styles.button}>
//             ← Return to the Hall of Problems
//           </button>
//         </div>

//         <div
//           style={{
//             position: 'absolute',
//             bottom: 32,
//             left: 0,
//             right: 0,
//             textAlign: 'center',
//             color: '#8b000033',
//             fontSize: 12,
//             letterSpacing: '0.4em',
//             fontFamily: 'serif',
//           }}
//         >
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
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     zIndex: 3,
//   },
//   content: {
//     textAlign: 'center',
//     maxWidth: '600px',
//     padding: '50px 40px',
//     background: 'linear-gradient(145deg, #0a0000, #130000)',
//     border: '1px solid #8b0000aa',
//     borderRadius: '16px',
//     boxShadow: '0 0 60px rgba(139,0,0,0.3), inset 0 0 20px rgba(255,0,0,0.05)',
//     backdropFilter: 'blur(2px)',
//   },
//   icon: {
//     fontSize: '90px',
//     display: 'block',
//     marginBottom: '24px',
//     filter: 'drop-shadow(0 0 20px #ff0000)',
//   },
//   title: {
//     color: '#ff4444',
//     fontSize: '42px',
//     marginBottom: '20px',
//     fontFamily: "'Cinzel Decorative', serif",
//     textShadow: '0 0 20px #ff0000',
//     letterSpacing: '0.1em',
//   },
//   message: {
//     color: '#ddbbbb',
//     fontSize: '18px',
//     lineHeight: '1.6',
//     marginBottom: '20px',
//   },
//   quote: {
//     color: '#ff8888',
//     fontStyle: 'italic',
//     fontSize: '14px',
//     borderLeft: '3px solid #ffaa00',
//     paddingLeft: '20px',
//     margin: '30px 0',
//     textAlign: 'left',
//     background: 'rgba(0,0,0,0.2)',
//     borderRadius: '0 8px 8px 0',
//   },
//   button: {
//     background: 'linear-gradient(135deg, #6b0000, #cc0000)',
//     border: '1px solid #ff000044',
//     color: '#fff',
//     padding: '14px 32px',
//     borderRadius: '8px',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     marginTop: '20px',
//     fontFamily: "'Cinzel Decorative', serif",
//     letterSpacing: '0.15em',
//     transition: 'all 0.2s ease',
//     boxShadow: '0 0 20px #ff000044',
//   },
// };

// frontend/src/components/TierLocked.jsx
import { useEffect, useRef } from 'react';

// Blood Canvas & Cursed Lines (same as before)
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

export default function TierLocked({ difficulty, requiredTier }) {
  const messages = {
    Medium: "The gate to the Medium arena is sealed by the Easy boss. Defeat all Easy enemies first!",
    Hard: "Only warriors who have conquered both Easy and Medium realms may enter the Hard dungeon.",
  };
  const quote = messages[difficulty] || "Complete the previous tier to unlock this challenge.";

  return (
    <>
      <BloodCanvas />
      <CursedLines />
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
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 40px #ff0000aa;
          background: linear-gradient(135deg, #8b0000, #ff0000);
        }
      `}</style>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.icon}>🔒</div>
          <h1 style={styles.title}>DOMAIN LOCKED</h1>
          <p style={styles.message}>
            You are trying to enter the <strong style={{ color: '#ffaa00' }}>{difficulty}</strong> arena,<br />
            but you must first complete all <strong>{requiredTier}</strong> challenges.
          </p>
          <p style={styles.quote}>“{quote}”</p>
          <button onClick={() => window.location.href = '/problems'} style={styles.button}>
            ← Return to the Hall of Problems
          </button>
        </div>
        <div style={{
          position: 'absolute', bottom: 32, left: 0, right: 0,
          textAlign: 'center', color: '#8b000033', fontSize: 12,
          letterSpacing: '0.4em', fontFamily: 'serif',
        }}>ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ</div>
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 3,
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '50px 40px',
    background: 'linear-gradient(145deg, #0a0000, #130000)',
    border: '1px solid #8b0000aa',
    borderRadius: '16px',
    boxShadow: '0 0 60px rgba(139,0,0,0.3), inset 0 0 20px rgba(255,0,0,0.05)',
    backdropFilter: 'blur(2px)',
  },
  icon: { fontSize: '90px', display: 'block', marginBottom: '24px', filter: 'drop-shadow(0 0 20px #ff0000)' },
  title: {
    color: '#ff4444',
    fontSize: '42px',
    marginBottom: '20px',
    fontFamily: "'Cinzel Decorative', serif",
    textShadow: '0 0 20px #ff0000',
    letterSpacing: '0.1em',
  },
  message: { color: '#ddbbbb', fontSize: '18px', lineHeight: '1.6', marginBottom: '20px' },
  quote: {
    color: '#ff8888',
    fontStyle: 'italic',
    fontSize: '14px',
    borderLeft: '3px solid #ffaa00',
    paddingLeft: '20px',
    margin: '30px 0',
    textAlign: 'left',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '0 8px 8px 0',
  },
  button: {
    background: 'linear-gradient(135deg, #6b0000, #cc0000)',
    border: '1px solid #ff000044',
    color: '#fff',
    padding: '14px 32px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '20px',
    fontFamily: "'Cinzel Decorative', serif",
    letterSpacing: '0.15em',
    transition: 'all 0.2s ease',
    boxShadow: '0 0 20px #ff000044',
  },
};