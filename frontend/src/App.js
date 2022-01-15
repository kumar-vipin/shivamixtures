import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProductScreen } from "./components/ProductScreen/ProductScreen";
import { HomeScreen } from "./components/HomeScreen/HomeScreen";
import "./App.scss";

export default () => {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">
            ShivaMixtures
          </a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signin">Sign in</a>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/product/:id" element={<ProductScreen/>} />
          <Route path="/" element={<HomeScreen/>} />
        </Routes>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
};
