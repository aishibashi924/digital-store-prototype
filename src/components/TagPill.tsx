type Props = { label: string };

export default function TagPill({ label }: Props) {
  return <span className="tag">{label}</span>;
}