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

const failureMessages = [
  "Do or do not. There is no try.",
  "May the Force be with you.",
  "Life finds a way.",
  "Carpe diem.",
  "Ohana means family.",
  "To infinity and beyond!",
  "You shall not pass!",
];

const successMessages = [
  "There you go.",
  "Getting closer.",
  "Almost there...",
  "You're on the right track!",
  "Keep it up!",
  "One step closer to victory!",
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
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"success" | "failure">(
    "success"
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [failureIndex, setFailureIndex] = useState<number>(0);
  const [successIndex, setSuccessIndex] = useState<number>(0);
  const [messageTimeout, setMessageTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
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

  const displayMessage = (newMessage: string, type: "success" | "failure") => {
    setMessage(newMessage);
    setMessageType(type);

    // Clear any existing timeout
    if (messageTimeout) {
      clearTimeout(messageTimeout);
    }

    // Set a new timeout to clear the message after 3 seconds
    const timeout = setTimeout(() => {
      setMessage("");
    }, 3000);

    setMessageTimeout(timeout);
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

      // Display a success message
      displayMessage(successMessages[successIndex], "success");
      setSuccessIndex((prevIndex) => (prevIndex + 1) % successMessages.length);

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

        // Display a failure message when the player gets it wrong
        displayMessage(failureMessages[failureIndex], "failure");
        setFailureIndex(
          (prevIndex) => (prevIndex + 1) % failureMessages.length
        );

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
          {message && (
            <motion.p
              key={message}
              className={`text-md ${messageType === "success" ? "text-green-400" : "text-red-400"}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {message}
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
