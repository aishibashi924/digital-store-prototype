import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ITEMS } from "../data/items";
import FavoriteButton from "../components/FavoriteButton";
import TagPill from "../components/TagPill";
import { loadFavorites, saveFavorites } from "../storage/favorites";
import PurchaseModal from "../components/PurchaseModal";
import Modal from "../components/Modal";

function yen(n: number) {
  return n === 0 ? "無料" : `${n.toLocaleString()}円`;
}

export default function ItemDetail() {
  const { id } = useParams();
  const location = useLocation();

  const item = useMemo(() => ITEMS.find((x) => x.id === id), [id]);

  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites());

  // 購入フロー用
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [doneOpen, setDoneOpen] = useState(false);

  // お気に入りを保存
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  function toggleFav(targetId: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(targetId)) next.delete(targetId);
      else next.add(targetId);
      return next;
    });
  }

  // 一覧へ戻るときに q / sort / fav を維持
  const backTo = location.search ? `/${location.search}` : "/";

  if (!item) {
    return (
      <div className="page">
        <div className="topNav">
          <Link className="link" to={backTo}>
            ← 一覧へ戻る
          </Link>
        </div>
        <div className="empty">商品が見つからない</div>
      </div>
    );
  }

  const isFav = favorites.has(item.id);

  return (
    <div className="page">
      <div className="topNav">
        <Link className="link" to={backTo}>
          ← 一覧へ戻る
        </Link>
      </div>

      <div className="detailCard">
        <div className="rowBetween">
          <h2 className="h2">{item.title}</h2>
          <div className="priceBig">{yen(item.priceYen)}</div>
        </div>

        <div className="desc">{item.desc}</div>

        <div className="tagRow">
          {item.tags.map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>

        <div className="detailActions">
          <button
            type="button"
            className="btnDanger"
            onClick={() => setPurchaseOpen(true)}
        >
            購入する
        </button>

          <FavoriteButton active={isFav} onToggle={() => toggleFav(item.id)} />
        </div>

        <div className="muted">
          詳細でもお気に入り状態が反映される。戻ると一覧の並び順も維持される。
        </div>
      </div>

      {/* 購入確認モーダル */}
      <PurchaseModal
        open={purchaseOpen}
        item={item}
        onClose={() => setPurchaseOpen(false)}
        onConfirm={() => {
          // 擬似的に購入完了へ
          setPurchaseOpen(false);
          setDoneOpen(true);
        }}
      />

      {/* 購入完了モーダル */}
      <Modal
        open={doneOpen}
        title="購入が完了した"
        onClose={() => setDoneOpen(false)}
        footer={
          <button type="button" className="btnDanger" onClick={() => setDoneOpen(false)}>
            閉じる
          </button>
        }
      >
        <div className="row">
          <div className="label">商品</div>
          <div className="value strong">{item.title}</div>
        </div>

        <div className="row">
          <div className="label">ステータス</div>
          <div className="value">利用可能（仮）</div>
        </div>

        <p className="note">
          ここに「利用開始」導線や、ライブラリ追加などの次アクションを置ける。
        </p>
      </Modal>
    </div>
  );
}