import axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "./UserProfile.constants";

export const userDetails = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: { userId } });
  const {
    userSignIn: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error?.response?.data?.message
        ? error.response.data.message
        : error.message,
    });
  }
};
