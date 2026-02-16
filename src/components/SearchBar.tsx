import { useEffect, useState } from "react";

type Props = {
  initialValue: string;
  onCommit: (q: string) => void;
  onClear: () => void;
};

export default function SearchBar({ initialValue, onCommit, onClear }: Props) {
  const [value, setValue] = useState(initialValue);

  // URL側の更新に追従
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <form
      className="searchRow"
      onSubmit={(e) => {
        e.preventDefault();
        onCommit(value.trim());
      }}
    >
      <input
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="検索（例：協力 / 体験版 / 導線）"
      />

      <button className="btn" type="submit">
        検索
      </button>

      <button
        className="btn"
        type="button"
        onClick={() => {
          setValue("");
          onClear();
        }}
      >
        クリア
      </button>
    </form>
  );
}