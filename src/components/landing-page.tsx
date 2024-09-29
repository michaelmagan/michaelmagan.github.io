import { motion } from "framer-motion";
import Links from "@/landing/links";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface StarProps {
  top: number;
  left: number;
  size: number;
  delay: number;
}

const Star: React.FC<StarProps> = ({ top, left, size, delay }) => (
  <motion.div
    className="absolute bg-white rounded-full"
    style={{
      top: `${top}%`,
      left: `${left}%`,
      width: size,
      height: size,
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      delay: delay,
    }}
  />
);

const FlyingSaucer: React.FC<{ mousePosition: { x: number; y: number } }> = ({
  mousePosition,
}) => (
  <motion.div
    className="absolute pointer-events-none z-50"
    animate={{
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
    }}
    transition={{
      type: "spring",
      damping: 10,
      stiffness: 100,
      restDelta: 0.001,
    }}
  >
    <span style={{ fontSize: "4rem" }}>🛸</span>
  </motion.div>
);

export function LandingContent() {
  const [showSecret, setShowSecret] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [stars, setStars] = useState<StarProps[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2, delay: 0.5 } },
  };

  const textVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 5,
        ease: "linear",
      },
    },
  };

  const handleSecretClick = () => {
    setShowSecret(true);
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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {stars.map((star, index) => (
        <Star key={index} {...star} />
      ))}
      <FlyingSaucer mousePosition={mousePosition} />
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
        {isHovering && !showSecret && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="lg"
              className="text-cyan-200 hover:text-cyan-100"
              onClick={handleSecretClick}
            ></Button>
          </motion.div>
        )}
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
