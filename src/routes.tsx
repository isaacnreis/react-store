import { lazy, Suspense } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Banner from "./components/Banner/Banner";
import Loading from "./components/Loading/Loading";

const ProductPage = lazy(() => import("./pages/ProductPage/ProductPage"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const Success = lazy(() => import("./pages/Success/Success"));
const Error = lazy(() => import("./pages/Error/Error"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Banner />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<Error />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
