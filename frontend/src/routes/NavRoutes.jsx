import React from "react";
import { Home } from "../pages/Home/Home";
import { Cart } from "../pages/Cart/Cart";
import { Route, Routes } from "react-router-dom";
import { ProductListing } from "../pages/ProductListing/ProductListing";
import { ProductDetails } from "../pages/ProductDetails/ProductDetails";
import { RequiresAuth } from "../components/requires-auth/RequiresAuth";
import { Logout } from "../pages/auth/Logout/Logout";
import { Signup } from "../pages/auth/Signup/Signup";
import { Checkout } from "../pages/Checkout/Checkout";
import { Wishlist } from "../pages/Wishlist/Wishlist";
import { UserProfile } from "../pages/UserProfile/UserProfile";
import { Profile } from "../pages/UserProfile/Profile/Profile";
import { Addresses } from "../pages/UserProfile/Addresses/Addresses";
import { Orders } from "../pages/UserProfile/Orders/Orders";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { LoginMain } from "../pages/auth/MainPage";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import MainDashboard from "../pages/Dashboard/Main";
import DashboardOrder from "../pages/Dashboard/Orders/Order";
import DashboardUser from "../pages/Dashboard/Users/Users";
import DashboardProduct from "../pages/Dashboard/Products/Products";
import DashboardCategories from "../pages/Dashboard/Categories/Categories";
import DashboardComplaints from "../pages/Dashboard/Complaints/Complaints";

export const NavRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/cart"
        element={
          <RequiresAuth>
            <Cart />
          </RequiresAuth>
        }
      />
      <Route
        path="/wishlist"
        element={
          <RequiresAuth>
            <Wishlist />
          </RequiresAuth>
        }
      />
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<LoginMain />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/product-listing" element={<ProductListing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product-details/:productId" element={<ProductDetails />} />
      <Route
        path="/checkout"
        element={
          <RequiresAuth>
            <Checkout />
          </RequiresAuth>
        }
      />
      <Route path="/profile" element={<UserProfile />}>
        <Route
          path="/profile/"
          element={
            <RequiresAuth>
              <Profile />
            </RequiresAuth>
          }
        />
        <Route path="/profile/orders" element={<Orders />} />
        <Route path="/profile/addresses" element={<Addresses />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route
          path="/dashboard/"
          element={
            <RequiresAuth>
              {/* <MainDashboard /> */}
              <DashboardOrder />
            </RequiresAuth>
          }
        />
        <Route path="/dashboard/orders" element={<DashboardOrder />} />
        <Route path="/dashboard/users" element={<DashboardUser />} />
        <Route path="/dashboard/products" element={<DashboardProduct />} />
        <Route path="/dashboard/categories" element={<DashboardCategories />} />
        <Route path="/dashboard/complaints" element={<DashboardComplaints />} />
      </Route>
    </Routes>
  );
};
