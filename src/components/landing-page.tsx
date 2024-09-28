import { motion } from "framer-motion";
import Links from "@/landing/links";

export function LandingContent() {
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

  return (
    <motion.div
      className="container mx-auto px-4 py-16 text-center relative z-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="perspective-1000 transform-3d"
        style={{ transformOrigin: "50% 100%" }}
        initial={{ rotateX: "25deg" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 text-white"
          variants={textVariants}
        >
          Michael Magán
        </motion.h1>
        <motion.div variants={textVariants}>
          <Links />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
