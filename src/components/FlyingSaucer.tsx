import { motion } from "framer-motion";
import { MousePosition } from "@/utils/types";

const FlyingSaucer: React.FC<{ mousePosition: MousePosition }> = ({
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

export default FlyingSaucer;
