import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import "./index.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import AdminPanel from "./pages/AdminPanel";

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

          {/* Protected Routes */}
          <Route path="/item/:id" element={<ProductDetails />} />
          <Route path="/admindash" element={<AdminPanel />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
