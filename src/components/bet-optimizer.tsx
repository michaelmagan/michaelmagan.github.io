import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BetOptimizer = () => {
  const [totalBankroll, setTotalBankroll] = useState(1000);
  const [trumpProb, setTrumpProb] = useState(51);
  const [trumpYesPrice, setTrumpYesPrice] = useState(62.8);
  const [harrisYesPrice, setHarrisYesPrice] = useState(37.3);

  const calculateOptimalBets = () => {
    const trumpProbDecimal = trumpProb / 100;
    const harrisProbDecimal = 1 - trumpProbDecimal;

    const evTrumpYes =
      (trumpProbDecimal * (100 - trumpYesPrice) -
        harrisProbDecimal * trumpYesPrice) /
      100;
    const evHarrisYes =
      (harrisProbDecimal * (100 - harrisYesPrice) -
        trumpProbDecimal * harrisYesPrice) /
      100;

    const kellyTrumpYes =
      (trumpProbDecimal * (100 - trumpYesPrice) -
        harrisProbDecimal * trumpYesPrice) /
      (100 - trumpYesPrice);
    const kellyHarrisYes =
      (harrisProbDecimal * (100 - harrisYesPrice) -
        trumpProbDecimal * harrisYesPrice) /
      (100 - harrisYesPrice);

    const trumpYesBet = Math.max(
      0,
      parseFloat((kellyTrumpYes * totalBankroll).toFixed(2))
    );
    const harrisYesBet = Math.max(
      0,
      parseFloat((kellyHarrisYes * totalBankroll).toFixed(2))
    );

    const trumpWinOutcome = (
      trumpYesBet * ((100 - trumpYesPrice) / trumpYesPrice) -
      harrisYesBet
    ).toFixed(2);

    const harrisWinOutcome = (
      harrisYesBet * ((100 - harrisYesPrice) / harrisYesPrice) -
      trumpYesBet
    ).toFixed(2);

    return {
      trumpYesBet,
      harrisYesBet,
      evTrumpYes,
      evHarrisYes,
      trumpWinOutcome,
      harrisWinOutcome,
    };
  };

  const results = calculateOptimalBets();

  return (
    <div className="flex justify-center w-full">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">
            Betting Optimization Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankroll">Total Bankroll ($)</Label>
                <Input
                  id="bankroll"
                  type="number"
                  value={totalBankroll}
                  onChange={(e) => setTotalBankroll(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trumpProb">Trump Win Probability (%)</Label>
                <Input
                  id="trumpProb"
                  type="number"
                  value={trumpProb}
                  onChange={(e) => setTrumpProb(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="trumpYesPrice">Trump YES Price (¢)</Label>
                <Input
                  id="trumpYesPrice"
                  type="number"
                  value={trumpYesPrice}
                  onChange={(e) => setTrumpYesPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="harrisYesPrice">Harris YES Price (¢)</Label>
                <Input
                  id="harrisYesPrice"
                  type="number"
                  value={harrisYesPrice}
                  onChange={(e) => setHarrisYesPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-center">
                Optimal Bet Allocation:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">Trump YES @ {trumpYesPrice}¢</p>
                  <p className="text-lg">${results.trumpYesBet}</p>
                  <p className="text-sm text-muted-foreground">
                    EV: {(results.evTrumpYes * 100).toFixed(2)}%
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">Harris YES @ {harrisYesPrice}¢</p>
                  <p className="text-lg">${results.harrisYesBet}</p>
                  <p className="text-sm text-muted-foreground">
                    EV: {(results.evHarrisYes * 100).toFixed(2)}%
                  </p>
                </div>
              </div>

              <h3 className="font-semibold mt-6 text-center">
                Outcome Scenarios:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">If Trump Wins ({trumpProb}%)</p>
                  <p
                    className={`text-lg ${Number(results.trumpWinOutcome) >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {Number(results.trumpWinOutcome) >= 0 ? "+" : ""}
                    {results.trumpWinOutcome}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">
                    If Harris Wins ({100 - trumpProb}%)
                  </p>
                  <p
                    className={`text-lg ${Number(results.harrisWinOutcome) >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {Number(results.harrisWinOutcome) >= 0 ? "+" : ""}
                    {results.harrisWinOutcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BetOptimizer;
