import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const phrases = [
  "the world owes you",
  "nothing",
  "but you owe yourself",
  "everything",
];

const MotivationPage = () => {
  const [showFirstPart, _] = useState(true);
  const [showSecondPart, setShowSecondPart] = useState(false);
  const [showThirdPart, setShowThirdPart] = useState(false);
  const [showFourthPart, setShowFourthPart] = useState(false);

  useEffect(() => {
    // Show first phrase for 2 seconds
    setTimeout(() => {
      setShowSecondPart(true);
    }, 2000);

    // Show third phrase after 4 seconds
    setTimeout(() => {
      setShowThirdPart(true);
    }, 4000);

    // Show fourth phrase after 6 seconds
    setTimeout(() => {
      setShowFourthPart(true);
    }, 6000);
  }, []);

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <AnimatePresence mode="wait">
            {showFirstPart && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-4xl md:text-6xl font-bold"
              >
                {phrases[0]}
              </motion.h1>
            )}
            {showSecondPart && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-4xl md:text-6xl font-bold min-w-[120px] italic"
              >
                {phrases[1]}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2">
          <AnimatePresence mode="wait">
            {showThirdPart && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-4xl md:text-6xl font-bold"
              >
                {phrases[2]}
              </motion.h1>
            )}
            {showFourthPart && (
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-4xl md:text-6xl font-bold min-w-[180px] italic"
              >
                {phrases[3]}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MotivationPage;
