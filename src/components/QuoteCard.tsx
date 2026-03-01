interface QuoteCardProps {
  quote: string;
  quoteNumber: number;
  totalQuotes: number;
}

export default function QuoteCard({ quote, quoteNumber, totalQuotes }: QuoteCardProps) {
  return (
    <div className="quote-card">
      <div className="quote-number">
        {quoteNumber} / {totalQuotes}
      </div>
      <blockquote className="quote-text">"{quote}"</blockquote>
    </div>
  );
}
