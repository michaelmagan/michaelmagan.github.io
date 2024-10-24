import BetOptimizer from "@/components/bet-optimizer";
import React from "react";

const ElectionBet: React.FC = () => {
  return (
    <div className="flex flex-col items-center m-10">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold text-center my-8">
          Michael's Elections Page
        </h1>
        <p className="text-center my-4">
          Polymarket's election odds are significantly different from
          FiveThirtyEight's projections based on us poll data. If you live
          outside of the US, you can take advantage of this spread.
          <br />
          <a
            href="https://polymarket.com/election"
            className="text-blue-500 underline"
          >
            Click here to visit Polymarket's election page.
          </a>
          <br />
          <a
            href="https://projects.fivethirtyeight.com/2024-election-forecast/"
            className="text-blue-500 underline"
          >
            Click here to visit FiveThirtyEight's forecast page.
          </a>
        </p>
      </div>
      <BetOptimizer />
    </div>
  );
};

export default ElectionBet;
