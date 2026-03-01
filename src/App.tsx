import { useState, useCallback, useEffect } from "react";
import QuoteCard from "./components/QuoteCard";
import GuessInput from "./components/GuessInput";
import AnswerReveal from "./components/AnswerReveal";
import quotesData from "./data/quotes.json";
import type { Quote } from "./types";
import "./App.css";

function isCorrectGuess(guess: string, answer: string): boolean {
  const g = guess.toLowerCase().trim();
  const full = answer.toLowerCase();
  const parts = full.split(" ");
  return full === g || parts[0] === g || parts[parts.length - 1] === g || full.includes(g);
}

function shuffle<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const quotes: Quote[] = quotesData;

export default function App() {
  const [shuffledQuotes, setShuffledQuotes] = useState<Quote[]>(() => shuffle(quotes));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [userGuess, setUserGuess] = useState<string | null>(null);

  const currentQuote = shuffledQuotes[currentIndex];

  const handleGuess = useCallback((guess: string) => {
    setUserGuess(guess);
    setRevealed(true);
  }, []);

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= shuffledQuotes.length) {
      setShuffledQuotes(shuffle(quotes));
      setCurrentIndex(0);
    } else {
      setCurrentIndex(nextIndex);
    }
    setRevealed(false);
    setUserGuess(null);
  }, [currentIndex, shuffledQuotes.length]);

  useEffect(() => {
    if (!revealed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [revealed, handleNext]);

  return (
    <div className={`app${revealed ? " revealed" : ""}`}>
      <header className="app-header">
        <h1>Guess the Housewife</h1>
      </header>

      <main className="game-area">
        <div className="left-panel">
          <QuoteCard
            quote={currentQuote.quote}
            quoteNumber={currentIndex + 1}
            totalQuotes={shuffledQuotes.length}
          />
          {revealed && userGuess && (() => {
            const correct = isCorrectGuess(userGuess, currentQuote.housewife);
            return (
              <div className={`guess-result ${correct ? "correct" : "incorrect"}`}>
                <span className="guess-result-icon" aria-hidden="true">
                  {correct ? "👑" : (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </span>
                <span className="guess-result-text">
                  {correct ? "You got it!" : `Not quite! You guessed "${userGuess}"`}
                </span>
              </div>
            );
          })()}
          {!revealed && (
            <GuessInput onGuess={handleGuess} onReveal={handleReveal} />
          )}
        </div>

        {revealed && (
          <div className="right-panel">
            <AnswerReveal quote={currentQuote} onNext={handleNext} />
          </div>
        )}
      </main>
    </div>
  );
}
