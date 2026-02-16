import Modal from "./Modal";
import type { Item } from "../types/item";

type Props = {
  open: boolean;
  item: Item;
  onClose: () => void;
  onConfirm: () => void;
};

function yen(n: number) {
  return n === 0 ? "無料" : `${n.toLocaleString()}円`;
}

// 購入の確認モーダル
export default function PurchaseModal({ open, item, onClose, onConfirm }: Props) {
  const total = item.priceYen;

  return (
    <Modal
      open={open}
      title="購入内容の確認"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn" onClick={onClose}>
            キャンセル
          </button>
          <button
            type="button"
            className="btnDanger"
            onClick={() => {
              onConfirm();
            }}
          >
            購入を確定
          </button>
        </>
      }
    >
      <div className="row">
        <div className="label">商品</div>
        <div className="value strong">{item.title}</div>
      </div>

      <div className="row">
        <div className="label">価格</div>
        <div className="value">{yen(item.priceYen)}</div>
      </div>

      <div className="row">
        <div className="label">合計</div>
        <div className="value strong">{yen(total)}</div>
      </div>

      <p className="note">
        これはプロトタイプのため、実際の決済は行わない。フローの確認用。
      </p>
    </Modal>
  );
}