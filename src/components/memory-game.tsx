import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const symbols = ["🚀", "🌟", "🪐", "🛸", "👽", "🌌"];
const allSymbols = [...symbols, ...symbols];

const funnyMessages = [
  "Oops! Your memory seems to be taking a coffee break. Try again!",
  "Error 404: Memory not found. Please reboot your brain!",
  "Looks like those cards are using incognito mode in your mind!",
  "Did you forget to update your mental firewall? Keep trying!",
  "Your memory skills are experiencing high latency. Time for another attempt!",
];

interface Card {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [hasPlayedBefore, setHasPlayedBefore] = useState<boolean>(false);
  const [funnyMessage, setFunnyMessage] = useState<string>("");

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
      }, 1000);
    }
  };

  return (
    <AlertDialog open={!isGameWon && !hasPlayedBefore}>
      <AlertDialogContent className="sm:max-w-[200px] md:max-w-[400px] lg:max-w-[500px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Welcome to my site!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            To unlock the site, you need to complete this memory game.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-4 gap-4 p-4">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={`w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-purple-700 rounded-lg flex items-center justify-center cursor-pointer ${
                card.isFlipped || card.isMatched ? "bg-purple-500" : ""
              }`}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {(card.isFlipped || card.isMatched) && (
                <span className="text-3xl md:text-4xl lg:text-5xl">
                  {card.symbol}
                </span>
              )}
            </motion.div>
          ))}
        </div>
        <div className="h-8 text-center mt-4">
          {funnyMessage && (
            <p className="text-md text-yellow-500">{funnyMessage}</p>
          )}
          {isGameWon && (
            <h2 className="text-2xl font-bold text-green-500">
              Congratulations! You've unlocked the site!
            </h2>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MemoryGame;
