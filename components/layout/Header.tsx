"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#roles", label: "Роли" },
    { href: "#package", label: "Пакет" },
    { href: "#conference", label: "8 июля" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled && "bg-[#080808]/90 backdrop-blur-xl border-b border-white/[0.06]"
      )}
    >
      <div className="max-w-[1280px] mx-auto px-8 flex items-center gap-8 h-[68px]">
        {/* Logo */}
        <a href="#hero" className="font-unbounded text-[1.35rem] font-black tracking-tighter flex-shrink-0">
          Ai<span className="text-red-600">Lip</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1 ml-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#roles"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.08] border border-white/[0.1] text-white text-sm font-semibold hover:bg-red-600 hover:border-red-600 transition-all duration-200"
        >
          Купить промпты
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </a>

        {/* Burger */}
        <button
          className="md:hidden ml-auto flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <span className={cn("block w-5 h-0.5 bg-white transition-all", open && "rotate-45 translate-y-2")} />
          <span className={cn("block w-5 h-0.5 bg-white transition-all", open && "opacity-0")} />
          <span className={cn("block w-5 h-0.5 bg-white transition-all", open && "-rotate-45 -translate-y-2")} />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden bg-[#080808]/98 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4 flex flex-col gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 px-4 rounded-xl text-white/60 hover:text-white hover:bg-white/[0.05] transition-all text-base font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#roles"
            onClick={() => setOpen(false)}
            className="mt-2 py-4 rounded-full bg-red-600 text-white text-center font-semibold"
          >
            Купить промпты
          </a>
        </div>
      )}
    </header>
  );
}
