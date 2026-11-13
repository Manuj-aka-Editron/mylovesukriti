import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'heart' | 'petal' | 'sparkle';
  rotation: number;
  rotationSpeed: number;
  wobble: number;
  wobbleSpeed: number;
  color: string;
}

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleColors = [
      'rgba(251, 113, 133, 0.45)', // Rose 400
      'rgba(244, 63, 94, 0.38)',   // Rose 500
      'rgba(244, 114, 182, 0.4)',  // Pink 400
      'rgba(232, 121, 249, 0.35)', // Purple 400
      'rgba(254, 205, 211, 0.55)', // Rose 200
      'rgba(253, 164, 175, 0.45)', // Soft coral
    ];

    const particleTypes: ('heart' | 'petal' | 'sparkle')[] = ['heart', 'petal', 'sparkle', 'petal', 'heart'];

    const particleCount = window.innerWidth < 768 ? 22 : 38;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 6,
        speedY: -(Math.random() * 0.5 + 0.25),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.45 + 0.2,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    const drawHeart = (context: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, rotation: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.fillStyle = color;
      context.globalAlpha = opacity;
      context.beginPath();

      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      context.bezierCurveTo(
        -size / 2, -topCurveHeight,
        -size, size / 3,
        0, size
      );
      context.bezierCurveTo(
        size, size / 3,
        size / 2, -topCurveHeight,
        0, topCurveHeight
      );

      context.closePath();
      context.fill();
      context.restore();
    };

    const drawPetal = (context: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number, rotation: number) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.fillStyle = color;
      context.globalAlpha = opacity;
      context.beginPath();
      context.ellipse(0, 0, size * 0.65, size * 0.32, Math.PI / 4, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawSparkle = (context: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      context.save();
      context.translate(x, y);
      context.fillStyle = color;
      context.globalAlpha = opacity;
      context.beginPath();
      context.arc(0, 0, size * 0.2, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.6 + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.opacity);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65"
      style={{ touchAction: 'none' }}
    />
  );
};
