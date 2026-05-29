// // frontend/src/components/SukunaDomain.jsx
// import { useEffect, useState } from 'react';

// export default function SukunaDomain({ onComplete, problemTitle }) {
//   const [phase, setPhase] = useState(0);

//   useEffect(() => {
//     const timers = [
//       setTimeout(() => setPhase(1), 300),
//       setTimeout(() => setPhase(2), 900),
//       setTimeout(() => setPhase(3), 1800),
//       setTimeout(() => setPhase(4), 2800),
//       setTimeout(() => setPhase(5), 3800),
//       setTimeout(() => onComplete(), 4200),
//     ];
//     return () => timers.forEach(clearTimeout);
//   }, []);

//   if (phase >= 5) return null;

//   return (
//     <div style={styles.overlay}>
//       <style>{`
//         @keyframes crackDraw { from{opacity:0;stroke-dashoffset:800} to{opacity:1;stroke-dashoffset:0} }
//         @keyframes domainReveal { from{opacity:0;letter-spacing:2em} to{opacity:1;letter-spacing:0.2em} }
//         @keyframes titleBoom { 0%{transform:scale(3);opacity:0;filter:blur(20px)} 60%{transform:scale(0.9)} 100%{transform:scale(1);opacity:1} }
//         @keyframes bloodFlood { 0%{opacity:0} 30%{opacity:1} 80%{opacity:1} 100%{opacity:0} }
//       `}</style>

//       {/* Cracking lines */}
//       {phase >= 1 && (
//         <svg style={styles.crackSvg}>
//           {[[50,50,10,90],[50,50,90,10],[50,50,95,50],[50,50,50,95]].map(([x1,y1,x2,y2], i) => (
//             <line
//               key={i}
//               x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
//               stroke="#ff0000" strokeWidth="1.5" opacity="0.7"
//               style={{ strokeDasharray: 800, strokeDashoffset: 800, animation: `crackDraw 0.6s ${i*0.1}s ease forwards` }}
//             />
//           ))}
//         </svg>
//       )}

//       {/* Sukuna's Eye */}
//       {phase >= 2 && (
//         <div style={styles.eyeContainer}>
//           <div style={styles.eye}>
//             <div style={styles.iris}>
//               <div style={styles.pupil} />
//             </div>
//           </div>
//           <div style={styles.bloodTears} />
//         </div>
//       )}

//       {/* Domain expansion text */}
//       {phase >= 3 && (
//         <div style={styles.domainText}>
//           <div style={{ fontSize: 'clamp(12px,2vw,16px)', color: '#ff3333', letterSpacing: '0.5em', marginBottom: 8 }}>領域展開</div>
//           <div style={{ fontSize: 'clamp(28px,6vw,56px)', color: '#fff', textShadow: '0 0 40px #ff0000', fontFamily: "'Cinzel Decorative', serif" }}>
//             MALEVOLENT SHRINE
//           </div>
//           <div style={{ fontSize: 'clamp(14px,3vw,24px)', color: '#ff8888', marginTop: 12, letterSpacing: '0.2em' }}>
//             {problemTitle}
//           </div>
//         </div>
//       )}

//       {/* Blood surge */}
//       {phase >= 4 && <div style={styles.bloodSurge} />}
//     </div>
//   );
// }

// const styles = {
//   overlay: {
//     position: 'fixed', inset: 0, zIndex: 9999,
//     background: '#000',
//     display: 'flex', alignItems: 'center', justifyContent: 'center',
//     flexDirection: 'column',
//     fontFamily: "'Cinzel', serif",
//   },
//   crackSvg: {
//     position: 'absolute', inset: 0, width: '100%', height: '100%',
//   },
//   eyeContainer: {
//     position: 'relative', width: 200, height: 90,
//   },
//   eye: {
//     position: 'absolute', inset: 0,
//     background: 'radial-gradient(ellipse at 38% 38%, #1a0000, #000)',
//     borderRadius: '50%',
//     border: '1px solid #8b0000',
//     boxShadow: '0 0 40px #ff000066',
//   },
//   iris: {
//     position: 'absolute', left: '50%', top: '50%',
//     transform: 'translate(-50%,-50%)',
//     width: 70, height: 70, borderRadius: '50%',
//     background: 'conic-gradient(from 0deg, #6b0000, #ff1a00, #ff5500, #dd0000, #8b0000)',
//     boxShadow: '0 0 30px #ff2200',
//   },
//   pupil: {
//     position: 'absolute', left: '50%', top: '50%',
//     transform: 'translate(-50%,-50%)',
//     width: 14, height: 50, borderRadius: 10,
//     background: '#000',
//     boxShadow: '0 0 10px #ff0000',
//   },
//   bloodTears: {
//     position: 'absolute', bottom: -30, left: '50%', width: 4, height: 40,
//     background: 'linear-gradient(to bottom, #cc0000, transparent)',
//     transform: 'translateX(-50%)',
//   },
//   domainText: {
//     textAlign: 'center', animation: 'domainReveal 0.8s ease forwards',
//     marginTop: 40,
//   },
//   bloodSurge: {
//     position: 'fixed', inset: 0,
//     background: 'linear-gradient(135deg, #cc0000, #8b0000aa, transparent)',
//     animation: 'bloodFlood 0.6s ease forwards',
//     pointerEvents: 'none',
//   },
// };
// frontend/src/components/SukunaDomain.jsx
import { useState, useEffect } from 'react';

export default function SukunaDomain({ onComplete, problemTitle }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const audio = new Audio('/sukuna-ganbare.mp3');
    audio.volume = 0.7;
    audio.play().catch(err => {
      console.warn("Audio playback failed or was blocked by browser autoplay policy:", err);
    });

    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1800),
      setTimeout(() => setPhase(4), 2800),
      setTimeout(() => setPhase(5), 3800),
      setTimeout(() => onComplete(), 4200),
    ];
    return () => {
      timers.forEach(clearTimeout);
      audio.pause();
    };
  }, []);

  if (phase >= 5) return null;

  return (
    <div style={styles.overlay}>
      <style>{`
        @keyframes crackDraw { from{opacity:0;stroke-dashoffset:800} to{opacity:1;stroke-dashoffset:0} }
        @keyframes domainReveal { from{opacity:0;letter-spacing:2em} to{opacity:1;letter-spacing:0.2em} }
        @keyframes titleBoom { 0%{transform:scale(3);opacity:0;filter:blur(20px)} 60%{transform:scale(0.9)} 100%{transform:scale(1);opacity:1} }
        @keyframes bloodFlood { 0%{opacity:0} 30%{opacity:1} 80%{opacity:1} 100%{opacity:0} }
        @keyframes pupilPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
      `}</style>

      {phase >= 1 && (
        <svg style={styles.crackSvg}>
          {[[50,50,10,90],[50,50,90,10],[50,50,95,50],[50,50,50,95]].map(([x1,y1,x2,y2], i) => (
            <line
              key={i}
              x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
              stroke="#ff0000" strokeWidth="1.5" opacity="0.7"
              style={{ strokeDasharray: 800, strokeDashoffset: 800, animation: `crackDraw 0.6s ${i*0.1}s ease forwards` }}
            />
          ))}
        </svg>
      )}

      {phase >= 2 && (
        <div style={styles.eyeContainer}>
          <div style={styles.eye}>
            <div style={styles.iris}>
              <div style={styles.pupil} />
            </div>
          </div>
          <div style={styles.bloodTears} />
        </div>
      )}

      {phase >= 3 && (
        <div style={styles.domainText}>
          <div style={{ fontSize: 'clamp(12px,2vw,16px)', color: '#ff3333', letterSpacing: '0.5em', marginBottom: 8 }}>領域展開</div>
          <div style={{ fontSize: 'clamp(28px,6vw,56px)', color: '#fff', textShadow: '0 0 40px #ff0000', fontFamily: "'Cinzel Decorative', serif" }}>
            MALEVOLENT SHRINE
          </div>
          <div style={{ fontSize: 'clamp(14px,3vw,24px)', color: '#ff8888', marginTop: 12, letterSpacing: '0.2em' }}>
            {problemTitle}
          </div>
        </div>
      )}

      {phase >= 4 && <div style={styles.bloodSurge} />}
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: '#000',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: "'Cinzel', serif",
  },
  crackSvg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
  },
  eyeContainer: {
    position: 'relative', width: 200, height: 90,
  },
  eye: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 38% 38%, #1a0000, #000)',
    borderRadius: '50%',
    border: '1px solid #8b0000',
    boxShadow: '0 0 40px #ff000066',
  },
  iris: {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%,-50%)',
    width: 70, height: 70, borderRadius: '50%',
    background: 'conic-gradient(from 0deg, #6b0000, #ff1a00, #ff5500, #dd0000, #8b0000)',
    boxShadow: '0 0 30px #ff2200',
  },
  pupil: {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%,-50%)',
    width: 14, height: 50, borderRadius: 10,
    background: '#000',
    boxShadow: '0 0 10px #ff0000',
    animation: 'pupilPulse 0.8s ease-in-out infinite',
  },
  bloodTears: {
    position: 'absolute', bottom: -30, left: '50%', width: 4, height: 40,
    background: 'linear-gradient(to bottom, #cc0000, transparent)',
    transform: 'translateX(-50%)',
  },
  domainText: {
    textAlign: 'center', animation: 'domainReveal 0.8s ease forwards',
    marginTop: 40,
  },
  bloodSurge: {
    position: 'fixed', inset: 0,
    background: 'linear-gradient(135deg, #cc0000, #8b0000aa, transparent)',
    animation: 'bloodFlood 0.6s ease forwards',
    pointerEvents: 'none',
  },
};