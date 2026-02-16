export type SortKey = "reco" | "popular" | "new" | "price_asc" | "price_desc";

type Props = {
  value: SortKey;
  onChange: (v: SortKey) => void;
};

export default function SortSelect({ value, onChange }: Props) {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      aria-label="並び替え"
    >
      <option value="reco">おすすめ</option>
      <option value="popular">人気</option>
      <option value="new">新着</option>
      <option value="price_asc">価格が安い順</option>
      <option value="price_desc">価格が高い順</option>
    </select>
  );
}