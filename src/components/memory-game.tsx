import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const symbols = ["🚀", "🌟", "🪐", "🛸", "👽", "🌌"];
const allSymbols = [...symbols, ...symbols];

const funnyMessages = [
  "Do or do not. There is no try.",
  "Just keep swimming.",
  "It's not about how hard you hit.",
  "The past can hurt. Learn from it.",
  "Life moves fast. Don't miss it.",
  "May the Force be with you.",
  "I'll be back.",
  "You can't handle the truth!",
  "I see dead people.",
  "I'll have what she's having.",
];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onGameWon: () => void;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onGameWon }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [hasPlayedBefore, setHasPlayedBefore] = useState<boolean>(false);
  const [funnyMessage, setFunnyMessage] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const controls = useAnimation();

  useEffect(() => {
    const storedHasPlayed = localStorage.getItem("hasPlayedMemoryGame");
    if (storedHasPlayed) {
      setHasPlayedBefore(JSON.parse(storedHasPlayed));
    }
    initializeCards();
  }, []);

  const initializeCards = () => {
    const shuffledSymbols = allSymbols.sort(() => Math.random() - 0.5);
    const newCards = shuffledSymbols.map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
    setCards(newCards);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched)
      return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCardIds: number[]) => {
    const [firstCardId, secondCardId] = flippedCardIds;
    if (cards[firstCardId].symbol === cards[secondCardId].symbol) {
      const newCards = [...cards];
      newCards[firstCardId].isMatched = true;
      newCards[secondCardId].isMatched = true;
      setCards(newCards);
      setMatchedPairs(matchedPairs + 1);
      setFlippedCards([]);
      setFunnyMessage("");

      if (matchedPairs + 1 === symbols.length) {
        setIsGameWon(true);
        localStorage.setItem("hasPlayedMemoryGame", JSON.stringify(true));
        setTimeout(() => {
          setShowSuccessMessage(true);
        }, 1000);
        onGameWon();
      }
    } else {
      setTimeout(() => {
        const newCards = [...cards];
        newCards[firstCardId].isFlipped = false;
        newCards[secondCardId].isFlipped = false;
        setCards(newCards);
        setFlippedCards([]);

        // Display a funny message when the player gets it wrong
        const randomMessage =
          funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
        setFunnyMessage(randomMessage);

        // Shake the game board
        controls.start({
          x: [0, -10, 10, -10, 10, 0],
          transition: { duration: 0.5 },
        });
      }, 1000);
    }
  };

  return (
    <AlertDialog open={!isGameWon && !hasPlayedBefore}>
      <AlertDialogContent className="md:max-w-[400px] lg:max-w-[500px] bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-cyan-200">
            You must play a game to enter...
          </AlertDialogTitle>
        </AlertDialogHeader>
        <motion.div className="grid grid-cols-4 gap-4 p-4" animate={controls}>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-cyan-900 rounded-lg flex items-center justify-center cursor-pointer ${
                card.isFlipped || card.isMatched ? "bg-cyan-700" : ""
              } border-2 border-cyan-200 shadow-[0_0_10px_#a7f3d0]`}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px #a7f3d0" }}
              whileTap={{ scale: 0.95 }}
            >
              {(card.isFlipped || card.isMatched) && (
                <span className="text-3xl md:text-4xl lg:text-5xl text-cyan-100">
                  {card.symbol}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
        <div className="h-8 text-center mt-4">
          {funnyMessage && (
            <motion.p
              key={funnyMessage}
              className="text-md text-cyan-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  setFunnyMessage("");
                }, 3000);
              }}
            >
              {funnyMessage}
            </motion.p>
          )}
          {showSuccessMessage && (
            <motion.h2
              className="text-2xl font-bold text-cyan-200"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Congratulations! You've unlocked the site!
            </motion.h2>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MemoryGame;
