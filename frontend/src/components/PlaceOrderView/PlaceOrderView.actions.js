import axios from "axios";
import { CART_EMPTY } from "../ProductCart/ProductCart.constants";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "./PlaceOrderView.constants";

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });

  try {
    const {
      userSignIn: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order,
    });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const orderDetails = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const {
      userSignIn: { userInfo },
    } = getState();

    const { data } = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const orderMineList = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/orders/list", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_LIST_FAIL, payload: message });
  }
};
