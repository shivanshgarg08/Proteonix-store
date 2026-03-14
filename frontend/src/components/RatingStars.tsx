type Props = {
  rating: number;
};

export default function RatingStars({ rating }: Props) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div className="flex items-center gap-1 text-amber-300">
      {[...Array(5)].map((_, index) => {
        const isFull = index < fullStars;
        const isHalf = index === fullStars && hasHalf;
        const className = isFull ? '' : isHalf ? 'opacity-60' : 'opacity-30';

        return (
          <span key={index} className={className}>
            *
          </span>
        );
      })}
      <span className="text-xs text-muted ml-2">{rating.toFixed(1)}</span>
    </div>
  );
}
