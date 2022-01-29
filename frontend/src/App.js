import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { ProductScreen } from "./components/ProductScreen/ProductScreen";
import { HomeScreen } from "./components/HomeScreen/HomeScreen";
import { SignIn } from "./components/SignIn/SignIn";
import { signout } from "./components/SignIn/Signin.actions";
import "./App.scss";

export default () => {
  const { userInfo } = useSelector((state) => state.userSignIn);
  const dispatch = useDispatch();
  const signOutHandler = useCallback(() => {
    dispatch(signout());
  }, [dispatch]);

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">
            ShivaMixtures
          </a>
        </div>
        <div>
          {/* <a href="/cart">Cart</a> */}
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
          <Route path="/products/:id" element={<ProductScreen />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
};
