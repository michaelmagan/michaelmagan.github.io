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

  const handleShowAnimation = () => {
    // This function should trigger the animation to show again
    // You might need to lift this state up to the parent component
    // For now, we'll just reload the page as a simple solution
    window.location.reload();
  };
  return (
    <motion.div
      className="container mx-auto px-4 text-center relative z-10"
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
          Congrats on unlocking my page. I'm a founder working on the future of
          UX.
        </motion.div>
        <motion.div variants={textVariants}>
          <Links />
        </motion.div>
        <motion.div className="mt-8">
          {!showSecret ? (
            <Button
              variant="ghost"
              size="lg"
              className="text-cyan-200 hover:text-cyan-100 w-full h-12 opacity-0"
              onClick={handleSecretClick}
            />
          ) : (
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
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button
          variant="link"
          size="sm"
          className="text-cyan-300 hover:text-cyan-100"
          onClick={handleShowAnimation}
        >
          Show animation again
        </Button>
      </motion.div>
    </motion.div>
  );
}
