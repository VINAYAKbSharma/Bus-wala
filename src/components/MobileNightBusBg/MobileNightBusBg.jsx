import React, { useEffect, useRef, useState } from "react";
import "./MobileNightBusBg.css";

const MobileNightBusBg = () => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [videoError, setVideoError] = useState(false);

  // Attempt autoplay on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setVideoError(true);
      });
    }
  }, []);

  // Night Driver Highway Canvas Animation (60FPS loopable night bus road fallback)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // 1. Dark Night Sky Gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height * 0.45);
      skyGrad.addColorStop(0, "#030408");
      skyGrad.addColorStop(0.7, "#090d16");
      skyGrad.addColorStop(1, "#121722");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height * 0.45);

      // 2. Stars
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      for (let i = 0; i < 30; i++) {
        const sx = (Math.sin(i * 99 + offset * 0.01) * 0.5 + 0.5) * width;
        const sy = (Math.cos(i * 33) * 0.5 + 0.5) * (height * 0.35);
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // 3. Horizon & Distant Silhouette
      ctx.fillStyle = "#0c101a";
      ctx.beginPath();
      ctx.moveTo(0, height * 0.45);
      ctx.lineTo(width * 0.3, height * 0.42);
      ctx.lineTo(width * 0.7, height * 0.44);
      ctx.lineTo(width, height * 0.45);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fill();

      // 4. Highway Surface (Perspective Road)
      const roadGrad = ctx.createLinearGradient(0, height * 0.45, 0, height);
      roadGrad.addColorStop(0, "#12151e");
      roadGrad.addColorStop(1, "#07080b");
      ctx.fillStyle = roadGrad;

      const vanishingX = width * 0.5;
      const vanishingY = height * 0.45;

      ctx.beginPath();
      ctx.moveTo(vanishingX - 20, vanishingY);
      ctx.lineTo(vanishingX + 20, vanishingY);
      ctx.lineTo(width * 1.2, height);
      ctx.lineTo(-width * 0.2, height);
      ctx.closePath();
      ctx.fill();

      // 5. Headlight Beam Projection
      const beamGrad = ctx.createRadialGradient(
        vanishingX, height * 0.75, 20,
        vanishingX, height * 0.75, width * 0.6
      );
      beamGrad.addColorStop(0, "rgba(255, 240, 200, 0.25)");
      beamGrad.addColorStop(0.5, "rgba(255, 210, 140, 0.1)");
      beamGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(vanishingX, vanishingY);
      ctx.lineTo(width * 1.1, height);
      ctx.lineTo(-width * 0.1, height);
      ctx.closePath();
      ctx.fill();

      // 6. Moving White Center Lane Markings
      offset += 8;
      if (offset > 100) offset = 0;

      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 4;

      for (let i = 0; i < 10; i++) {
        const progress = ((i * 10 + offset) % 100) / 100;
        const p1 = Math.pow(progress, 2); // Perspective scaling
        const p2 = Math.pow(progress + 0.05, 2);

        const y1 = vanishingY + (height - vanishingY) * p1;
        const y2 = vanishingY + (height - vanishingY) * p2;

        const x1 = vanishingX;
        const x2 = vanishingX;

        ctx.lineWidth = 1 + p1 * 8;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 7. Passing Roadside Streetlights (Amber Poles)
      for (let i = 0; i < 6; i++) {
        const progress = ((i * 20 + offset * 0.8) % 100) / 100;
        const scale = Math.pow(progress, 1.8);

        const ly = vanishingY + (height - vanishingY) * scale;
        const lx = vanishingX - (width * 0.55) * scale;

        const poleHeight = 60 * scale;

        if (progress > 0.05) {
          // Pole
          ctx.strokeStyle = "rgba(100, 110, 130, 0.5)";
          ctx.lineWidth = Math.max(1, 2 * scale);
          ctx.beginPath();
          ctx.moveTo(lx, ly);
          ctx.lineTo(lx + 10 * scale, ly - poleHeight);
          ctx.stroke();

          // Sodium Light Glow
          ctx.fillStyle = `rgba(245, 183, 43, ${Math.min(1, scale * 1.5)})`;
          ctx.beginPath();
          ctx.arc(lx + 10 * scale, ly - poleHeight, Math.max(2, 6 * scale), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 8. Driver Windshield Glass Scrim Overlay
      ctx.fillStyle = "rgba(5, 7, 12, 0.35)";
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const videoUrl = `${(import.meta.env.BASE_URL || "/").endsWith("/") ? (import.meta.env.BASE_URL || "/") : `${import.meta.env.BASE_URL}/`}videos/running-bus-night.mp4`;

  return (
    <div className="mobile-night-bus-bg">
      {!videoError && (
        <video
          ref={videoRef}
          className="night-bus-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoError(true)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Canvas fallback for 60FPS running night road perspective */}
      <canvas ref={canvasRef} className="night-bus-canvas" />

      {/* Night Bus Scrim Gradient */}
      <div className="night-bus-overlay-scrim" />
    </div>
  );
};

export default MobileNightBusBg;
