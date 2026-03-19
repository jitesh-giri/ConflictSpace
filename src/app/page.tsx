"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GalaxyBackground from "@/components/galaxy-background";
import Sidebar from "@/components/sidebar";
import { conflictData } from "@/data/mock-conflicts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate DOM Cards
      gsap.utils.toArray('.conflict-card').forEach((card: any) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%", // Fade in when card top hits 85% of screen
            end: "top 20%",
            scrub: false,
            toggleActions: "play reverse play reverse"
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative z-10 w-full min-h-screen">
      <GalaxyBackground />
      <Sidebar />

      {/* Main Content Area - padded left on desktop to avoid sidebar overlap */}
      <div className="md:ml-72 flex flex-col">
        {/* Header Section */}
        <div className="h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Global Situations Map
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Scroll to navigate the galaxy and view ongoing global conflict data.
          </p>
          <div className="absolute bottom-10 animate-bounce">
            <svg className="w-8 h-8 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Feed Section */}
        <div className="max-w-4xl mx-auto px-4 pb-32 space-y-32 pt-32 w-full">
          {conflictData.map((conflict) => {
            const isActive = conflict.status === "Active";
            
            const badgeClass = isActive
              ? "bg-red-900/40 text-red-300 border border-red-500/30"
              : "bg-green-900/40 text-green-300 border border-green-500/30";

            return (
              <div
                key={conflict.id}
                id={conflict.id}
                className="glass-card rounded-2xl p-8 md:p-12 transform transition-all duration-500 hover:scale-[1.02] border border-gray-800 conflict-card opacity-0 translate-y-10 scroll-mt-32"
              >
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                      {conflict.title}
                    </h2>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-sm ${badgeClass}`}>
                      <span className={`w-2 h-2 rounded-full mr-2 ${isActive ? "bg-red-500 animate-pulse" : "bg-green-400"}`}></span>
                      {conflict.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="pt-4 border-t border-gray-800/50">
                    <span className="block text-sm text-gray-500 font-medium mb-1">Casualties</span>
                    <p className="font-medium text-red-400 text-lg mb-6">
                      {conflict.casualties}
                    </p>
                    
                    <span className="block text-sm text-gray-500 font-medium mb-1">Summary</span>
                    <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-gray-700 pl-4 py-1">
                      {conflict.summary}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Section */}
        <div className="h-[50vh] flex items-center justify-center text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 border-t border-gray-800 pt-8 w-full max-w-xs">End of Feed</h2>
        </div>
      </div>
    </main>
  );
}
