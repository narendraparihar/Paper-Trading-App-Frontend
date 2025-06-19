import { api } from "@/config/api";
import * as types from "./ActionType";

export const payOrder =
  ({ jwt, orderData, amount }) =>
  async (dispatch) => {
    dispatch({ type: types.PAY_ORDER_REQUEST });
    try {
      const response = await api.post(`/api/order/pay`, orderData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.PAY_ORDER_SUCCESS,
        payload: response.data,
        amount,
      });
      console.log("order success", response.data);
    } catch (e) {
      console.log(e);
      dispatch({ type: types.PAY_ORDER_FAILURE, error: e.message });
    }
  };

export const getAllOrderForUser =
  ({ jwt, orderType, assetSymbol }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_ALL_ORDERS_REQUEST });
    try {
      const response = await api.get(`/api/order/`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: {
          order_type: orderType,
          asset_symbol: assetSymbol,
        },
      });
      dispatch({
        type: types.GET_ALL_ORDERS_SUCCESS,
        payload: response.data,
      });
      console.log("order success", response.data);
    } catch (e) {
      console.log(e);
      dispatch({ type: types.GET_ALL_ORDERS_FAILURE, error: e.message });
    }
  };
