"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function SuccessScreen({ submissionId }: { submissionId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d")!;

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      vx: (Math.random() - 0.5) * 2.5,
      vy: -(1.5 + Math.random() * 4),
      size: 4 + Math.random() * 6,
      alpha: 0.7 + Math.random() * 0.3,
      color: Math.random() > 0.5 ? "#1A1AFF" : "#0D0D0D",
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.08,
    }));

    let anim: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.04; p.rotation += p.rotSpeed; p.alpha -= 0.005;
        if (p.y < -50 || p.alpha <= 0) {
          p.x = Math.random() * canvas.width; p.y = canvas.height + 10;
          p.vy = -(1.5 + Math.random() * 4); p.alpha = 0.8;
        }
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      anim = requestAnimationFrame(draw);
    };
    draw();
    const t = setTimeout(() => cancelAnimationFrame(anim), 7000);
    return () => { cancelAnimationFrame(anim); clearTimeout(t); };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-bg flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        {/* Check circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 14, stiffness: 200, delay: 0.15 }}
          className="w-20 h-20 mx-auto mb-8 bg-ink rounded-2xl flex items-center justify-center"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            width="36" height="36" viewBox="0 0 36 36" fill="none"
          >
            <motion.path
              d="M8 18 L15 25 L28 11"
              stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </motion.svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-bold tracking-tight text-ink mb-3"
        >
          Спасибо!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="text-lg text-muted mb-4"
        >
          Бриф успешно отправлен
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-border mb-6 font-mono text-sm font-semibold text-ink"
        >
          {submissionId}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="text-muted text-base mb-10"
        >
          Мы свяжемся в течение{" "}
          <span className="font-semibold text-ink">24 часов</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://wa.me/79636690007"
            target="_blank" rel="noopener noreferrer"
            className="btn-gold px-7 py-3.5 rounded-xl text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
          <a
            href="https://t.me/thedilik"
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost px-7 py-3.5 rounded-xl text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            Telegram
          </a>
          <button onClick={() => window.location.reload()} className="btn-ghost px-7 py-3.5 rounded-xl text-sm">
            Новый бриф
          </button>
        </motion.div>
      </div>
    </div>
  );
}
