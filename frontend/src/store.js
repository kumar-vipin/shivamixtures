import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import data from "./data";

import thunk from "redux-thunk";
import { productDetailsReducer, productListReducer } from "./components/ProductScreen/ProductScreen.reducer";


const initialState = {};

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
