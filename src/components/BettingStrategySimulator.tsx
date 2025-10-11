"use client";

import { useState } from "react";

export default function BettingStrategySimulator() {
  const [numRiskyBets, setNumRiskyBets] = useState(10);
  const [riskyOutcomes, setRiskyOutcomes] = useState<boolean[]>([]);
  const [safeOutcomes, setSafeOutcomes] = useState<boolean[]>([]);

  const riskyProbability = 0.1;
  const riskyMultiplier = 100;
  const riskyBetSize = 10;

  const numSafeBets = 3;
  const safeProbability = 0.7;
  const safeMultiplier = 2;
  const safeBetSize = 30;

  const handleSliderChange = (value: number) => {
    setNumRiskyBets(value);
    setRiskyOutcomes([]);
    setSafeOutcomes([]);
  };

  const runSimulation = () => {
    // Risky bets
    const riskyResults = Array(numRiskyBets)
      .fill(0)
      .map(() => Math.random() < riskyProbability);
    setRiskyOutcomes(riskyResults);

    // Safe bets
    const safeResults = Array(numSafeBets)
      .fill(0)
      .map(() => Math.random() < safeProbability);
    setSafeOutcomes(safeResults);
  };

  const riskyWins = riskyOutcomes.filter(Boolean).length;
  const riskyPayout =
    riskyWins * riskyBetSize * riskyMultiplier - numRiskyBets * riskyBetSize;

  const safeWins = safeOutcomes.filter(Boolean).length;
  const safePayout =
    safeWins * safeBetSize * safeMultiplier - numSafeBets * safeBetSize;

  const riskyExpectedValue =
    numRiskyBets * riskyBetSize * (riskyProbability * riskyMultiplier - 1);
  const safeExpectedValue =
    numSafeBets * safeBetSize * (safeProbability * safeMultiplier - 1);

  return (
    <div className="not-prose my-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6">
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-gray-100">
        A little demo
      </h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Number of risky bets: {numRiskyBets}
        </label>
        <input
          type="range"
          min="5"
          max="20"
          value={numRiskyBets}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Risky Strategy */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Many Small Bets
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div>
              {numRiskyBets} bets × ${riskyBetSize} = $
              {numRiskyBets * riskyBetSize} invested
            </div>
            <div>10% win rate, {riskyMultiplier}x payout</div>
            <div className="font-medium text-gray-700 dark:text-gray-300">
              Expected: ${riskyExpectedValue.toFixed(0)} profit
            </div>
          </div>

          {/* Visual grid of bets */}
          <div className="flex flex-wrap gap-1.5 min-h-[120px] p-3 bg-gray-50 dark:bg-gray-900 rounded">
            {Array(numRiskyBets)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                    riskyOutcomes[i] === undefined
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500"
                      : riskyOutcomes[i]
                      ? "bg-green-500 text-white"
                      : "bg-red-500/20 text-red-600 dark:text-red-400"
                  }`}
                >
                  {riskyOutcomes[i] === undefined
                    ? ""
                    : riskyOutcomes[i]
                    ? "✓"
                    : "×"}
                </div>
              ))}
          </div>

          <div className="h-[76px]">
            {riskyOutcomes.length > 0 && (
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {riskyWins} wins × ${riskyBetSize * riskyMultiplier}
                </div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {riskyPayout > 0 ? "+" : ""}${riskyPayout}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Safe Strategy */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Few Safe Bets
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <div>
              {numSafeBets} bets × ${safeBetSize} = ${numSafeBets * safeBetSize}{" "}
              invested
            </div>
            <div>70% win rate, {safeMultiplier}x payout</div>
            <div className="font-medium text-gray-700 dark:text-gray-300">
              Expected: ${safeExpectedValue.toFixed(0)} profit
            </div>
          </div>

          {/* Visual grid of bets */}
          <div className="flex flex-wrap gap-1.5 min-h-[120px] p-3 bg-gray-50 dark:bg-gray-900 rounded">
            {Array(numSafeBets)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${
                    safeOutcomes[i] === undefined
                      ? "bg-gray-300 dark:bg-gray-700 text-gray-500"
                      : safeOutcomes[i]
                      ? "bg-green-500 text-white"
                      : "bg-red-500/20 text-red-600 dark:text-red-400"
                  }`}
                >
                  {safeOutcomes[i] === undefined
                    ? ""
                    : safeOutcomes[i]
                    ? "✓"
                    : "×"}
                </div>
              ))}
          </div>

          <div className="h-[76px]">
            {safeOutcomes.length > 0 && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {safeWins} wins × ${safeBetSize * safeMultiplier}
                </div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {safePayout > 0 ? "+" : ""}${safePayout}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={runSimulation}
        className="w-full px-4 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
      >
        Run Simulation
      </button>

      <p
        className="mt-4 text-xs text-gray-500 dark:text-gray-500 text-center font-sans"
        style={{ fontSize: "0.75rem", fontFamily: "inherit" }}
      >
        Increase the number of risky bets to see how volume changes expected
        outcomes
      </p>
    </div>
  );
}
