import { motion } from "framer-motion";

const Rocket: React.FC = () => (
  <motion.div
    className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
    initial={{ y: "100%" }}
    animate={{ y: "-100vh" }}
    transition={{ duration: 2, ease: "easeOut" }}
  >
    <span
      style={{
        fontSize: "4rem",
        display: "inline-block",
        transform: "rotate(-45deg)",
      }}
    >
      🚀
    </span>
  </motion.div>
);

export default Rocket;
