type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function QuantityControl({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 border border-white/10 rounded-full px-3 py-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="text-lg"
      >
        -
      </button>
      <span className="min-w-[24px] text-center">{value}</span>
      <button type="button" onClick={() => onChange(value + 1)} className="text-lg">
        +
      </button>
    </div>
  );
}
