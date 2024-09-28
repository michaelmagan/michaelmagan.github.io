import { useEffect, useState } from "react";
import MemoryGame from "@/components/memory-game";
import { LandingContent } from "@/components/landing-page";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
}

function App() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = (): Star[] => {
      return [...Array(100)].map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3,
        duration: Math.random() * 50 + 20,
      }));
    };

    setStars(generateStars());
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden relative">
      <MemoryGame />
      <LandingContent />
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `moveStar ${star.duration}s linear infinite`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
