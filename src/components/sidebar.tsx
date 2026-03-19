"use client";

import { conflictData } from "@/data/mock-conflicts";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Basic Intersection Observer to highlight current active section on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { rootMargin: "-40% 0px -40% 0px" });

    conflictData.forEach((conflict) => {
      const el = document.getElementById(conflict.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100, // Offset for breathing room
        behavior: 'smooth'
      });
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-0 md:w-72 hidden md:flex flex-col bg-black/50 backdrop-blur-md border-r border-gray-800 z-50 pt-32 pb-8 px-6 overflow-y-auto">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">
        Active Theaters
      </h3>
      <nav className="flex flex-col gap-6">
        {conflictData.map((conflict) => {
          const isActive = activeId === conflict.id;
          return (
            <a
              key={conflict.id}
              href={`#${conflict.id}`}
              onClick={(e) => scrollToSection(conflict.id, e)}
              className={`group flex flex-col gap-1 transition-all duration-300 ${isActive ? 'opacity-100 pl-4 border-l-2 border-blue-500' : 'opacity-60 hover:opacity-100 hover:pl-2 border-l-2 border-transparent'}`}
            >
              <span className={`text-sm font-semibold tracking-wide ${isActive ? 'text-white' : 'text-gray-300'}`}>
                {conflict.title}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">
                {conflict.status}
              </span>
            </a>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-16">
        <div className="w-full h-[1px] bg-gradient-to-r from-gray-800 to-transparent mb-6"></div>
        <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
          Global Operations<br/>
          Command Center<br/>
          Secure Feed //
        </p>
      </div>
    </aside>
  );
}
