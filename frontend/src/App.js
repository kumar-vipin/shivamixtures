import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { ProductScreen } from "./components/ProductScreen/ProductScreen";
import { HomeScreen } from "./components/HomeScreen/HomeScreen";
import { SignIn } from "./components/SignIn/SignIn";
import { signout } from "./components/SignIn/Signin.actions";
import { SignUp } from "./components/SignUp/SignUp";
import { ProductCart } from "./components/ProductCart/ProductCart";
import "./App.scss";

export default () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignIn);
  const dispatch = useDispatch();
  const signOutHandler = useCallback(() => {
    dispatch(signout());
  }, [dispatch]);

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            ShivaMixtures
          </Link>
        </div>
        <div>
          <Link to="/cart">
            Cart{" "}
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className="dropdown">
              <Link to="#">
                {userInfo.name}
                <i>&#9660;</i>
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="#signout" onClick={signOutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/signin">Sign in</Link>
          )}
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/cart">
            <Route path=":id" element={<ProductCart />} />
            <Route path="" element={<ProductCart />} />
          </Route>
          <Route path="/products/:id" element={<ProductScreen />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
};
