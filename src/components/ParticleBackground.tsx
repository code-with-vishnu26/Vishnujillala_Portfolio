import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface CodeSymbol {
  x: number;
  y: number;
  symbol: string;
  opacity: number;
  speed: number;
  size: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef(resolvedTheme);

  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const symbols = ['</', '/>', '{ }', '( )', '[ ]', '&&', '||', '=>', '++', '--', '::'];
    
    const particleCount = 60;
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 2 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }

    const codeSymbols: CodeSymbol[] = [];
    for (let i = 0; i < 15; i++) {
      codeSymbols.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        opacity: 0.1 + Math.random() * 0.15,
        speed: 0.2 + Math.random() * 0.3,
        size: 12 + Math.random() * 8,
      });
    }

    const animate = () => {
      const isDark = themeRef.current === 'dark';
      
      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (isDark) {
        bgGradient.addColorStop(0, '#0a0a0f');
        bgGradient.addColorStop(0.5, '#0d1117');
        bgGradient.addColorStop(1, '#0a0a0f');
      } else {
        bgGradient.addColorStop(0, '#f0f4ff');
        bgGradient.addColorStop(0.3, '#e8eeff');
        bgGradient.addColorStop(0.7, '#f0ecff');
        bgGradient.addColorStop(1, '#f0f4ff');
      }
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid
      const gridSize = 50;
      const gridOpacity = isDark ? 0.03 : 0.06;
      ctx.strokeStyle = isDark 
        ? `rgba(59, 130, 246, ${gridOpacity})` 
        : `rgba(99, 102, 241, ${gridOpacity})`;
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Particles
      const particleOpacity = isDark ? 1 : 0.4;
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        if (isDark) {
          ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity * particleOpacity})`;
        } else {
          ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity * particleOpacity})`;
        }
        ctx.fill();
      });

      // Connections
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * (isDark ? 0.15 : 0.08);
            ctx.beginPath();
            ctx.strokeStyle = isDark 
              ? `rgba(59, 130, 246, ${opacity})`
              : `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Code symbols
      const symbolOpacity = isDark ? 1 : 0.5;
      codeSymbols.forEach((symbol) => {
        symbol.y -= symbol.speed;
        if (symbol.y < -30) {
          symbol.y = canvas.height + 30;
          symbol.x = Math.random() * canvas.width;
        }

        ctx.font = `${symbol.size}px 'Fira Code', monospace`;
        if (isDark) {
          ctx.fillStyle = `rgba(99, 102, 241, ${symbol.opacity * symbolOpacity})`;
        } else {
          ctx.fillStyle = `rgba(99, 102, 241, ${symbol.opacity * symbolOpacity})`;
        }
        ctx.fillText(symbol.symbol, symbol.x, symbol.y);
      });

      // Corner glows
      const glowIntensity = isDark ? 0.05 : 0.08;
      const glowGradient1 = ctx.createRadialGradient(0, 0, 0, 0, 0, canvas.width * 0.4);
      glowGradient1.addColorStop(0, isDark ? `rgba(59, 130, 246, ${glowIntensity})` : `rgba(99, 102, 241, ${glowIntensity})`);
      glowGradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const glowGradient2 = ctx.createRadialGradient(
        canvas.width, canvas.height, 0,
        canvas.width, canvas.height, canvas.width * 0.4
      );
      glowGradient2.addColorStop(0, isDark ? `rgba(99, 102, 241, 0.04)` : `rgba(168, 85, 247, ${glowIntensity})`);
      glowGradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};

export default ParticleBackground;
