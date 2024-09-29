import { motion } from "framer-motion";
import Links from "@/landing/links";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Star from "@/components/Star";
import FlyingSaucer from "@/components/FlyingSaucer";
import Rocket from "@/components/Rocket";
import { StarProps, MousePosition } from "@/utils/types";
import { containerVariants, textVariants } from "@/utils/animations";

export function LandingContent() {
  const [showSecret, setShowSecret] = useState(false);
  const [stars, setStars] = useState<StarProps[]>([]);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [showRocket, setShowRocket] = useState(false);

  useEffect(() => {
    const generateStars = () => {
      const newStars: StarProps[] = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 2,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  const handleSecretClick = () => {
    setShowSecret(true);
    setShowRocket(true);
    setTimeout(() => setShowRocket(false), 2000);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <motion.div
      className="container mx-auto px-4 py-16 text-center relative z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onMouseMove={handleMouseMove}
    >
      {stars.map((star, index) => (
        <Star key={index} {...star} />
      ))}
      <FlyingSaucer mousePosition={mousePosition} />
      {showRocket && <Rocket />}
      <motion.div
        className="perspective-1000 transform-3d"
        style={{ transformOrigin: "50% 100%" }}
        initial={{ rotateX: "25deg" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 text-cyan-200"
          variants={textVariants}
        >
          Michael Magán
        </motion.h1>
        <motion.div variants={textVariants}>
          <Links />
        </motion.div>
        <motion.div className="mt-8">
          <Button
            variant="ghost"
            size="lg"
            className="text-cyan-200 hover:text-cyan-100 w-full h-16 opacity-0"
            onClick={handleSecretClick}
          />
        </motion.div>
        {showSecret && (
          <motion.p
            className="mt-4 text-cyan-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            You found the secret button! 🎉
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}
