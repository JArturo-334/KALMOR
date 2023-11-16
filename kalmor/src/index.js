/*!

=========================================================
* Paper Kit React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
// pages
import Index from "views/Index.js";
import ProfilePage from "views/pages/ProfilePage";
import RegisterPage from "views/pages/RegisterPage";
import LoginPage from "views/pages/LoginPage";
import Exmaples from "views/Components_Examples";
import ShopPage from "views/pages/ShopPage"
import AddProduct from "views/pages/AddProductPage";

import PrivateRoute from "components/PrivateRoute";
import ForgotPassword from "components/ForgotPassword";
import { AuthProvider } from "context/Auth";
import UpdateProduct from "views/pages/UpdateProduct";
// others

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/index" element={<PrivateRoute> <Index /> </PrivateRoute>} />
        <Route path="/shop" element={<PrivateRoute> <ShopPage /> </PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
        <Route path="/addproduct" element={<PrivateRoute> <AddProduct /> </PrivateRoute>} />
        <Route path="/updateproduct/:productId" element={<PrivateRoute> <UpdateProduct/></PrivateRoute>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/examples" element={<Exmaples />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
