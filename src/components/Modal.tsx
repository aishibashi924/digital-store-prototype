import { useEffect } from "react";

type Props = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

// シンプルなモーダル
export default function Modal({ open, title, onClose, children, footer }: Props) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        // 背景クリックで閉じる
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modalCard">
        <div className="modalHeader">
          <div className="modalTitle">{title}</div>
          <button type="button" className="iconBtn" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>

        <div className="modalBody">{children}</div>

        {footer ? <div className="modalFooter">{footer}</div> : null}
      </div>
    </div>
  );
}