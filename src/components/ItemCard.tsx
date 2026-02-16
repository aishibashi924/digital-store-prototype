import { Link } from "react-router-dom";
import type { Item } from "../types/item";
import FavoriteButton from "./FavoriteButton";
import TagPill from "./TagPill";

type Props = {
  item: Item;
  listQuery: string; // 一覧のURLクエリをそのまま渡す
  isFav: boolean;
  onToggleFav: (id: string) => void;
};

function yen(n: number) {
  return n === 0 ? "無料" : `${n.toLocaleString()}円`;
}

export default function ItemCard({ item, listQuery, isFav, onToggleFav }: Props) {
  // 一覧の状態をクエリで持って詳細へ
  const to = listQuery ? `/items/${item.id}?${listQuery}` : `/items/${item.id}`;

  return (
    <div className="card">
      <Link className="cardLink" to={to}>
        <div className="rowBetween">
          <div className="title">{item.title}</div>
          <div className="price">{yen(item.priceYen)}</div>
        </div>

        <div className="desc">{item.desc}</div>

        <div className="tagRow">
          {item.tags.map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>
      </Link>

      <div className="cardActions">
        <FavoriteButton
          active={isFav}
          onToggle={() => onToggleFav(item.id)}
          size="sm"
        />
      </div>
    </div>
  );
}