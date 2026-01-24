import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../../components/navbar";
import Home from "../../pages/home";
import Cart from "../../pages/cart";
import Contact from "../../pages/contact";
import Shop from "../../pages/shop";
import Support from "../../pages/support";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Support" element={<Support />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
