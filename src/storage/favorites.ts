const KEY = "digital_store_favorites_v1";

// お気に入りを読み込み
export function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((x) => typeof x === "string"));
  } catch {
    return new Set();
  }
}

// お気に入りを保存
export function saveFavorites(favs: Set<string>) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...favs]));
  } catch {
    // 何もしない
  }
}