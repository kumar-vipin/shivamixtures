import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadingBox } from "../LoadingBox/LoadingBox";
import { MessageBox, MessageBoxVariant } from "../MessageBox/MessageBox";
import { signin } from "./Signin.actions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location?.search ? location?.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(signin(email, password));
    },
    [email, password]
  );

  const { userInfo, loading, error } = useSelector((state) => state.userSignIn);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <div className="signin-wrapper">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
          {loading && <LoadingBox />}
          {error && (
            <MessageBox variant={MessageBoxVariant.ERROR}>{error}</MessageBox>
          )}
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Email address</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer? <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export { SignIn };
