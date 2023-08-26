import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import AllAds from "./pages/AllAds/AllAds";
import AdDetails from "./pages/AdDetails/AdDetails";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AddAd from "./pages/AddAd/AddAd";
import EditAd from "./pages/EditAd/EditAd";
import { store } from "./store/store";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { authSlice } from "./store/authSlice";
import { ThemeProvider } from "@mui/material";
import { themeDark } from "./styles/themeDark";
import { themeLight } from "./styles/themeLight";
import { auth, firebaseApp } from "./firebase";
import Layout from "./containers/Layout/Layout";

const App = () => {
  const dispatch = useDispatch();
  const themeState = useSelector((state) => state.theme);
  const selectedTheme = themeState.theme === "light" ? themeLight : themeDark;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(authSlice.actions.logout());
      } else {
        dispatch(authSlice.actions.setData(decodedToken));
      }
    }
  }, []);

  return (
    <ThemeProvider theme={selectedTheme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<AllAds />} />
            <Route path="/ad/:id" element={<AdDetails />} />
            <Route path="/ad/:id/edit" element={<EditAd />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-ad" element={<AddAd />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
