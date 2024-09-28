import { motion } from "framer-motion";
import Links from "@/landing/links";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LandingContent() {
  const [showSecret, setShowSecret] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

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

  return (
    <motion.div
      className="container mx-auto px-4 py-16 text-center relative z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
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
