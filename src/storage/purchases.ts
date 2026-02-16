const KEY = "digital_store_purchases_v1";

export type PurchaseRecord = {
  itemId: string;
  title: string;
  priceYen: number;
  orderId: string;
  purchasedAt: number; // Date.now()
};

export function loadPurchases(): PurchaseRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PurchaseRecord[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function savePurchases(list: PurchaseRecord[]) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function hasPurchased(itemId: string): boolean {
  return loadPurchases().some((p) => p.itemId === itemId);
}

export function addPurchase(record: PurchaseRecord) {
  const list = loadPurchases();

  // 同じ商品は1回購入済みにする（重複防止）
  if (list.some((p) => p.itemId === record.itemId)) return;

  list.unshift(record); // 新しい購入を先頭へ
  savePurchases(list);
}