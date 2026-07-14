import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
  radius: number;
}

interface Packet {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  color: string;
}

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point[] = [];
    let packets: Packet[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Initialize points
    const initPoints = () => {
      points = [];
      packets = [];
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const spacing = 100;
      const cols = Math.floor(width / spacing) + 2;
      const rows = Math.floor(height / spacing) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing - spacing / 2 + (Math.random() - 0.5) * 40;
          const y = j * spacing - spacing / 2 + (Math.random() - 0.5) * 40;
          points.push({
            x,
            y,
            originalX: x,
            originalY: y,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1,
          });
        }
      }
    };

    initPoints();

    // Spawn packets along grid connections
    const spawnPacket = () => {
      if (points.length < 2) return;
      
      // Select random point
      const p1Index = Math.floor(Math.random() * points.length);
      const p1 = points[p1Index];
      
      // Find a close point
      const neighbors = points
        .map((p2, idx) => ({ idx, dist: Math.hypot(p2.x - p1.x, p2.y - p1.y) }))
        .filter((item) => item.dist > 10 && item.dist < 200);

      if (neighbors.length > 0) {
        const p2Index = neighbors[Math.floor(Math.random() * neighbors.length)].idx;
        const p2 = points[p2Index];
        
        packets.push({
          startX: p1.x,
          startY: p1.y,
          endX: p2.x,
          endY: p2.y,
          progress: 0,
          speed: Math.random() * 0.01 + 0.005,
          color: Math.random() > 0.5 ? '#6D0F1B' : '#4A0E16',
        });
      }
    };

    // Main animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Matte Black base with deep burgundy gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#120205'); // Subtle burgundy leak center
      bgGrad.addColorStop(0.5, '#0D0D0D'); // Matte Black
      bgGrad.addColorStop(1, '#050505'); // Pitch Black edge
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle background grid lines
      ctx.strokeStyle = 'rgba(109, 15, 27, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const mouse = mouseRef.current;

      // Update and draw points
      points.forEach((p) => {
        // Natural drift
        p.x += p.vx;
        p.y += p.vy;

        // Bounce from original grid coordinate boundary
        const dxFromOrig = p.x - p.originalX;
        const dyFromOrig = p.y - p.originalY;
        if (Math.abs(dxFromOrig) > 30) p.vx *= -1;
        if (Math.abs(dyFromOrig) > 30) p.vy *= -1;

        // Mouse interaction (push away)
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 2;
          p.y += Math.sin(angle) * force * 2;
        } else {
          // Return slowly to original coords
          p.x += (p.originalX - p.x) * 0.02;
          p.y += (p.originalY - p.y) * 0.02;
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dist < mouse.radius ? '#F7F2EF' : '#6D0F1B';
        ctx.shadowBlur = dist < mouse.radius ? 8 : 0;
        ctx.shadowColor = '#6D0F1B';
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw network lines
      ctx.lineWidth = 0.8;
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
          if (dist < 130) {
            const alpha = (130 - dist) / 130 * 0.12;
            ctx.strokeStyle = `rgba(109, 15, 27, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw packets
      packets.forEach((pkt, idx) => {
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(idx, 1);
          return;
        }

        const currX = pkt.startX + (pkt.endX - pkt.startX) * pkt.progress;
        const currY = pkt.startY + (pkt.endY - pkt.startY) * pkt.progress;

        // Packet tail
        const tailX = pkt.startX + (pkt.endX - pkt.startX) * Math.max(0, pkt.progress - 0.15);
        const tailY = pkt.startY + (pkt.endY - pkt.startY) * Math.max(0, pkt.progress - 0.15);

        const grad = ctx.createLinearGradient(tailX, tailY, currX, currY);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, pkt.color);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(currX, currY);
        ctx.stroke();

        // Packet head glow
        ctx.beginPath();
        ctx.arc(currX, currY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#F7F2EF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#6D0F1B';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Maintain packet density
      if (packets.length < 35 && Math.random() < 0.2) {
        spawnPacket();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleResize = () => {
      initPoints();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-effects-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
