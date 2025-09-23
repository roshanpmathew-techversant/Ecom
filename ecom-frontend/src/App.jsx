import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import AdminPanel from "./pages/AdminPanel";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/item/:id" element={<ProductDetails />} />

          {/* Protected Routes */}
          <Route path="/admindash" element={<AdminPanel />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
