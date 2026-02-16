import { Link, useSearchParams } from "react-router-dom";

export default function CheckoutComplete() {
  const [params] = useSearchParams();
  const title = params.get("title") ?? "";
  const orderId = params.get("orderId") ?? "";

  return (
    <div className="page">
      <header className="header">
        <div className="headerLeft">
          <h1 className="h1">購入完了</h1>
          <div className="sub">最小購入フロー</div>
        </div>
      </header>

      <div className="card" style={{ padding: 16, marginTop: 14 }}>
        <div className="title">購入が完了した（仮）</div>

        {title && <p className="desc">対象：{title}</p>}
        {orderId && <p className="desc">注文番号（仮）：{orderId}</p>}

        <p className="muted">実際の決済やアカウント連携は未実装。導線確認用。</p>

        <div className="detailActions">
          <Link className="btnPrimary" to="/">
            一覧へ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}