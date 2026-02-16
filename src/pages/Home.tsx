import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ITEMS } from "../data/items";
import type { Item } from "../types/item";
import SortSelect from "../components/SortSelect";
import type { SortKey } from "../components/SortSelect";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import { loadFavorites, saveFavorites } from "../storage/favorites";

function contains(item: Item, q: string) {
  const s = (item.title + " " + item.desc + " " + item.tags.join(" ")).toLowerCase();
  return s.includes(q.toLowerCase());
}

function sortItems(items: Item[], sort: SortKey) {
  const copy = [...items];

  if (sort === "price_asc") copy.sort((a, b) => a.priceYen - b.priceYen);
  if (sort === "price_desc") copy.sort((a, b) => b.priceYen - a.priceYen);
  if (sort === "new") copy.sort((a, b) => (a.release < b.release ? 1 : -1));
  if (sort === "popular") copy.sort((a, b) => b.popularity - a.popularity);

  if (sort === "reco") {
    copy.sort((a, b) => {
      const pop = b.popularity - a.popularity;
      const freeBoost = (a.priceYen === 0 ? 8 : 0) - (b.priceYen === 0 ? 8 : 0);
      return pop + freeBoost;
    });
  }

  return copy;
}

export default function Home() {
  const [params, setParams] = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const sort = (params.get("sort") ?? "reco") as SortKey;
  const favOnly = (params.get("fav") ?? "") === "1";

  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites());

  // お気に入りを保存
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  function toggleFav(id: string) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const base1 = q ? ITEMS.filter((it) => contains(it, q)) : ITEMS;
    const base2 = favOnly ? base1.filter((it) => favorites.has(it.id)) : base1;
    return sortItems(base2, sort);
  }, [q, sort, favOnly, favorites]);

  const favCount = favorites.size;
  const listQuery = params.toString();

  return (
    <div className="page">
      <header className="header">
        <div className="headerLeft">
          <h1 className="h1">Digital Store Prototype</h1>
          <div className="sub">最小ストアUI</div>
        </div>

        <div className="headerRight">
          <SortSelect
            value={sort}
            onChange={(v) => {
              const next = new URLSearchParams(params);
              next.set("sort", v);
              setParams(next);
            }}
          />
        </div>
      </header>

      <SearchBar
        initialValue={q}
        onCommit={(nextQ) => {
          const next = new URLSearchParams(params);
          if (nextQ) next.set("q", nextQ);
          else next.delete("q");
          setParams(next);
        }}
        onClear={() => {
          const next = new URLSearchParams(params);
          next.delete("q");
          setParams(next);
        }}
      />

      <div className="controlsRow">
        <button
          type="button"
          className="favOnly"
          onClick={() => {
            const next = new URLSearchParams(params);
            if (favOnly) next.delete("fav");
            else next.set("fav", "1");
            setParams(next);
          }}
          aria-pressed={favOnly}
        >
          {favOnly ? "★ お気に入りだけ表示中" : "☆ お気に入りだけ表示"}
          <span className="favCount">{favCount}</span>
        </button>

        <div className="muted">
          検索・並び替え・フィルタはURLに保存される。お気に入りはブラウザに保存される。
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">該当する商品がない</div>
      ) : (
        <div className="grid">
          {filtered.map((it) => (
            <ItemCard
              key={it.id}
              item={it}
              listQuery={listQuery}
              isFav={favorites.has(it.id)}
              onToggleFav={toggleFav}
            />
          ))}
        </div>
      )}

      <div className="footnote">
        詳細へ遷移するときに一覧状態をクエリで引き継ぐため、戻っても並び順が維持される。
      </div>
    </div>
  );
}