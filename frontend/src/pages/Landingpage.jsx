// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const RUNES = ["ᚠ", "ᚢ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᚾ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ", "ᛟ"];

// function BloodDrip({ style }) {
//   return (
//     <div style={{
//       position: "absolute",
//       width: "3px",
//       background: "linear-gradient(to bottom, #8b0000, #ff0000cc, transparent)",
//       borderRadius: "0 0 50% 50%",
//       animation: "drip 3s ease-in infinite",
//       ...style,
//     }} />
//   );
// }

// function FloatingRune({ rune, style }) {
//   return (
//     <span style={{
//       position: "absolute",
//       color: "#ff000033",
//       fontSize: "24px",
//       fontFamily: "serif",
//       animation: "floatRune 8s ease-in-out infinite",
//       userSelect: "none",
//       ...style,
//     }}>{rune}</span>
//   );
// }

// function ParticleField() {
//   const canvasRef = useRef(null);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;

//     const particles = Array.from({ length: 80 }, () => ({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       r: Math.random() * 2 + 0.5,
//       vx: (Math.random() - 0.5) * 0.3,
//       vy: -Math.random() * 0.5 - 0.1,
//       alpha: Math.random(),
//       color: Math.random() > 0.6 ? "#ff2200" : "#cc0000",
//     }));

//     let animId;
//     function draw() {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       for (const p of particles) {
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
//         ctx.fill();
//         p.x += p.vx;
//         p.y += p.vy;
//         p.alpha -= 0.002;
//         if (p.y < 0 || p.alpha <= 0) {
//           p.y = canvas.height;
//           p.x = Math.random() * canvas.width;
//           p.alpha = Math.random();
//         }
//       }
//       animId = requestAnimationFrame(draw);
//     }
//     draw();

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     window.addEventListener("resize", resize);
//     return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
//   }, []);

//   return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
// }

// function AnimeEntrance({ onComplete }) {
//   const [phase, setPhase] = useState(0);
//   // phase 0: black screen
//   // phase 1: eye opens (iris reveal)
//   // phase 2: red flash
//   // phase 3: title slam
//   // phase 4: done

//   useEffect(() => {
//     const timers = [
//       setTimeout(() => setPhase(1), 400),
//       setTimeout(() => setPhase(2), 1800),
//       setTimeout(() => setPhase(3), 2200),
//       setTimeout(() => setPhase(4), 3600),
//       setTimeout(() => onComplete(), 3800),
//     ];
//     return () => timers.forEach(clearTimeout);
//   }, []);

//   if (phase === 4) return null;

//   return (
//     <div style={{
//       position: "fixed", inset: 0, zIndex: 9999,
//       background: "#000",
//       display: "flex", alignItems: "center", justifyContent: "center",
//       flexDirection: "column",
//       overflow: "hidden",
//     }}>
//       {/* Eye opening animation */}
//       {phase >= 1 && phase < 2 && (
//         <div style={{ position: "relative", width: 300, height: 120 }}>
//           {/* Eye white */}
//           <div style={{
//             position: "absolute", inset: 0,
//             background: "#1a0000",
//             borderRadius: "50%",
//             overflow: "hidden",
//             animation: "eyeOpen 1.2s ease forwards",
//             border: "2px solid #8b0000",
//             boxShadow: "0 0 40px #ff0000aa, inset 0 0 30px #00000088",
//           }}>
//             {/* Iris */}
//             <div style={{
//               position: "absolute",
//               left: "50%", top: "50%",
//               transform: "translate(-50%, -50%)",
//               width: 80, height: 80,
//               borderRadius: "50%",
//               background: "radial-gradient(circle at 40% 40%, #ff4400, #8b0000, #1a0000)",
//               boxShadow: "0 0 20px #ff2200",
//               animation: "irisGlow 1s ease-in-out infinite alternate",
//             }}>
//               {/* Pupil */}
//               <div style={{
//                 position: "absolute",
//                 left: "50%", top: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: 30, height: 30,
//                 borderRadius: "50%",
//                 background: "#000",
//                 boxShadow: "0 0 10px #ff0000",
//               }} />
//             </div>
//             {/* Eyelashes top */}
//             {[...Array(7)].map((_, i) => (
//               <div key={i} style={{
//                 position: "absolute",
//                 top: 0, left: `${10 + i * 13}%`,
//                 width: 2, height: `${15 + Math.abs(3 - i) * 5}px`,
//                 background: "#8b0000",
//                 transformOrigin: "top center",
//                 transform: `rotate(${-20 + i * 7}deg)`,
//               }} />
//             ))}
//           </div>
//           {/* Top eyelid */}
//           <div style={{
//             position: "absolute", left: 0, right: 0, top: 0,
//             height: "50%",
//             background: "#000",
//             animation: "lidOpenTop 1.2s ease forwards",
//             transformOrigin: "top center",
//           }} />
//           {/* Bottom eyelid */}
//           <div style={{
//             position: "absolute", left: 0, right: 0, bottom: 0,
//             height: "50%",
//             background: "#000",
//             animation: "lidOpenBottom 1.2s ease forwards",
//             transformOrigin: "bottom center",
//           }} />
//         </div>
//       )}

//       {/* Red flash */}
//       {phase === 2 && (
//         <div style={{
//           position: "fixed", inset: 0,
//           background: "#ff0000",
//           animation: "flashOut 0.4s ease forwards",
//         }} />
//       )}

//       {/* Title slam */}
//       {phase === 3 && (
//         <div style={{
//           display: "flex", flexDirection: "column", alignItems: "center",
//           animation: "titleSlam 0.3s cubic-bezier(0.17, 0.67, 0.12, 1.53) forwards",
//         }}>
//           <div style={{
//             fontSize: "clamp(48px, 10vw, 100px)",
//             fontFamily: "'Cinzel Decorative', 'Palatino Linotype', serif",
//             fontWeight: 900,
//             color: "#fff",
//             letterSpacing: "0.1em",
//             textShadow: "0 0 30px #ff0000, 0 0 60px #ff0000aa, 4px 4px 0 #8b0000",
//             lineHeight: 1,
//           }}>
//             CODE
//           </div>
//           <div style={{
//             fontSize: "clamp(48px, 10vw, 100px)",
//             fontFamily: "'Cinzel Decorative', 'Palatino Linotype', serif",
//             fontWeight: 900,
//             color: "#cc0000",
//             letterSpacing: "0.3em",
//             textShadow: "0 0 20px #ff0000aa",
//             lineHeight: 1,
//           }}>
//             JUDGE
//           </div>
//           <div style={{
//             marginTop: 16,
//             fontSize: "clamp(12px, 2vw, 18px)",
//             fontFamily: "'Cinzel', serif",
//             color: "#ff4444aa",
//             letterSpacing: "0.5em",
//             textTransform: "uppercase",
//           }}>
//             ⚔ The Dungeon Awaits ⚔
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes eyeOpen {
//           0% { transform: scaleY(0.05); }
//           60% { transform: scaleY(1.1); }
//           100% { transform: scaleY(1); }
//         }
//         @keyframes lidOpenTop {
//           0% { transform: scaleY(1); }
//           100% { transform: scaleY(0); }
//         }
//         @keyframes lidOpenBottom {
//           0% { transform: scaleY(1); }
//           100% { transform: scaleY(0); }
//         }
//         @keyframes irisGlow {
//           from { box-shadow: 0 0 20px #ff2200; }
//           to { box-shadow: 0 0 40px #ff4400, 0 0 60px #ff0000; }
//         }
//         @keyframes flashOut {
//           0% { opacity: 1; }
//           100% { opacity: 0; }
//         }
//         @keyframes titleSlam {
//           0% { transform: scale(2) translateY(-30px); opacity: 0; }
//           60% { transform: scale(0.95); opacity: 1; }
//           100% { transform: scale(1); opacity: 1; }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function LandingPage() {
//   const [entered, setEntered] = useState(false);
//   const [heroVisible, setHeroVisible] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (entered) {
//       setTimeout(() => setHeroVisible(true), 100);
//     }
//   }, [entered]);

//   const drips = [
//     { left: "5%", top: 0, height: "80px", animationDelay: "0s" },
//     { left: "15%", top: 0, height: "50px", animationDelay: "0.5s" },
//     { left: "25%", top: 0, height: "100px", animationDelay: "1s" },
//     { left: "40%", top: 0, height: "60px", animationDelay: "0.2s" },
//     { left: "55%", top: 0, height: "90px", animationDelay: "0.7s" },
//     { left: "70%", top: 0, height: "70px", animationDelay: "1.3s" },
//     { left: "82%", top: 0, height: "110px", animationDelay: "0.4s" },
//     { left: "92%", top: 0, height: "55px", animationDelay: "0.9s" },
//   ];

//   const runes = RUNES.slice(0, 12).map((r, i) => ({
//     rune: r,
//     style: {
//       left: `${5 + i * 8}%`,
//       top: `${20 + (i % 3) * 25}%`,
//       animationDelay: `${i * 0.6}s`,
//       fontSize: `${16 + (i % 3) * 8}px`,
//     }
//   }));

//   return (
//     <>
//       <AnimeEntrance onComplete={() => setEntered(true)} />

//       {entered && (
//         <div style={{
//           minHeight: "100vh",
//           background: "#050000",
//           fontFamily: "'Cinzel', 'Palatino Linotype', serif",
//           overflowX: "hidden",
//           position: "relative",
//         }}>
//           <ParticleField />

//           {/* Global styles */}
//           <style>{`
//             @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@700;900&family=Fira+Code:wght@400;600&display=swap');

//             * { box-sizing: border-box; margin: 0; padding: 0; }

//             @keyframes drip {
//               0% { height: 0; opacity: 1; }
//               70% { opacity: 1; }
//               100% { height: var(--h, 80px); opacity: 0; }
//             }
//             @keyframes floatRune {
//               0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.15; }
//               50% { transform: translateY(-20px) rotate(10deg); opacity: 0.4; }
//             }
//             @keyframes flicker {
//               0%, 100% { opacity: 1; }
//               92% { opacity: 1; }
//               93% { opacity: 0.4; }
//               94% { opacity: 1; }
//               96% { opacity: 0.6; }
//               97% { opacity: 1; }
//             }
//             @keyframes pulse-glow {
//               0%, 100% { box-shadow: 0 0 20px #ff0000aa, 0 0 40px #ff000044; }
//               50% { box-shadow: 0 0 40px #ff0000dd, 0 0 80px #ff000066; }
//             }
//             @keyframes sword-shake {
//               0%, 100% { transform: rotate(-5deg) translateX(0); }
//               25% { transform: rotate(-3deg) translateX(3px); }
//               75% { transform: rotate(-7deg) translateX(-3px); }
//             }
//             @keyframes fadeSlideUp {
//               from { opacity: 0; transform: translateY(40px); }
//               to { opacity: 1; transform: translateY(0); }
//             }
//             @keyframes scanline {
//               0% { transform: translateY(-100%); }
//               100% { transform: translateY(100vh); }
//             }
//             @keyframes borderBlood {
//               0%, 100% { border-color: #8b000088; }
//               50% { border-color: #ff0000aa; }
//             }
//             @keyframes textBlood {
//               0%, 100% { text-shadow: 0 0 10px #ff0000aa; }
//               50% { text-shadow: 0 0 30px #ff0000, 0 0 60px #ff000066; }
//             }
//             @keyframes floatCard {
//               0%, 100% { transform: translateY(0); }
//               50% { transform: translateY(-8px); }
//             }
//             @keyframes chainSwing {
//               0%, 100% { transform: rotate(-3deg); }
//               50% { transform: rotate(3deg); }
//             }

//             .cta-btn {
//               position: relative;
//               overflow: hidden;
//               transition: all 0.3s ease;
//             }
//             .cta-btn::before {
//               content: '';
//               position: absolute;
//               inset: 0;
//               background: linear-gradient(90deg, transparent, #ff000033, transparent);
//               transform: translateX(-100%);
//               transition: transform 0.5s ease;
//             }
//             .cta-btn:hover::before { transform: translateX(100%); }
//             .cta-btn:hover { transform: translateY(-2px); }

//             .dungeon-card {
//               animation: floatCard 4s ease-in-out infinite;
//               transition: all 0.3s ease;
//             }
//             .dungeon-card:hover {
//               transform: translateY(-12px) scale(1.02) !important;
//               border-color: #ff0000 !important;
//               box-shadow: 0 20px 60px #ff000044 !important;
//             }

//             ::-webkit-scrollbar { width: 6px; }
//             ::-webkit-scrollbar-track { background: #0a0000; }
//             ::-webkit-scrollbar-thumb { background: #8b0000; border-radius: 3px; }
//           `}</style>

//           {/* Scanline overlay */}
//           <div style={{
//             position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
//             background: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00000008 2px, #00000008 4px)",
//           }} />

//           {/* Blood drips top */}
//           <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 10, pointerEvents: "none", height: 120 }}>
//             {drips.map((d, i) => (
//               <BloodDrip key={i} style={{ left: d.left, height: d.height, animationDelay: d.animationDelay, "--h": d.height }} />
//             ))}
//           </div>

//           {/* Floating runes background */}
//           <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
//             {runes.map((r, i) => <FloatingRune key={i} {...r} />)}
//           </div>

//           {/* NAV */}
//           <nav style={{
//             position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
//             display: "flex", alignItems: "center", justifyContent: "space-between",
//             padding: "20px 48px",
//             background: "linear-gradient(to bottom, #0a000088, transparent)",
//             backdropFilter: "blur(4px)",
//           }}>
//             <div style={{
//               display: "flex", alignItems: "center", gap: 12,
//               animation: "flicker 4s infinite",
//             }}>
//               <span style={{ fontSize: 24 }}>⚔</span>
//               <span style={{
//                 fontFamily: "'Cinzel Decorative', serif",
//                 fontSize: 20, fontWeight: 900,
//                 color: "#ff2200",
//                 textShadow: "0 0 20px #ff0000",
//                 letterSpacing: "0.1em",
//               }}>CodeJudge</span>
//             </div>
//             <div style={{ display: "flex", gap: 12 }}>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="cta-btn"
//                 style={{
//                   background: "transparent",
//                   border: "1px solid #8b000088",
//                   color: "#ff4444",
//                   padding: "10px 24px",
//                   borderRadius: 4,
//                   cursor: "pointer",
//                   fontFamily: "'Cinzel', serif",
//                   fontSize: 13,
//                   letterSpacing: "0.1em",
//                   animation: "borderBlood 3s infinite",
//                 }}>
//                 Enter
//               </button>
//               <button
//                 onClick={() => navigate("/register")}
//                 className="cta-btn"
//                 style={{
//                   background: "linear-gradient(135deg, #8b0000, #cc0000)",
//                   border: "none",
//                   color: "#fff",
//                   padding: "10px 24px",
//                   borderRadius: 4,
//                   cursor: "pointer",
//                   fontFamily: "'Cinzel', serif",
//                   fontSize: 13,
//                   letterSpacing: "0.1em",
//                   boxShadow: "0 0 20px #ff000044",
//                 }}>
//                 Pledge Blood
//               </button>
//             </div>
//           </nav>

//           {/* HERO */}
//           <section style={{
//             minHeight: "100vh",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             position: "relative", zIndex: 5,
//             padding: "120px 24px 60px",
//             flexDirection: "column",
//             textAlign: "center",
//           }}>
//             {/* Background glow orb */}
//             <div style={{
//               position: "absolute",
//               width: 600, height: 600,
//               borderRadius: "50%",
//               background: "radial-gradient(circle, #ff000022 0%, transparent 70%)",
//               top: "50%", left: "50%",
//               transform: "translate(-50%, -50%)",
//               pointerEvents: "none",
//             }} />

//             {/* Sword decoration */}
//             <div style={{
//               fontSize: 64,
//               animation: "sword-shake 3s ease-in-out infinite",
//               marginBottom: 24,
//               filter: "drop-shadow(0 0 20px #ff0000)",
//             }}>⚔</div>

//             <div style={{
//               opacity: heroVisible ? 1 : 0,
//               animation: heroVisible ? "fadeSlideUp 0.8s ease forwards" : "none",
//             }}>
//               <div style={{
//                 fontSize: "clamp(14px, 2vw, 18px)",
//                 fontFamily: "'Cinzel', serif",
//                 color: "#ff4444aa",
//                 letterSpacing: "0.6em",
//                 marginBottom: 16,
//                 textTransform: "uppercase",
//               }}>
//                 ᚠ &nbsp; The Dark Arena &nbsp; ᚠ
//               </div>

//               <h1 style={{
//                 fontSize: "clamp(56px, 12vw, 130px)",
//                 fontFamily: "'Cinzel Decorative', serif",
//                 fontWeight: 900,
//                 lineHeight: 0.9,
//                 marginBottom: 8,
//               }}>
//                 <span style={{
//                   display: "block",
//                   color: "#fff",
//                   textShadow: "0 0 40px #ff0000aa, 0 4px 0 #4a0000",
//                   animation: "textBlood 3s ease-in-out infinite",
//                 }}>CODE</span>
//                 <span style={{
//                   display: "block",
//                   color: "#cc0000",
//                   textShadow: "0 0 60px #ff0000, 0 4px 0 #1a0000",
//                   letterSpacing: "0.2em",
//                 }}>JUDGE</span>
//               </h1>

//               <p style={{
//                 marginTop: 32,
//                 fontSize: "clamp(14px, 2vw, 20px)",
//                 color: "#ff8888aa",
//                 maxWidth: 600,
//                 margin: "32px auto",
//                 lineHeight: 1.8,
//                 fontFamily: "'Fira Code', monospace",
//                 fontWeight: 400,
//               }}>
//                 Enter the dungeon. Solve the cursed problems.<br />
//                 <span style={{ color: "#ff4444" }}>Bleed code. Earn glory.</span>
//               </p>

//               <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
//                 <button
//                   onClick={() => navigate("/register")}
//                   className="cta-btn"
//                   style={{
//                     background: "linear-gradient(135deg, #8b0000, #ff0000)",
//                     border: "none",
//                     color: "#fff",
//                     padding: "18px 48px",
//                     fontSize: 16,
//                     fontFamily: "'Cinzel', serif",
//                     letterSpacing: "0.2em",
//                     borderRadius: 4,
//                     cursor: "pointer",
//                     boxShadow: "0 0 30px #ff000066",
//                     animation: "pulse-glow 2s infinite",
//                   }}>
//                   ⚔ &nbsp; ENTER THE DUNGEON
//                 </button>
//                 <button
//                   onClick={() => navigate("/login")}
//                   className="cta-btn"
//                   style={{
//                     background: "transparent",
//                     border: "2px solid #8b0000",
//                     color: "#ff4444",
//                     padding: "18px 48px",
//                     fontSize: 16,
//                     fontFamily: "'Cinzel', serif",
//                     letterSpacing: "0.2em",
//                     borderRadius: 4,
//                     cursor: "pointer",
//                   }}>
//                   🩸 &nbsp; I HAVE BLOOD OATH
//                 </button>
//               </div>
//             </div>

//             {/* Scroll indicator */}
//             <div style={{
//               position: "absolute", bottom: 40,
//               display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
//               color: "#8b0000", fontSize: 12,
//               fontFamily: "'Cinzel', serif",
//               letterSpacing: "0.3em",
//               animation: "fadeSlideUp 1s 1s ease both",
//               opacity: 0,
//             }}>
//               <span>DESCEND</span>
//               <div style={{
//                 width: 1, height: 40,
//                 background: "linear-gradient(to bottom, #8b0000, transparent)",
//                 animation: "drip 2s ease-in-out infinite",
//               }} />
//             </div>
//           </section>

//           {/* DUNGEON TIERS */}
//           <section style={{
//             position: "relative", zIndex: 5,
//             padding: "80px 24px",
//             maxWidth: 1100,
//             margin: "0 auto",
//           }}>
//             <div style={{ textAlign: "center", marginBottom: 60 }}>
//               <div style={{ color: "#ff4444aa", letterSpacing: "0.5em", fontSize: 13, marginBottom: 12 }}>
//                 ᚢ &nbsp; THE THREE TRIALS &nbsp; ᚢ
//               </div>
//               <h2 style={{
//                 fontFamily: "'Cinzel Decorative', serif",
//                 fontSize: "clamp(28px, 5vw, 48px)",
//                 color: "#fff",
//                 textShadow: "0 0 30px #ff000066",
//               }}>Dungeon Tiers</h2>
//             </div>

//             <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
//               {[
//                 {
//                   icon: "🗡",
//                   tier: "Apprentice",
//                   difficulty: "Easy",
//                   desc: "Enter the outer halls. Face the lesser demons. Prove your worth in blood.",
//                   color: "#00ff88",
//                   glow: "#00ff8844",
//                   delay: "0s",
//                   locked: false,
//                 },
//                 {
//                   icon: "⚔",
//                   tier: "Warrior",
//                   difficulty: "Medium",
//                   desc: "The inner sanctum awakens. Only those who slew the weak may pass.",
//                   color: "#ffaa00",
//                   glow: "#ffaa0044",
//                   delay: "0.3s",
//                   locked: true,
//                 },
//                 {
//                   icon: "💀",
//                   tier: "Demon Lord",
//                   difficulty: "Hard",
//                   desc: "The abyss stares back. Where coders go to die and legends are born.",
//                   color: "#ff4444",
//                   glow: "#ff444444",
//                   delay: "0.6s",
//                   locked: true,
//                 },
//               ].map((card, i) => (
//                 <div
//                   key={i}
//                   className="dungeon-card"
//                   style={{
//                     background: "linear-gradient(135deg, #0d0000, #1a0000)",
//                     border: `1px solid ${card.color}33`,
//                     borderRadius: 8,
//                     padding: 32,
//                     position: "relative",
//                     overflow: "hidden",
//                     animationDelay: card.delay,
//                     boxShadow: `0 8px 32px ${card.glow}`,
//                   }}
//                 >
//                   {/* Corner rune decoration */}
//                   <div style={{
//                     position: "absolute", top: 12, right: 12,
//                     color: `${card.color}44`,
//                     fontSize: 20,
//                     fontFamily: "serif",
//                   }}>ᚠ</div>

//                   {card.locked && (
//                     <div style={{
//                       position: "absolute", top: 12, left: 12,
//                       background: "#1a0000",
//                       border: "1px solid #8b000066",
//                       borderRadius: 4,
//                       padding: "2px 8px",
//                       fontSize: 11,
//                       color: "#ff444488",
//                       fontFamily: "'Cinzel', serif",
//                       letterSpacing: "0.1em",
//                     }}>LOCKED</div>
//                   )}

//                   <div style={{ fontSize: 40, marginBottom: 16, filter: `drop-shadow(0 0 10px ${card.color})` }}>
//                     {card.icon}
//                   </div>

//                   <div style={{
//                     fontFamily: "'Cinzel Decorative', serif",
//                     fontSize: 22, fontWeight: 900,
//                     color: card.color,
//                     marginBottom: 4,
//                     textShadow: `0 0 20px ${card.color}88`,
//                   }}>{card.tier}</div>

//                   <div style={{
//                     fontSize: 11, color: `${card.color}88`,
//                     letterSpacing: "0.3em",
//                     marginBottom: 16,
//                     fontFamily: "'Cinzel', serif",
//                   }}>{card.difficulty.toUpperCase()}</div>

//                   <p style={{
//                     color: "#aa6666",
//                     fontSize: 14,
//                     lineHeight: 1.7,
//                     fontFamily: "'Fira Code', monospace",
//                   }}>{card.desc}</p>

//                   {/* Bottom blood line */}
//                   <div style={{
//                     position: "absolute", bottom: 0, left: 0, right: 0,
//                     height: 2,
//                     background: `linear-gradient(to right, transparent, ${card.color}66, transparent)`,
//                   }} />
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* STATS / LORE */}
//           <section style={{
//             position: "relative", zIndex: 5,
//             padding: "80px 24px",
//             background: "linear-gradient(to bottom, transparent, #0a000066, transparent)",
//           }}>
//             <div style={{
//               maxWidth: 900, margin: "0 auto",
//               display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
//               gap: 32, textAlign: "center",
//             }}>
//               {[
//                 { value: "150+", label: "Cursed Problems", icon: "📜" },
//                 { value: "3", label: "Dungeon Tiers", icon: "🏰" },
//                 { value: "∞", label: "Enemies Slain", icon: "💀" },
//                 { value: "0", label: "Mercy Given", icon: "⚔" },
//               ].map((stat, i) => (
//                 <div key={i} style={{
//                   padding: 24,
//                   border: "1px solid #8b000033",
//                   borderRadius: 8,
//                   background: "#0d000066",
//                   animation: `fadeSlideUp 0.6s ${i * 0.15}s ease both`,
//                 }}>
//                   <div style={{ fontSize: 32, marginBottom: 8 }}>{stat.icon}</div>
//                   <div style={{
//                     fontFamily: "'Cinzel Decorative', serif",
//                     fontSize: 36, fontWeight: 900,
//                     color: "#ff2200",
//                     textShadow: "0 0 20px #ff000066",
//                     lineHeight: 1,
//                   }}>{stat.value}</div>
//                   <div style={{
//                     color: "#aa5555",
//                     fontSize: 12,
//                     letterSpacing: "0.2em",
//                     marginTop: 8,
//                     fontFamily: "'Cinzel', serif",
//                   }}>{stat.label.toUpperCase()}</div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* FINAL CTA */}
//           <section style={{
//             position: "relative", zIndex: 5,
//             padding: "100px 24px 120px",
//             textAlign: "center",
//           }}>
//             {/* Chains decoration */}
//             <div style={{
//               fontSize: 32, marginBottom: 24, opacity: 0.5,
//               animation: "chainSwing 4s ease-in-out infinite",
//               display: "inline-block",
//             }}>⛓</div>

//             <h2 style={{
//               fontFamily: "'Cinzel Decorative', serif",
//               fontSize: "clamp(28px, 5vw, 52px)",
//               color: "#fff",
//               textShadow: "0 0 40px #ff000066",
//               marginBottom: 16,
//             }}>
//               Your Blood. Your Code.<br />
//               <span style={{ color: "#cc0000" }}>Your Legend.</span>
//             </h2>

//             <p style={{
//               color: "#aa5555",
//               maxWidth: 500,
//               margin: "0 auto 48px",
//               fontFamily: "'Fira Code', monospace",
//               fontSize: 15,
//               lineHeight: 1.8,
//             }}>
//               The dungeon has claimed many souls.<br />
//               Will you be the one to conquer it?
//             </p>

//             <button
//               onClick={() => navigate("/register")}
//               className="cta-btn"
//               style={{
//                 background: "linear-gradient(135deg, #6b0000, #cc0000, #8b0000)",
//                 border: "2px solid #ff000066",
//                 color: "#fff",
//                 padding: "22px 64px",
//                 fontSize: 18,
//                 fontFamily: "'Cinzel Decorative', serif",
//                 letterSpacing: "0.2em",
//                 borderRadius: 4,
//                 cursor: "pointer",
//                 boxShadow: "0 0 60px #ff000044, inset 0 0 20px #ff000022",
//                 animation: "pulse-glow 2s infinite",
//               }}
//             >
//               ⚔ &nbsp; FORGE YOUR OATH
//             </button>

//             {/* Footer runes */}
//             <div style={{
//               marginTop: 80,
//               color: "#8b000044",
//               fontSize: 24,
//               letterSpacing: "0.5em",
//               fontFamily: "serif",
//             }}>
//               ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ
//             </div>
//             <div style={{
//               marginTop: 16,
//               color: "#8b000066",
//               fontSize: 12,
//               letterSpacing: "0.3em",
//               fontFamily: "'Cinzel', serif",
//             }}>
//               © CODEJUDGE — WHERE CODERS BLEED
//             </div>
//           </section>
//         </div>
//       )}
//     </>
//   );
// }
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const RUNES = ["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛇ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ"];
const CURSES = ["呪術", "滅却", "領域", "虚式", "赤", "蒼", "紫"];

function BloodCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

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
      type: Math.random() > 0.65 ? "blue" : "red",
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
        ctx.fillStyle = e.type === "red"
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
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function CursedLines() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const lines = Array.from({ length: 7 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * Math.PI * 2,
      speed: 0.006 + Math.random() * 0.01,
      len: 120 + Math.random() * 350,
      alpha: 0, dir: 1,
      col: Math.random() > 0.5 ? "0,100,220" : "170,0,0",
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
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
}

function DomainExpansion({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1900),
      setTimeout(() => setPhase(4), 2700),
      setTimeout(() => setPhase(5), 3100),
      setTimeout(() => setPhase(6), 4400),
      setTimeout(() => onComplete(), 4600),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  if (phase >= 6) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#000",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", overflow: "hidden",
      fontFamily: "'Cinzel Decorative', serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;700;900&family=Fira+Code:wght@300;400;600&display=swap');
        @keyframes crackDraw { from{opacity:0;stroke-dashoffset:900} to{opacity:1;stroke-dashoffset:0} }
        @keyframes lidTop { to{transform:scaleY(0);transform-origin:top} }
        @keyframes lidBot { to{transform:scaleY(0);transform-origin:bottom} }
        @keyframes irisIn { 0%{transform:scale(0);opacity:0} 60%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes pupilPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.4)} }
        @keyframes domainReveal { from{opacity:0;letter-spacing:1.5em} to{opacity:1;letter-spacing:0.5em} }
        @keyframes shockRing { to{transform:scale(9);opacity:0} }
        @keyframes bloodFlood { 0%{opacity:0;transform:scaleY(0);transform-origin:top} 30%{opacity:1;transform:scaleY(1)} 80%{opacity:1} 100%{opacity:0} }
        @keyframes titleBoom { 0%{transform:scale(3.5) translateY(-80px);opacity:0;filter:blur(30px)} 55%{transform:scale(0.93) translateY(6px);opacity:1;filter:blur(0)} 75%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        @keyframes glitch { 0%,100%{clip-path:inset(0 0 100% 0);transform:translateX(0)} 10%{clip-path:inset(8% 0 75% 0);transform:translateX(-5px)} 20%{clip-path:inset(35% 0 48% 0);transform:translateX(5px)} 35%{clip-path:inset(65% 0 15% 0);transform:translateX(-3px)} 50%{clip-path:inset(0 0 0 0);transform:translateX(0)} }
        @keyframes kanjiDrift { 0%,100%{transform:translateY(0) rotate(0deg);opacity:0.3} 50%{transform:translateY(-20px) rotate(15deg);opacity:0.7} }
      `}</style>

      {/* Crack SVG */}
      {phase >= 1 && (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {[
            ["50%","50%","8%","15%"],["50%","50%","85%","3%"],["50%","50%","98%","45%"],
            ["50%","50%","88%","90%"],["50%","50%","25%","98%"],["50%","50%","2%","65%"],
            ["50%","50%","40%","2%"],["50%","50%","60%","98%"],
          ].map(([x1,y1,x2,y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={i % 3 === 0 ? "#0044ff" : "#8b0000"}
              strokeWidth="0.8" opacity="0.7"
              style={{
                strokeDasharray: 900, strokeDashoffset: 900,
                animation: `crackDraw 0.7s ${i * 0.07}s ease forwards`,
              }}
            />
          ))}
          <circle cx="50%" cy="50%" r="5" fill="#ff1100"
            style={{ animation: "pupilPulse 0.8s ease-in-out infinite" }} />
          <circle cx="50%" cy="50%" r="20" fill="none" stroke="#ff000033"
            style={{ animation: "shockRing 4s ease-out infinite" }} />
        </svg>
      )}

      {/* Demonic Eye */}
      {phase >= 2 && phase < 5 && (
        <div style={{ position: "relative", width: 340, height: 155 }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 38% 38%, #1a0000, #000)",
            borderRadius: "50%", overflow: "hidden",
            border: "1px solid #8b0000",
            boxShadow: "0 0 80px #ff000066, inset 0 0 50px #00000099",
          }}>
            {/* Iris */}
            <div style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%,-50%)",
              width: 110, height: 110, borderRadius: "50%",
              background: "conic-gradient(from 0deg, #6b0000, #ff1a00, #ff5500, #dd0000, #8b0000, #ff2200, #6b0000)",
              animation: "irisIn 0.9s ease forwards",
              boxShadow: "0 0 30px #ff2200, 0 0 60px #ff000077",
            }}>
              {/* Slit pupil */}
              <div style={{
                position: "absolute", left: "50%", top: "50%",
                transform: "translate(-50%,-50%)",
                width: 20, height: 76, borderRadius: 10,
                background: "#000",
                boxShadow: "0 0 15px #ff0000",
                animation: "pupilPulse 1.4s ease-in-out infinite",
              }} />
              {/* Iris rings */}
              {[75, 92].map((s,i) => (
                <div key={i} style={{
                  position: "absolute", left: "50%", top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: s, height: s, borderRadius: "50%",
                  border: "1px solid #ff000033",
                }} />
              ))}
            </div>
          </div>
          {/* Eyelids */}
          <div style={{
            position: "absolute", left: 0, right: 0, top: 0, height: "50%",
            background: "#000",
            animation: "lidTop 0.7s 0.15s ease forwards",
            transformOrigin: "top",
          }} />
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0, height: "50%",
            background: "#000",
            animation: "lidBot 0.7s 0.15s ease forwards",
            transformOrigin: "bottom",
          }} />
          {/* Blood tears */}
          {[28, 50, 72].map((l, i) => (
            <div key={i} style={{
              position: "absolute", bottom: -26, left: `${l}%`,
              width: 2.5, height: 26 + i * 10,
              background: "linear-gradient(to bottom, #cc0000, transparent)",
              borderRadius: "0 0 50% 50%",
            }} />
          ))}
        </div>
      )}

      {/* Domain text */}
      {phase >= 3 && phase < 5 && (
        <div style={{ marginTop: 30, textAlign: "center", animation: "domainReveal 0.7s ease forwards" }}>
          <div style={{
            fontSize: "clamp(10px,1.8vw,14px)", color: "#ff3333",
            letterSpacing: "0.5em", fontFamily: "'Cinzel', serif", marginBottom: 6,
          }}>領域展開</div>
          <div style={{
            fontSize: "clamp(18px,4vw,34px)",
            color: "#fff", letterSpacing: "0.4em",
            textShadow: "0 0 30px #ff0000",
            fontFamily: "'Cinzel', serif", fontWeight: 700,
          }}>DOMAIN EXPANSION</div>
        </div>
      )}

      {/* Shockwave */}
      {phase >= 4 && (
        <>
          <div style={{
            position: "absolute",
            width: 220, height: 220, borderRadius: "50%",
            border: "3px solid #ff0000",
            animation: "shockRing 0.5s ease-out forwards",
          }} />
          <div style={{
            position: "fixed", inset: 0,
            background: "linear-gradient(135deg, #cc0000, #8b0000aa, transparent)",
            animation: "bloodFlood 0.9s ease forwards",
            pointerEvents: "none",
          }} />
        </>
      )}

      {/* Title slam */}
      {phase >= 5 && (
        <div style={{ animation: "titleBoom 0.7s cubic-bezier(0.16,1,0.3,1) forwards", textAlign: "center", position: "relative" }}>
          {/* Glitch overlay */}
          <div style={{
            position: "absolute", inset: 0,
            fontSize: "clamp(54px,12vw,120px)",
            fontFamily: "'Cinzel Decorative', serif", fontWeight: 900,
            color: "#0033ff", opacity: 0.4,
            animation: "glitch 0.5s 0.15s steps(1) forwards",
          }}>CODEJUDGE</div>

          <div style={{
            fontSize: "clamp(54px,12vw,120px)",
            fontFamily: "'Cinzel Decorative', serif", fontWeight: 900,
            color: "#fff", lineHeight: 0.85,
            textShadow: "0 0 50px #ff0000aa, 0 7px 0 #3a0000",
            letterSpacing: "0.06em",
          }}>CODE</div>
          <div style={{
            fontSize: "clamp(54px,12vw,120px)",
            fontFamily: "'Cinzel Decorative', serif", fontWeight: 900,
            color: "#cc0000", lineHeight: 0.85,
            textShadow: "0 0 80px #ff0000, 0 7px 0 #1a0000",
            letterSpacing: "0.3em",
          }}>JUDGE</div>
          <div style={{
            marginTop: 14, fontSize: "clamp(10px,1.8vw,15px)",
            color: "#ff444466", letterSpacing: "0.6em",
            fontFamily: "'Cinzel', serif",
          }}>— THE CURSED ARENA —</div>

          {/* Floating kanji around title */}
          {CURSES.map((k, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${-90 + i * 65}px`, top: `${-40 + (i % 3) * 25}px`,
              color: "#ff000033", fontSize: 30, fontFamily: "serif",
              animation: `kanjiDrift ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.25}s`,
            }}>{k}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => { if (entered) setTimeout(() => setVisible(true), 60); }, [entered]);
  const onMouse = useCallback((e) => setMouse({ x: e.clientX, y: e.clientY }), []);

  return (
    <>
      <DomainExpansion onComplete={() => setEntered(true)} />
      {entered && (
        <div onMouseMove={onMouse} style={{
          minHeight: "100vh", background: "#030000",
          fontFamily: "'Cinzel', serif",
          overflowX: "hidden", position: "relative",
          cursor: "crosshair",
        }}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@700;900&family=Fira+Code:wght@300;400;600&display=swap');
            * { box-sizing:border-box; margin:0; padding:0; }

            @keyframes fadeUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
            @keyframes flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.2} 94%{opacity:1} 97%{opacity:0.6} 98%{opacity:1} }
            @keyframes bloodPulse { 0%,100%{box-shadow:0 0 20px #ff000066,0 0 40px #ff000022} 50%{box-shadow:0 0 60px #ff0000cc,0 0 100px #ff000055} }
            @keyframes textBleed { 0%,100%{text-shadow:0 0 10px #ff000077} 50%{text-shadow:0 0 50px #ff0000,0 0 100px #ff000044} }
            @keyframes swordIdle { 0%,100%{transform:rotate(-5deg) scale(1)} 50%{transform:rotate(-2deg) scale(1.06)} }
            @keyframes chainPend { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }
            @keyframes cardFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
            @keyframes eyeGlow { 0%,100%{filter:drop-shadow(0 0 6px #ff0000)} 50%{filter:drop-shadow(0 0 22px #ff2200) drop-shadow(0 0 44px #ff000066)} }
            @keyframes scanDown { from{transform:translateY(-100%)} to{transform:translateY(100vh)} }
            @keyframes borderBleed { 0%,100%{border-color:#8b000044} 50%{border-color:#ff0000aa} }
            @keyframes glitchX { 0%,100%{transform:translateX(0)} 8%{transform:translateX(-4px)} 16%{transform:translateX(4px)} 24%{transform:translateX(0)} }
            @keyframes auraRing { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(2.8);opacity:0} }
            @keyframes runeFloat { 0%,100%{transform:translateY(0) rotate(0deg);opacity:0.12} 50%{transform:translateY(-18px) rotate(12deg);opacity:0.45} }
            @keyframes curseFlare { 0%,100%{opacity:0} 50%{opacity:0.06} }

            .btn-blood { position:relative; overflow:hidden; cursor:pointer; transition:transform 0.2s,box-shadow 0.2s; }
            .btn-blood::after { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,#ff000044,transparent); transform:translateX(-100%); transition:transform 0.5s; }
            .btn-blood:hover::after { transform:translateX(100%); }
            .btn-blood:hover { transform:translateY(-3px); }

            .card-curse { animation:cardFloat 4s ease-in-out infinite; transition:transform 0.3s,border-color 0.3s,box-shadow 0.3s; }
            .card-curse:hover { transform:translateY(-16px) scale(1.03) !important; animation-play-state:paused; }

            ::-webkit-scrollbar { width:5px; }
            ::-webkit-scrollbar-track { background:#050000; }
            ::-webkit-scrollbar-thumb { background:#8b0000; border-radius:3px; }
          `}</style>

          {/* Mouse aura */}
          <div style={{
            position: "fixed",
            left: mouse.x - 180, top: mouse.y - 180,
            width: 360, height: 360, borderRadius: "50%",
            background: "radial-gradient(circle, #ff00000e 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 2,
            transition: "left 0.08s, top 0.08s",
          }} />

          {/* Scanlines */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none",
            background: "repeating-linear-gradient(0deg,transparent,transparent 3px,#00000008 3px,#00000008 4px)",
          }} />
          <div style={{
            position: "fixed", left: 0, right: 0, height: 2,
            background: "linear-gradient(to right,transparent,#ff00001a,transparent)",
            zIndex: 4, pointerEvents: "none",
            animation: "scanDown 9s linear infinite",
          }} />

          {/* Curse flare bg */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
            background: "radial-gradient(ellipse at 20% 80%, #0022aa0a 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, #aa00000a 0%, transparent 50%)",
            animation: "curseFlare 5s ease-in-out infinite",
          }} />

          <BloodCanvas />
          <CursedLines />

          {/* Floating runes */}
          <div style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" }}>
            {RUNES.slice(0, 18).map((r, i) => (
              <span key={i} style={{
                position: "absolute",
                left: `${(i * 5.6 + 2) % 94}%`,
                top: `${(i * 7.3 + 8) % 88}%`,
                color: "#ff00001a", fontSize: `${16 + (i % 4) * 7}px`,
                fontFamily: "serif",
                animation: `runeFloat ${5 + i * 0.6}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
                userSelect: "none",
              }}>{r}</span>
            ))}
            {CURSES.map((k, i) => (
              <span key={`c${i}`} style={{
                position: "absolute",
                left: `${(i * 14 + 6) % 88}%`,
                top: `${(i * 12 + 52) % 82}%`,
                color: "#0044ff0f", fontSize: `${22 + i * 4}px`,
                fontFamily: "serif",
                animation: `runeFloat ${7 + i * 0.8}s ease-in-out infinite`,
                animationDelay: `${i * 0.55}s`,
                userSelect: "none",
              }}>{k}</span>
            ))}
          </div>

          {/* NAV */}
          <nav style={{
            position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 48px",
            background: "linear-gradient(to bottom, #06000099, transparent)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid #8b000020",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, animation: "flicker 5s infinite" }}>
              <div style={{ position: "relative", width: 30, height: 17 }}>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: "conic-gradient(from 0deg, #8b0000, #ff2200, #cc0000, #8b0000)",
                  boxShadow: "0 0 12px #ff0000",
                  animation: "eyeGlow 2s ease-in-out infinite",
                }}>
                  <div style={{
                    position: "absolute", left: "50%", top: "50%",
                    transform: "translate(-50%,-50%)",
                    width: 6, height: 13, borderRadius: 3, background: "#000",
                  }} />
                </div>
              </div>
              <span style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: 18, fontWeight: 900, color: "#ff2200",
                textShadow: "0 0 20px #ff0000aa", letterSpacing: "0.1em",
              }}>CodeJudge</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => navigate("/login")} className="btn-blood" style={{
                background: "transparent", border: "1px solid #8b000066",
                color: "#ff4444", padding: "9px 24px", borderRadius: 3,
                fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.15em",
                animation: "borderBleed 3s infinite",
              }}>ENTER</button>
              <button onClick={() => navigate("/register")} className="btn-blood" style={{
                background: "linear-gradient(135deg, #6b0000, #cc0000)",
                border: "1px solid #ff000055", color: "#fff",
                padding: "9px 24px", borderRadius: 3,
                fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.15em",
                boxShadow: "0 0 20px #ff000044",
              }}>BLOOD OATH</button>
            </div>
          </nav>

          {/* HERO */}
          <section style={{
            minHeight: "100vh", position: "relative", zIndex: 5,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", textAlign: "center",
            padding: "140px 24px 80px",
          }}>
            {[0, 0.5, 1.0].map((d, i) => (
              <div key={i} style={{
                position: "absolute",
                width: 400, height: 400, borderRadius: "50%",
                border: "1px solid #ff000022",
                animation: `auraRing 3.5s ${d}s ease-out infinite`,
                pointerEvents: "none",
              }} />
            ))}
            <div style={{
              position: "absolute", width: 800, height: 800, borderRadius: "50%",
              background: "radial-gradient(circle, #ff000014 0%, transparent 65%)",
              pointerEvents: "none",
            }} />

            <div style={{
              fontSize: "clamp(50px,8vw,90px)",
              animation: "swordIdle 3.5s ease-in-out infinite",
              marginBottom: 24,
              filter: "drop-shadow(0 0 24px #ff0000) drop-shadow(0 0 50px #ff000055)",
            }}>⚔</div>

            <div style={{ opacity: visible ? 1 : 0, animation: visible ? "fadeUp 0.8s ease forwards" : "none" }}>
              <div style={{
                fontSize: "clamp(10px,1.5vw,14px)", letterSpacing: "0.7em",
                color: "#ff444455", marginBottom: 22, fontFamily: "'Cinzel', serif",
              }}>ᚠ &nbsp; 呪術廻戦 CODE ARENA &nbsp; ᚠ</div>

              <div style={{ animation: "flicker 7s infinite" }}>
                <div style={{
                  fontSize: "clamp(68px,15vw,160px)",
                  fontFamily: "'Cinzel Decorative', serif", fontWeight: 900,
                  color: "#fff", lineHeight: 0.83,
                  textShadow: "0 0 60px #ff0000aa, 0 7px 0 #3a0000",
                  letterSpacing: "0.06em",
                  animation: "glitchX 10s ease-in-out infinite",
                }}>CODE</div>
                <div style={{
                  fontSize: "clamp(68px,15vw,160px)",
                  fontFamily: "'Cinzel Decorative', serif", fontWeight: 900,
                  color: "#cc0000", lineHeight: 0.83,
                  textShadow: "0 0 90px #ff0000, 0 7px 0 #1a0000",
                  letterSpacing: "0.3em",
                  animation: "textBleed 4s ease-in-out infinite",
                }}>JUDGE</div>
              </div>

              <p style={{
                marginTop: 40, fontSize: "clamp(13px,1.8vw,18px)",
                color: "#aa4444", maxWidth: 600, margin: "40px auto 0",
                lineHeight: 2, fontFamily: "'Fira Code', monospace", fontWeight: 300,
              }}>
                You don't rise by climbing.<br />
                <span style={{ color: "#ff4444aa" }}>You rise by crawling through blood.</span><br />
                Solve. Survive. Ascend.
              </p>

              <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", marginTop: 52 }}>
                <button onClick={() => navigate("/register")} className="btn-blood" style={{
                  background: "linear-gradient(135deg, #8b0000, #ff0000)",
                  border: "none", color: "#fff",
                  padding: "20px 56px", fontSize: 15,
                  fontFamily: "'Cinzel', serif", letterSpacing: "0.25em", borderRadius: 3,
                  boxShadow: "0 0 40px #ff000077",
                  animation: "bloodPulse 2.5s infinite",
                }}>⚔ &nbsp; ENTER THE DOMAIN</button>
                <button onClick={() => navigate("/login")} className="btn-blood" style={{
                  background: "transparent",
                  border: "2px solid #8b0000", color: "#ff4444",
                  padding: "20px 56px", fontSize: 15,
                  fontFamily: "'Cinzel', serif", letterSpacing: "0.25em", borderRadius: 3,
                }}>🩸 &nbsp; I BEAR THE MARK</button>
              </div>
            </div>

            <div style={{
              position: "absolute", bottom: 32,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              color: "#8b000077", fontSize: 11,
              fontFamily: "'Cinzel', serif", letterSpacing: "0.4em",
              opacity: visible ? 1 : 0, transition: "opacity 1.5s 1.8s",
            }}>
              <span>DESCEND</span>
              <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom, #8b0000, transparent)" }} />
            </div>
          </section>

          {/* LORE STRIP */}
          <div style={{
            position: "relative", zIndex: 5,
            borderTop: "1px solid #8b000033", borderBottom: "1px solid #8b000033",
            padding: "18px 0",
            background: "linear-gradient(to right, transparent, #0d000077, transparent)",
          }}>
            <div style={{
              display: "flex", gap: 48, justifyContent: "center",
              flexWrap: "wrap", padding: "0 40px",
              color: "#8b000055", fontSize: 12,
              fontFamily: "'Fira Code', monospace", letterSpacing: "0.15em",
            }}>
              {["// BLEED CODE", ":: DOMAIN EXPANSION ACTIVE", ">> 150+ CURSED PROBLEMS",
                "// TIER SYSTEM ENABLED", ":: NO MERCY GIVEN", ">> RANK UP OR DIE"].map((t, i) => (
                <span key={i} style={{ color: i % 2 === 0 ? "#8b000055" : "#0044ff33" }}>{t}</span>
              ))}
            </div>
          </div>

          {/* TIERS */}
          <section style={{ position: "relative", zIndex: 5, maxWidth: 1100, margin: "0 auto", padding: "100px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 68 }}>
              <div style={{ color: "#ff444455", letterSpacing: "0.6em", fontSize: 11, marginBottom: 14 }}>
                呪術 &nbsp; CURSED TIERS &nbsp; 呪術
              </div>
              <h2 style={{
                fontFamily: "'Cinzel Decorative', serif",
                fontSize: "clamp(26px,5vw,50px)", color: "#fff",
                textShadow: "0 0 40px #ff000044",
                animation: "textBleed 5s ease-in-out infinite",
              }}>Three Domains of Hell</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 28 }}>
              {[
                { kanji:"一", icon:"🗡", tier:"Vessel", diff:"Easy", rank:"Grade 4",
                  color:"#00ff88", glow:"#00ff8833", delay:"0s",
                  desc:"The outer ward. Spirits are weak but countless. Survive to earn the right to descend." },
                { kanji:"二", icon:"⚔", tier:"Sorcerer", diff:"Medium", rank:"Grade 2",
                  color:"#ffaa00", glow:"#ffaa0033", delay:"0.2s", locked:true,
                  desc:"The cursed womb. Only those who bathed in Grade 4 blood may enter." },
                { kanji:"三", icon:"💀", tier:"Special Grade", diff:"Hard", rank:"Special",
                  color:"#ff4444", glow:"#ff444433", delay:"0.4s", locked:true,
                  desc:"Malevolent Shrine. This domain devours the unworthy. Sukuna awaits." },
              ].map((c, i) => (
                <div key={i} className="card-curse" style={{
                  background: "linear-gradient(145deg, #0a0000, #130000)",
                  border: `1px solid ${c.color}33`, borderRadius: 6,
                  padding: 36, position: "relative", overflow: "hidden",
                  animationDelay: c.delay,
                  boxShadow: `0 12px 48px ${c.glow}`,
                }}>
                  <div style={{
                    position: "absolute", right: -8, top: -18,
                    fontSize: 130, color: `${c.color}07`,
                    fontFamily: "serif", fontWeight: 900,
                    userSelect: "none", lineHeight: 1,
                  }}>{c.kanji}</div>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(to right, transparent, ${c.color}88, transparent)`,
                  }} />
                  {c.locked && (
                    <div style={{
                      position: "absolute", top: 14, left: 14,
                      background: "#1a0000", border: "1px solid #ff000033",
                      borderRadius: 3, padding: "2px 10px",
                      fontSize: 10, color: "#ff444455",
                      fontFamily: "'Cinzel', serif", letterSpacing: "0.15em",
                    }}>SEALED</div>
                  )}
                  <div style={{ fontSize: 46, marginBottom: 18, filter: `drop-shadow(0 0 14px ${c.color})` }}>{c.icon}</div>
                  <div style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: 22, fontWeight: 900, color: c.color,
                    textShadow: `0 0 20px ${c.color}66`, marginBottom: 2,
                  }}>{c.tier}</div>
                  <div style={{
                    fontSize: 10, color: `${c.color}66`,
                    letterSpacing: "0.4em", marginBottom: 8,
                    fontFamily: "'Cinzel', serif",
                  }}>{c.rank} — {c.diff.toUpperCase()}</div>
                  <div style={{ width: 40, height: 1, background: `${c.color}44`, marginBottom: 18 }} />
                  <p style={{
                    color: "#996666", fontSize: 13,
                    lineHeight: 1.85, fontFamily: "'Fira Code', monospace", fontWeight: 300,
                  }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* STATS */}
          <section style={{
            position: "relative", zIndex: 5,
            padding: "60px 24px 80px",
            background: "linear-gradient(to bottom, transparent, #0d000066, transparent)",
          }}>
            <div style={{
              maxWidth: 860, margin: "0 auto",
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 24,
            }}>
              {[
                { v:"150+", l:"Cursed Problems", i:"📜" },
                { v:"3", l:"Domains of Hell", i:"🏯" },
                { v:"∞", l:"Souls Devoured", i:"💀" },
                { v:"0", l:"Survivors", i:"⚡" },
              ].map((s, i) => (
                <div key={i} style={{
                  textAlign: "center", padding: "28px 16px",
                  border: "1px solid #8b000033", borderRadius: 6,
                  background: "#0a000066",
                  animation: `fadeUp 0.6s ${i * 0.12}s ease both`,
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{s.i}</div>
                  <div style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: 42, fontWeight: 900, color: "#cc0000",
                    textShadow: "0 0 20px #ff000044", lineHeight: 1,
                  }}>{s.v}</div>
                  <div style={{
                    color: "#884444", fontSize: 10,
                    letterSpacing: "0.25em", marginTop: 8,
                    fontFamily: "'Cinzel', serif",
                  }}>{s.l.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </section>

          {/* FINAL CTA */}
          <section style={{
            position: "relative", zIndex: 5,
            padding: "80px 24px 130px", textAlign: "center",
          }}>
            <div style={{
              fontSize: 38, marginBottom: 30, opacity: 0.35,
              display: "inline-block",
              animation: "chainPend 5s ease-in-out infinite",
            }}>⛓</div>

            <h2 style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "clamp(26px,5vw,52px)", color: "#fff",
              textShadow: "0 0 40px #ff000044",
              marginBottom: 20, lineHeight: 1.25,
            }}>
              Your Cursed Energy.<br />
              <span style={{ color: "#cc0000" }}>Your Legend.</span>
            </h2>

            <p style={{
              color: "#884444", maxWidth: 460, margin: "0 auto 52px",
              fontFamily: "'Fira Code', monospace",
              fontSize: 13, lineHeight: 2, fontWeight: 300,
            }}>
              Ten Shadows. Infinite Voids.<br />
              The dungeon consumes the weak.<br />
              Will you be consumed — or will you consume it?
            </p>

            <button onClick={() => navigate("/register")} className="btn-blood" style={{
              background: "linear-gradient(135deg, #5a0000, #cc0000, #8b0000)",
              border: "2px solid #ff000044", color: "#fff",
              padding: "24px 72px", fontSize: 17,
              fontFamily: "'Cinzel Decorative', serif",
              letterSpacing: "0.2em", borderRadius: 4,
              boxShadow: "0 0 60px #ff000033, inset 0 0 20px #ff000022",
              animation: "bloodPulse 2s infinite",
            }}>⚔ &nbsp; FORGE THE OATH</button>

            <div style={{
              marginTop: 88, color: "#8b000022",
              fontSize: 20, letterSpacing: "0.6em", fontFamily: "serif",
            }}>ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ</div>

            <div style={{
              marginTop: 18, color: "#8b000044",
              fontSize: 10, letterSpacing: "0.4em",
              fontFamily: "'Cinzel', serif",
            }}>
              © CODEJUDGE — 呪術廻戦 CODE ARENA — WHERE SORCERERS ARE FORGED
            </div>
          </section>
        </div>
      )}
    </>
  );
}