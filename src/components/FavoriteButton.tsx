type Props = {
  active: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
};

export default function FavoriteButton({ active, onToggle, size = "md" }: Props) {
  const cls = [
    "btnFav",
    active ? "btnFavActive" : "",
    size === "sm" ? "btnFav-sm" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={cls} onClick={onToggle} aria-pressed={active}>
      {active ? "★ お気に入り" : "☆ お気に入りに登録"}
    </button>
  );
}