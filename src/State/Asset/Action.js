import { api } from "@/config/api";
import * as types from "./ActionType";

export const getAssetByID =
  ({ assetId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_ASSET_REQUEST });
    try {
      const response = await api.get(`api/assets/${assetId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.GET_ASSET_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: types.GET_ASSET_FAILURE,
        error: e.message,
      });
    }
  };

export const getAssetDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_ASSET_DETAILS_REQUEST });
    try {
      const response = await api.get(`api/assets/coin/${coinId}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.GET_ASSET_DETAILS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: types.GET_ASSET_DETAILS_FAILURE,
        error: e.message,
      });
    }
  };

export const getUserAsset =
  ({ jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_USER_ASSET_REQUEST });
    try {
      const response = await api.get(`api/assets`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.GET_USER_ASSET_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: types.GET_USER_ASSET_FAILURE,
        error: e.message,
      });
    }
  };
