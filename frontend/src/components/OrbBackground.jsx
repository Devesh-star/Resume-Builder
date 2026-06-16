import React, { useEffect, useRef } from 'react';

const OrbBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let orbs = [];

    // Config
    const orbCount = 20;
    const colors = [
      'rgba(216, 56, 107, 0.4)', // Pink
      'rgba(255, 77, 133, 0.4)', // Light Pink
      'rgba(147, 51, 234, 0.3)', // Purple
      'rgba(236, 72, 153, 0.3)'  // Fuchsia
    ];

    // Resize canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mouse tracking
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Orb class
    class Orb {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.baseRadius = Math.random() * 80 + 40;
        this.radius = this.baseRadius;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges gently
        if (this.x < -100) this.vx *= -1;
        if (this.x > canvas.width + 100) this.vx *= -1;
        if (this.y < -100) this.vy *= -1;
        if (this.y > canvas.height + 100) this.vy *= -1;

        // Pulsing radius
        this.pulsePhase += this.pulseSpeed;
        this.radius = this.baseRadius + Math.sin(this.pulsePhase) * 20;

        // Mouse interaction (dodging)
        const dxMouse = this.x - mouse.x;
        const dyMouse = this.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 300) {
          const force = (300 - distMouse) / 300;
          this.x += (dxMouse / distMouse) * force * 2;
          this.y += (dyMouse / distMouse) * force * 2;
        }
      }

      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Init orbs
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new Orb());
    }

    // Animation loop
    const animate = () => {
      // Create trailing effect
      ctx.fillStyle = 'rgba(10, 5, 8, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a grid overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;

      const gridSize = 50;
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

      // Draw orbs with blending mode for glow
      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < orbCount; i++) {
        orbs[i].update();
        orbs[i].draw();
      }

      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default OrbBackground;
