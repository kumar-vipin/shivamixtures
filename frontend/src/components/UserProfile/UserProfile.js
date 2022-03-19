import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingBox } from "../LoadingBox/LoadingBox";
import { MessageBox } from "../MessageBox/MessageBox";
import { userDetails } from "./UserProfile.actions";

const UserProfile = () => {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetailInfo = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userDetails(userInfo._id));
  }, [dispatch, userInfo._id]);
  const { loading, error, user } = userDetailInfo;
  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch update profile
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>User Profile</h1>
          {loading && <LoadingBox />}
          {error && (
            <MessageBox variant={MessageBoxVariant.ERROR}>{error}</MessageBox>
          )}
        </div>
        {!loading && (
          <>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                placeholder="Enter name"
                value={user.name}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={user.email}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter password"
                value={user.password}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Enter confirm password"
              />
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
