import { motion } from "framer-motion";
import { StarProps } from "@/utils/types";

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

export default Star;
