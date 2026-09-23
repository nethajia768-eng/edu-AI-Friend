import React, { useEffect, useState, useRef } from 'react';
import { useEdu } from '../context/EduContext';

export const AnimatedBackground = () => {
  const { visualMode, themeMode, currentPalette, currentVideo } = useEdu();
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovering, setIsHovering] = useState(false);
  const canvasRef = useRef(null);

  // Track mouse coordinates for subtle interactive glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Connected AI-style Neural Nodes Canvas Animation
  useEffect(() => {
    if (visualMode !== 'animated') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate balanced number of floating AI nodes
    const nodeCount = Math.min(36, Math.floor(window.innerWidth / 45));
    const nodes = [];

    const getNodeColors = () => {
      if (themeMode === 'light') {
        return {
          dot: 'rgba(99, 102, 241, 0.35)',
          line: 'rgba(124, 58, 237, ',
          glow: 'rgba(6, 182, 212, 0.25)'
        };
      } else if (themeMode === 'colorful') {
        return {
          dot: 'rgba(6, 182, 212, 0.45)',
          line: 'rgba(139, 92, 246, ',
          glow: 'rgba(59, 130, 246, 0.35)'
        };
      } else {
        // Dark Mode
        return {
          dot: 'rgba(56, 189, 248, 0.4)',
          line: 'rgba(168, 85, 247, ',
          glow: 'rgba(99, 102, 241, 0.3)'
        };
      }
    };

    let colors = getNodeColors();

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1.2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      colors = getNodeColors();

      // Connect nodes within proximity threshold
      const maxDistance = 120;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (themeMode === 'dark' ? 0.16 : 0.12);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `${colors.line}${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw floating nodes & pulsing glow
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        // Soft bounce against edges
        if (n.x < 0) n.x = canvas.width;
        else if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        else if (n.y > canvas.height) n.y = 0;

        const dynamicRadius = n.radius + Math.sin(time * 2 + n.pulseOffset) * 0.5;

        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(0.5, dynamicRadius), 0, Math.PI * 2);
        ctx.fillStyle = colors.dot;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visualMode, themeMode, currentPalette]);

  const orbs = currentPalette.orbs || [
    'from-blue-600/35 to-purple-600/30',
    'from-cyan-500/25 via-indigo-600/25 to-purple-600/25',
    'from-violet-600/30 to-pink-500/20'
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none transition-colors duration-500">
      
      {/* 1. Base Theme Backdrop with smooth transitions */}
      {themeMode === 'light' ? (
        <div className="absolute inset-0 bg-[#f8fafc] transition-colors duration-500" />
      ) : themeMode === 'colorful' ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#eef2ff] via-[#f5f3ff] to-[#ecfeff] transition-colors duration-500" />
      ) : (
        <div className="absolute inset-0 bg-[#050814] transition-colors duration-500" />
      )}

      {/* 2. MODE: VIDEO AMBIENT BACKGROUND */}
      {visualMode === 'video' && (
        <div className="absolute inset-0 transition-opacity duration-1000">
          <video
            key={currentVideo.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35 filter blur-[2px]"
          >
            <source src={currentVideo.url} type="video/mp4" />
          </video>
          {/* Overlay gradient to preserve text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/60" />
        </div>
      )}

      {/* 3. MODE: DYNAMIC ANIMATED AI BACKGROUND */}
      {visualMode === 'animated' && (
        <>
          {/* Soft Floating Gradient Blobs */}
          <div
            className={`absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full bg-gradient-to-br ${orbs[0]} blur-[150px] animate-pulse-slow`}
          />
          <div
            className={`absolute top-1/4 -right-28 w-[680px] h-[680px] rounded-full bg-gradient-to-bl ${orbs[1]} blur-[160px] animate-float`}
            style={{ animationDuration: '12s' }}
          />
          <div
            className={`absolute bottom-5 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr ${orbs[2]} blur-[140px] animate-float-delayed`}
            style={{ animationDuration: '14s' }}
          />

          {/* Slow-moving gradient wave overlay */}
          <div 
            className="absolute -bottom-20 left-0 right-0 h-96 opacity-25 filter blur-3xl pointer-events-none"
            style={{
              background: themeMode === 'light' 
                ? 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.15) 50%, rgba(6, 182, 212, 0.2) 100%)'
                : themeMode === 'colorful'
                ? 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.25) 50%, rgba(6, 182, 212, 0.3) 100%)'
                : 'linear-gradient(180deg, transparent 0%, rgba(37, 99, 235, 0.15) 50%, rgba(124, 58, 237, 0.2) 100%)'
            }}
          />

          {/* Connected AI Neural Matrix Canvas (Nodes & Connecting Lines) */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Abstract Learning / Technology Symbols with subtle floating */}
          <div className={`absolute inset-0 overflow-hidden pointer-events-none ${
            themeMode === 'light' ? 'opacity-[0.12]' : themeMode === 'colorful' ? 'opacity-[0.20]' : 'opacity-[0.16]'
          }`}>
            <div className="absolute top-[14%] left-[8%] animate-float text-blue-500 text-3xl select-none">
              📖
            </div>
            <div className="absolute top-[28%] right-[12%] animate-float-delayed text-cyan-400 text-4xl select-none">
              🧠
            </div>
            <div className="absolute bottom-[38%] left-[12%] animate-float text-purple-400 text-3xl select-none">
              ⚛️
            </div>
            <div className="absolute bottom-[24%] right-[18%] animate-float-delayed text-amber-400 text-3xl select-none">
              💡
            </div>
            <div className="absolute top-[65%] left-[6%] animate-float text-violet-400 text-4xl select-none">
              🎓
            </div>
            <div className="absolute top-[16%] right-[32%] animate-float text-sky-400 text-3xl select-none">
              🚀
            </div>
            <div className="absolute top-[52%] left-[48%] animate-float-delayed text-amber-400 text-2xl select-none">
              ✏️
            </div>
            <div className="absolute bottom-[16%] left-[62%] animate-float text-indigo-400 text-3xl font-serif select-none">
              π
            </div>
            <div className="absolute top-[82%] right-[7%] animate-float-delayed text-teal-400 text-2xl font-serif select-none">
              Σ
            </div>
          </div>
        </>
      )}

      {/* 4. MODE: MINIMAL / FOCUS MODE */}
      {visualMode === 'minimal' && (
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[450px] bg-indigo-950/20 rounded-full blur-[160px]" />
        </div>
      )}

      {/* 5. INTERACTIVE MOUSE-FOLLOWING AI GLOW */}
      {isHovering && (
        <div
          className="absolute w-[460px] h-[460px] rounded-full pointer-events-none transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${mousePos.x - 230}px, ${mousePos.y - 230}px)`,
            background: `radial-gradient(circle, ${currentPalette.glow} 0%, rgba(6, 182, 212, 0.12) 40%, transparent 70%)`,
            filter: 'blur(32px)'
          }}
        />
      )}

      {/* 6. SUBTLE AI TECH GRID TEXTURE OVERLAY */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          themeMode === 'light' 
            ? 'opacity-[0.035]' 
            : themeMode === 'colorful' 
            ? 'opacity-[0.045]' 
            : 'opacity-[0.03]'
        }`}
        style={{
          backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          color: themeMode === 'light' ? '#334155' : '#ffffff'
        }}
      />
    </div>
  );
};
