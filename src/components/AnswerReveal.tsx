import { useRef, useEffect } from "react";
import type { Quote } from "../types";

interface AnswerRevealProps {
  quote: Quote;
  onNext: () => void;
}

export default function AnswerReveal({ quote, onNext }: AnswerRevealProps) {
  const gifContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!quote.tenorId || !gifContainerRef.current) return;
    const container = gifContainerRef.current;
    container.innerHTML = `<div class="tenor-gif-embed"
      data-postid="${quote.tenorId}"
      data-share-method="host"
      data-width="100%">
    </div>`;
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    container.appendChild(script);
  }, [quote.tenorId]);

  return (
    <div className="answer-reveal">
      <div className="answer-details">
        <h2 className="answer-name">{quote.housewife}</h2>
        <p className="answer-meta">
          Real Housewives of <strong>{quote.city}</strong>
          {quote.season ? ` — Season ${quote.season}` : ""}
        </p>

        <div className="answer-image">
          {quote.tenorId ? (
            <div ref={gifContainerRef} />
          ) : (
            <div className="answer-image placeholder">
              <span>📸</span>
              <p>No image available</p>
            </div>
          )}
        </div>
      </div>

      <button className="btn-next" onClick={onNext}>
        Next Quote →
      </button>
    </div>
  );
}
