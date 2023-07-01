import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./Components/Route/PrivateRoute";
import AdminRoute from "./Components/Route/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import AdminInfo from "./pages/Admin/AdminInfo";
import Users from "./pages/Admin/Users";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Orders from "./pages/user/Orders";
import UserProfile from "./pages/user/UserProfile";
import "antd/dist/reset.css";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct.js";
import Search from "./Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/categories/category/:slug"
          element={<CategoryProduct />}
        />
        <Route
          path="/dashboard-user"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="" element={<UserProfile />} />
          <Route path="orders" element={<Orders />} />
        </Route>
        <Route
          path="/dashboard-admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        >
          <Route path="" element={<AdminInfo />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="product/:slug" element={<UpdateProduct />} />
          <Route path="products" element={<Products />} />
        </Route>
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-left" />
    </>
  );
}

export default App;
