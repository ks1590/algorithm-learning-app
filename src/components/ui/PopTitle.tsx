import React from 'react';

export const PopTitle: React.FC = () => {
  return (
    <div className="relative pointer-events-none select-none w-full max-w-5xl mx-auto py-12 md:py-24">
      {/* Background Geometric Shapes - Floating & Distributed */}
      {/* Circle Top Left */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-48 md:h-48 bg-[#FF6B6B] rounded-full opacity-90 blur-sm animate-pulse-slow" />

      {/* Flower Top Right - Marimekko Style */}
      <svg
        className="absolute -top-2 right-0 md:top-8 md:right-14 w-20 h-20 md:w-32 md:h-32 text-[#3DCCC7]"
        viewBox="0 0 100 100"
        fill="currentColor"
        stroke="none"
      >
        {/* Organic Unikko-style petals */}
        <path d="M50 40 C30 10 10 30 25 50 C10 70 30 90 50 80 C70 90 90 70 75 50 C90 30 70 10 50 40 Z" />
        <path d="M50 40 C35 25 20 25 20 45 C20 65 35 75 50 70 C65 75 80 65 80 45 C80 25 65 25 50 40" fill="#FFD23F" />

        {/* Center dot - slightly irregular */}
        <path d="M50 50 m-8 0 a 8 8 0 1 0 16 0 a 8 8 0 1 0 -16 0" fill="#000" />
        <path d="M50 20 C30 0 0 30 20 50 C0 80 30 100 50 85 C70 100 100 80 80 50 C100 30 70 0 50 20 Z" />
      </svg>

      {/* Blob Bottom Left */}
      <div className="absolute bottom-0 left-4 md:left-10 w-24 h-24 md:w-32 md:h-32 bg-[#FFD23F] rounded-full mix-blend-multiply filter blur-xl opacity-70" />

      {/* Star Bottom Right */}
      <div
        className="absolute -bottom-4 right-0 md:bottom-8 md:right-32 w-24 h-24 md:w-32 md:h-32 bg-[#FF66C4] clip-polygon-star animate-spin-slow opacity-80"
        style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        }}
      />

      {/* Main Title Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-2 md:gap-4">
        {/* Line 1: ALGORITHM */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-[#FFD23F] drop-shadow-[4px_4px_0_rgba(0,0,0,1)] transform -rotate-2">
          ALGORITHM
        </h1>

        {/* Line 2: LEARNING */}
        <div className="relative">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-[#8E9DFF] drop-shadow-[4px_4px_0_rgba(0,0,0,1)] transform rotate-1">
            LEARN
            <span className="inline-block relative">
              I{/* Dot on I replacement or decoration? Let's make the 'I' interesting or standard */}
            </span>
            NG
          </h1>

          {/* "Start Now" Badge/Sticker */}
          <div className="absolute -top-4 -right-4 md:-top-10 md:-right-16 rotate-12 bg-[#FF66C4] text-white font-bold text-md md:text-xl px-3 py-1 md:px-6 md:py-3 rounded-full border-[3px] md:border-4 border-dotted border-white shadow-[0_0_0_2px_#000,2px_2px_0_2px_#000] md:shadow-[0_0_0_4px_#000,4px_4px_0_4px_#000]">
            Let's Start!
          </div>
        </div>
      </div>
    </div>
  );
};
