import React, { useEffect, useRef } from "react";

interface BloomCanvasProps {
  sentiments: number[];
}

const BloomCanvas: React.FC<BloomCanvasProps> = ({ sentiments }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationFrameId: number;

    const blooms = sentiments.map((score, i) => ({
      x: (i + 1) * (canvas.width / 4),
      y: canvas.height / 2 + Math.random() * 50 - 25,
      radius: 20 + Math.abs(score) * 10,
      color: score >= 0 ? "rgba(0,255,200,0.6)" : "rgba(255,80,80,0.5)",
      glow: 20 + Math.abs(score) * 5,
      angle: 0
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      blooms.forEach((bloom) => {
        ctx.beginPath();
        ctx.shadowColor = bloom.color;
        ctx.shadowBlur = bloom.glow;
        ctx.fillStyle = bloom.color;
        ctx.arc(
          bloom.x + Math.sin(bloom.angle) * 5,
          bloom.y + Math.cos(bloom.angle) * 10,
          bloom.radius,
          0,
          2 * Math.PI
        );
        ctx.fill();
        bloom.angle += 0.01;
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [sentiments]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={250}
      style={{
        marginTop: "2rem",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        background: "transparent",
      }}
    />
  );
};

export default BloomCanvas;
