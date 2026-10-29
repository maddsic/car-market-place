const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="flex flex-col items-center justify-center gap-3">
        {/* Outer Wheel Container */}
        <div className="relative flex h-16 w-16 items-center justify-center">
          {/* Spinning Outer Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-slate-700 border-t-amber-400 border-r-amber-400 animate-spin" />

          {/* Inner Rotor / Spokes */}
          <div className="absolute inset-2 flex items-center justify-center rounded-full border border-slate-800 bg-slate-950">
            <svg
              className="h-full w-full p-1 text-slate-400 animate-spin"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="10" className="fill-amber-400" />
              <circle cx="50" cy="50" r="4" className="fill-slate-950" />
              {[0, 72, 144, 216, 288].map((angle) => (
                <line
                  key={angle}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 50 50)`}
                />
              ))}
            </svg>
          </div>

          {/* Center Hubcap Dot */}
          <span className="relative z-10 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        </div>

        {/* Text */}
        <p className="animate-pulse text-[11px] font-bold uppercase tracking-widest text-amber-400">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
