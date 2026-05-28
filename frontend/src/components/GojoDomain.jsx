// frontend/src/components/GojoDomain.jsx
import { useState, useEffect } from 'react';

export default function GojoDomain({ onComplete, problemTitle }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
      setTimeout(() => setPhase(3), 1600),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => setPhase(5), 3600),
      setTimeout(() => onComplete(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase >= 5) return null;

  return (
    <div style={styles.overlay}>
      <style>{`
        @keyframes voidExpand { from{transform:scale(0);opacity:1} to{transform:scale(8);opacity:0} }
        @keyframes domainReveal { from{opacity:0;letter-spacing:2em} to{opacity:1;letter-spacing:0.2em} }
        @keyframes titleBoom { 0%{transform:scale(3);opacity:0;filter:blur(20px)} 60%{transform:scale(0.9)} 100%{transform:scale(1);opacity:1} }
        @keyframes blueFlood { 0%{opacity:0} 30%{opacity:1} 80%{opacity:1} 100%{opacity:0} }
        @keyframes pupilPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
      `}</style>

      {/* Void expansion rings */}
      {phase >= 1 && (
        <div style={styles.voidContainer}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ ...styles.voidRing, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      )}

      {/* Gojo's Eye */}
      {phase >= 2 && (
        <div style={styles.eyeContainer}>
          <div style={styles.eye}>
            <div style={styles.iris}>
              <div style={styles.pupil} />
            </div>
          </div>
          <div style={styles.blueTears} />
        </div>
      )}

      {/* Domain expansion text */}
      {phase >= 3 && (
        <div style={styles.domainText}>
          <div style={{ fontSize: 'clamp(12px,2vw,16px)', color: '#4488ff', letterSpacing: '0.5em', marginBottom: 8 }}>領域展開</div>
          <div style={{ fontSize: 'clamp(28px,6vw,56px)', color: '#fff', textShadow: '0 0 40px #4488ff', fontFamily: "'Cinzel Decorative', serif" }}>
            UNLIMITED VOID
          </div>
          <div style={{ fontSize: 'clamp(14px,3vw,24px)', color: '#88aaff', marginTop: 12, letterSpacing: '0.2em' }}>
            {problemTitle}
          </div>
        </div>
      )}

      {/* Blue light surge */}
      {phase >= 4 && <div style={styles.blueSurge} />}
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
  voidContainer: {
    position: 'absolute', width: '100%', height: '100%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  voidRing: {
    position: 'absolute',
    width: 100, height: 100, borderRadius: '50%',
    border: '2px solid #4488ff',
    opacity: 0,
    animation: 'voidExpand 1.5s ease-out forwards',
  },
  eyeContainer: {
    position: 'relative', width: 200, height: 90,
  },
  eye: {
    position: 'absolute', inset: 0,
    background: 'radial-gradient(ellipse at 38% 38%, #000033, #000)',
    borderRadius: '50%',
    border: '1px solid #4488ff',
    boxShadow: '0 0 40px #4488ff66',
  },
  iris: {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%,-50%)',
    width: 70, height: 70, borderRadius: '50%',
    background: 'conic-gradient(from 0deg, #0033aa, #2266ff, #4488ff, #2266ff, #0033aa)',
    boxShadow: '0 0 30px #4488ff',
  },
  pupil: {
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%,-50%)',
    width: 14, height: 50, borderRadius: 10,
    background: '#000',
    boxShadow: '0 0 10px #4488ff',
    animation: 'pupilPulse 0.8s ease-in-out infinite',
  },
  blueTears: {
    position: 'absolute', bottom: -30, left: '50%', width: 4, height: 40,
    background: 'linear-gradient(to bottom, #4488ff, transparent)',
    transform: 'translateX(-50%)',
  },
  domainText: {
    textAlign: 'center', animation: 'domainReveal 0.8s ease forwards',
    marginTop: 40,
  },
  blueSurge: {
    position: 'fixed', inset: 0,
    background: 'linear-gradient(135deg, #4488ff, #0033aaaa, transparent)',
    animation: 'blueFlood 0.6s ease forwards',
    pointerEvents: 'none',
  },
};