import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoadingBox } from "../LoadingBox/LoadingBox";
import { MessageBox, MessageBoxVariant } from "../MessageBox/MessageBox";
import { register } from "./SignUp.actions";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location?.search ? location?.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      if(password  === confirmPassword) {
        dispatch(register(name, email, password));
      } else {
        alert('Password and confirm password are not matched!')
      }
    },
    [name, email, password, confirmPassword]
  );

  const { userInfo, loading, error } = useSelector((state) => state.userRegister);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <div className="signin-wrapper">
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
          {loading && <LoadingBox />}
          {error && (
            <MessageBox variant={MessageBoxVariant.ERROR}>{error}</MessageBox>
          )}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sigin</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export { SignUp };
