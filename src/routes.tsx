import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<h1>ProductPage</h1>} />
        <Route path="/checkout" element={<h1>Checkout</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
