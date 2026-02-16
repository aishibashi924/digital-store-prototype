import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";
import "./styles/app.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items/:id" element={<ItemDetail />} />
    </Routes>
  );
}