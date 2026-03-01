import { useState } from "react";

interface GuessInputProps {
  onGuess: (guess: string) => void;
  onReveal: () => void;
}

export default function GuessInput({ onGuess, onReveal }: GuessInputProps) {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim()) {
      onGuess(guess.trim());
      setGuess("");
    } else {
      onReveal();
    }
  };

  return (
    <form className="guess-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Which housewife said this?"
        autoFocus
      />
      <div className="guess-buttons">
        <button type="submit" disabled={!guess.trim()} className="btn-guess">
          Submit Guess
        </button>
        <button type="button" onClick={onReveal} className="btn-reveal">
          Reveal Answer
        </button>
      </div>
    </form>
  );
}
