import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { formatForGoogleDocs } from "@/lib/format-docs";

const FormatPage = () => {
  const [input, setInput] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const { toast } = useToast();

  const handleFormat = () => {
    const formatted = formatForGoogleDocs(input);
    setFormattedText(formatted);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedText);
      toast({
        title: "Copied!",
        description: "Text has been copied to clipboard",
        duration: 2000,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy text to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <Card className="max-w-4xl mx-auto bg-black border-cyan-200">
        <CardHeader>
          <CardTitle className="text-cyan-200">Google Docs Formatter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label htmlFor="input" className="text-cyan-200">
                Input Text
              </Label>
              <Textarea
                id="input"
                className="h-[400px] font-mono bg-black border-cyan-200 text-white placeholder:text-gray-500"
                placeholder="Paste your text here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="output" className="text-cyan-200">
                Formatted Output
              </Label>
              <Textarea
                id="output"
                className="h-[400px] font-mono bg-black border-cyan-200 text-white"
                value={formattedText}
                readOnly
              />
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              onClick={handleFormat}
              className="bg-cyan-900 text-cyan-200 hover:bg-cyan-800"
            >
              Format Text
            </Button>
            <Button
              onClick={handleCopy}
              className="bg-cyan-900 text-cyan-200 hover:bg-cyan-800"
              disabled={!formattedText}
            >
              Copy to Clipboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormatPage;
