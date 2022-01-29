import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import data from "./data";

import thunk from "redux-thunk";
import {
  productDetailsReducer,
  productListReducer,
} from "./components/ProductScreen/ProductScreen.reducer";
import { userSigninReducer } from "./components/SignIn/Signin.reducer";
import { userRegisterReducer } from "./components/SignUp/SignUp.reducer";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
};

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userSignIn: userSigninReducer,
  userRegister: userRegisterReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
