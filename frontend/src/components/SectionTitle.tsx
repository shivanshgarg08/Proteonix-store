type Props = {
  eyebrow: string;
  title: string;
};

export default function SectionTitle({ eyebrow, title }: Props) {
  return (
    <div className="mb-8 space-y-2">
      <p className="badge">{eyebrow}</p>
      <h2 className="font-display text-3xl tracking-tight">{title}</h2>
    </div>
  );
}
