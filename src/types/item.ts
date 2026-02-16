export type Item = {
  id: string;
  title: string;
  priceYen: number;
  desc: string;
  tags: string[];
  release: string; // YYYY-MM-DD
  popularity: number; // 0..100
};