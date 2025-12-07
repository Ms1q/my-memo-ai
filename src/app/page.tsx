"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Sparkles, Loader2, Brain, Zap, BookOpen } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes: input }),
    });
    const data = await res.json();
    setCards(data.cards || []);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-black pt-20 pb-32">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="relative max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
            BrainForge
          </h1>
          <p className="text-3xl text-gray-300 mb-4">The ultimate AI-powered learning engine</p>
          <div className="flex justify-center gap-8 mt-10">
            <div className="flex items-center gap-3 text-cyan-400"><Brain className="w-8 h-8" /> Active Recall</div>
            <div className="flex items-center gap-3 text-purple-400"><Zap className="w-8 h-8" /> Spaced Repetition</div>
            <div className="flex items-center gap-3 text-pink-400"><BookOpen className="w-8 h-8" /> Instant Flashcards</div>
          </div>
        </div>
      </div>

      {/* Main Input */}
      <div className="max-w-5xl mx-auto -mt-20 relative z-10 px-8">
        <Card className="bg-gray-900/80 backdrop-blur border-gray-800 p-12 shadow-2xl">
          <Textarea
            className="min-h-96 text-xl bg-gray-950 border-gray-700 text-white placeholder-gray-500"
            placeholder="Drop any lecture, PDF text, YouTube transcript, article, book notes... BrainForge turns it into perfect study material in seconds."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button 
            onClick={generate} 
            disabled={loading || !input}
            size="lg" 
            className="w-full mt-8 h-20 text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500"
          >
            {loading ? (
              <> <Loader2 className="mr-4 h-10 w-10 animate-spin" /> Forging Your Brain...</>
            ) : (
              <> <Sparkles className="mr-4 h-10 w-10" /> Generate AI Flashcards Now</>
            )}
          </Button>
        </Card>

        {/* Cards Grid */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
            {cards.map((c: any, i: number) => (
              <Card key={i} className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 p-8 hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="text-cyan-400 font-bold text-5xl mb-6 opacity-20">#{i + 1}</div>
                <p className="text-2xl font-bold mb-6 text-white">{c.front}</p>
                <p className="text-gray-400 text-lg leading-relaxed">{c.back}</p>
                {c.tags && (
                  <div className="flex flex-wrap gap-2 mt-6">
                    {c.tags.map((t: string) => (
                      <span key={t} className="px-4 py-2 bg-purple-900/50 rounded-full text-purple-300 text-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}