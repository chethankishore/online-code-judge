// frontend/src/components/PrisonRealm.jsx
import { useState, useEffect, useRef } from 'react';

export default function PrisonRealm({ onComplete, testsPassed, totalTests }) {
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Phase transitions
    const timers = [
      setTimeout(() => setPhase(1), 100),   // Dark void & heavy shake
      setTimeout(() => setPhase(2), 800),   // Cube opens / eyes blink
      setTimeout(() => setPhase(3), 1800),  // Cursed chains wrap / Japanese text
      setTimeout(() => setPhase(4), 3000),  // "Sealed" Wrong Answer text / Gojo tears
      setTimeout(() => setPhase(5), 4500),  // Implosion / Collapse
      setTimeout(() => onComplete(), 5200), // Finish and clean up
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Canvas particle / weeping effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Tears & Cursed Energy Ashes
    const ashes = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1 + Math.random() * 3,
      vx: (Math.random() - 0.5) * 0.5,
      vy: 0.5 + Math.random() * 1.2,
      alpha: 0.2 + Math.random() * 0.6,
    }));

    const bloodyTears = [];

    let frame;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Eerie purple/black background vignette
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 50,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) * 0.7
      );
      bgGrad.addColorStop(0, 'rgba(10, 0, 15, 0.92)');
      bgGrad.addColorStop(1, '#020003');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw ashes (snow-like, but dark and cursed)
      ashes.forEach(a => {
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${a.alpha})`; // Purple/violet ash
        ctx.fill();
        a.x += a.vx;
        a.y += a.vy;
        if (a.y > canvas.height) {
          a.y = -10;
          a.x = Math.random() * canvas.width;
        }
      });

      // Periodically spawn bloody tears from the center cube
      if (phase >= 2 && Math.random() > 0.85) {
        bloodyTears.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 120,
          y: canvas.height / 2 + (Math.random() - 0.5) * 60,
          vy: 2 + Math.random() * 3,
          length: 5 + Math.random() * 20,
          alpha: 0.8,
        });
      }

      // Draw bloody tears (Wrong Answer blood drops)
      bloodyTears.forEach((t, i) => {
        ctx.beginPath();
        const grad = ctx.createLinearGradient(t.x, t.y, t.x, t.y + t.length);
        grad.addColorStop(0, `rgba(220, 38, 38, ${t.alpha})`);
        grad.addColorStop(1, 'rgba(127, 29, 29, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5;
        ctx.moveTo(t.x, t.y);
        ctx.lineTo(t.x, t.y + t.length);
        ctx.stroke();

        t.y += t.vy;
        t.alpha -= 0.01;
        if (t.alpha <= 0) bloodyTears.splice(i, 1);
      });

      frame = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [phase]);

  return (
    <div style={styles.overlay} className={phase === 1 ? 'screen-shake' : ''}>
      <style>{`
        /* Keyframe animations for the Prison Realm */
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-4px, -2px) rotate(-1deg); }
          30% { transform: translate(3px, 4px) rotate(1deg); }
          50% { transform: translate(-3px, 2px) rotate(-1.5deg); }
          70% { transform: translate(4px, -3px) rotate(1deg); }
          90% { transform: translate(-2px, 3px) rotate(-0.5deg); }
        }
        .screen-shake {
          animation: shake 0.6s infinite;
        }
        
        @keyframes cubeFloat {
          0%, 100% { transform: translateY(0px) rotateY(0deg) rotateX(15deg); }
          50% { transform: translateY(-15px) rotateY(180deg) rotateX(25deg); }
        }
        .prison-cube {
          width: 140px;
          height: 140px;
          position: relative;
          transform-style: preserve-3d;
          animation: cubeFloat 6s ease-in-out infinite;
          transition: transform 0.8s;
        }

        /* 3D Cube face layout */
        .face {
          position: absolute;
          width: 140px;
          height: 140px;
          background: linear-gradient(135deg, #11051c, #05010a);
          border: 2px solid #581c87;
          box-shadow: inset 0 0 25px #000, 0 0 15px #6b21a833;
          display: flex;
          align-items: center;
          justify-content: center;
          backface-visibility: visible;
        }

        .face-front  { transform: rotateY(0deg) translateZ(70px); }
        .face-back   { transform: rotateY(180deg) translateZ(70px); }
        .face-right  { transform: rotateY(90deg) translateZ(70px); }
        .face-left   { transform: rotateY(-90deg) translateZ(70px); }
        .face-top    { transform: rotateX(90deg) translateZ(70px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(70px); }

        /* Creepy Eyes opening inside the Cube */
        @keyframes eyeBlink {
          0%, 100% { transform: scaleY(0); opacity: 0; }
          5%, 95% { transform: scaleY(1); opacity: 1; }
          30%, 70% { transform: scaleY(0.1); }
          32%, 68% { transform: scaleY(1); }
        }
        .creepy-eye {
          width: 50px;
          height: 24px;
          background: #f8fafc;
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          border: 1px solid #7f1d1d;
          box-shadow: 0 0 10px #ef4444;
          transform: scaleY(0);
          animation: eyeBlink 3.5s ease-in-out infinite;
        }
        .creepy-eye::before {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background: #7f1d1d;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 6px #ef4444;
        }
        .creepy-eye::after {
          content: '';
          position: absolute;
          width: 6px;
          height: 6px;
          background: #000;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }

        /* Implosion / Sealing collapse animation */
        @keyframes implosion {
          0% { transform: scale(1); filter: blur(0); opacity: 1; }
          40% { transform: scale(1.3) rotate(15deg); filter: blur(2px); }
          100% { transform: scale(0); filter: blur(40px); opacity: 0; }
        }
        .prison-implode {
          animation: implosion 0.8s cubic-bezier(0.85, 0, 0.15, 1) forwards;
        }

        /* Chains animation */
        @keyframes chainIn {
          from { stroke-dashoffset: 600; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 0.65; }
        }
        .cursed-chain {
          stroke: #dc2626;
          stroke-width: 2.5;
          fill: none;
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          filter: drop-shadow(0 0 6px #ef4444);
          animation: chainIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Fading typography */
        @keyframes textGlow {
          from { opacity: 0; transform: scale(0.9) translateY(20px); filter: blur(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        .txt-fade-in {
          animation: textGlow 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      {/* Background canvas for cursed energy smoke and blood drops */}
      <canvas ref={canvasRef} style={styles.canvas} />

      <div style={styles.contentContainer} className={phase === 5 ? 'prison-implode' : ''}>
        {/* Phase 1+: 3D Cube (The Prison Realm / Gokumonkyō) */}
        {phase >= 1 && (
          <div style={styles.cubeContainer}>
            <div className="prison-cube" style={{ transform: phase >= 5 ? 'scale(0)' : '' }}>
              {/* Front Face */}
              <div className="face face-front">
                {phase >= 2 && <div className="creepy-eye" style={{ animationDelay: '0.1s' }} />}
              </div>
              {/* Back Face */}
              <div className="face face-back">
                {phase >= 2 && <div className="creepy-eye" style={{ animationDelay: '0.9s' }} />}
              </div>
              {/* Right Face */}
              <div className="face face-right">
                {phase >= 2 && <div className="creepy-eye" style={{ animationDelay: '0.4s' }} />}
              </div>
              {/* Left Face */}
              <div className="face face-left">
                {phase >= 2 && <div className="creepy-eye" style={{ animationDelay: '1.2s' }} />}
              </div>
              {/* Top Face */}
              <div className="face face-top">
                {phase >= 2 && <div className="creepy-eye" style={{ animationDelay: '0.6s' }} />}
              </div>
              {/* Bottom Face */}
              <div className="face face-bottom">
                {phase >= 2 && <div className="creepy-eye" style={{ animationDelay: '1.5s' }} />}
              </div>
            </div>
            {/* Cursed Aura below the cube */}
            <div style={styles.cubeShadow} />
          </div>
        )}

        {/* Phase 3+: Cursed Chains Wrapping the Screen */}
        {phase >= 3 && (
          <svg style={styles.chainsSvg}>
            {/* Diagonal chain 1 */}
            <path className="cursed-chain" d="M -50,-50 L 1000,1000" style={{ animationDelay: '0s' }} />
            {/* Diagonal chain 2 */}
            <path className="cursed-chain" d="M 1200,-50 L -50,1000" style={{ animationDelay: '0.2s' }} />
            {/* Circular chain around cube */}
            <circle className="cursed-chain" cx="50%" cy="50%" r="140" style={{ animationDelay: '0.4s' }} />
          </svg>
        )}

        {/* Phase 3+: Japanese Cursed Text */}
        {phase >= 3 && (
          <div className="txt-fade-in" style={styles.japaneseTitle}>
            獄門疆
          </div>
        )}

        {/* Phase 4+: Verdict & Stats */}
        {phase >= 4 && (
          <div className="txt-fade-in" style={styles.failureDetails}>
            <div style={styles.wrongAnswer}>WRONG ANSWER</div>
            <div style={styles.subtitle}>CODE SEALED IN THE PRISON REALM</div>
            
            {testsPassed !== undefined && totalTests !== undefined && (
              <div style={styles.stats}>
                FAILED AT TRIAL: <span style={{ color: '#ef4444' }}>{totalTests - testsPassed} FAILED</span> ({testsPassed}/{totalTests} PASSED)
              </div>
            )}

            <div style={styles.quote}>
              "You are not specialz..."
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000',
    overflow: 'hidden',
  },
  canvas: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    pointerEvents: 'none',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  cubeContainer: {
    position: 'relative',
    perspective: '1000px',
    width: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  cubeShadow: {
    position: 'absolute',
    bottom: -10,
    width: 120,
    height: 20,
    background: 'radial-gradient(ellipse, rgba(88, 28, 135, 0.4) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(4px)',
  },
  chainsSvg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  japaneseTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: 'clamp(36px, 8vw, 64px)',
    color: '#3b0764',
    textShadow: '0 0 20px #7e22ce, 0 0 40px #dc2626',
    letterSpacing: '0.4em',
    textAlign: 'center',
    marginBottom: 16,
    userSelect: 'none',
  },
  failureDetails: {
    textAlign: 'center',
    fontFamily: "'Cinzel', serif",
    padding: '0 20px',
  },
  wrongAnswer: {
    color: '#ef4444',
    fontSize: 'clamp(24px, 5vw, 38px)',
    fontWeight: '900',
    letterSpacing: '0.15em',
    textShadow: '0 0 15px rgba(239, 68, 68, 0.6)',
    marginBottom: 8,
  },
  subtitle: {
    color: '#a78bfa',
    fontSize: 'clamp(11px, 2.5vw, 15px)',
    letterSpacing: '0.2em',
    marginBottom: 20,
  },
  stats: {
    color: '#94a3b8',
    fontSize: '13px',
    letterSpacing: '0.1em',
    marginBottom: 24,
    borderBottom: '1px solid #7f1d1d44',
    paddingBottom: 16,
    display: 'inline-block',
  },
  quote: {
    fontStyle: 'italic',
    color: '#475569',
    fontSize: '14px',
    letterSpacing: '0.05em',
  },
};
