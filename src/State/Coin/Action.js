import axios from "axios";
import {
  FETCH_COIN_BY_ID_FAILURE,
  FETCH_COIN_BY_ID_REQUEST,
  FETCH_COIN_BY_ID_SUCCESS,
  FETCH_COIN_DETAILS_FAILURE,
  FETCH_COIN_DETAILS_REQUEST,
  FETCH_COIN_DETAILS_SUCCESS,
  FETCH_COIN_LIST_FAILURE,
  FETCH_COIN_LIST_REQUEST,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_MARKET_CHART_FAILURE,
  FETCH_MARKET_CHART_REQUEST,
  FETCH_MARKET_CHART_SUCCESS,
  FETCH_TOP_50_COIN_LIST_FAILURE,
  FETCH_TOP_50_COIN_LIST_REQUEST,
  FETCH_TOP_50_COIN_LIST_SUCCESS,
} from "./ActionType";
import { api, API_BASE_URL } from "@/config/api";

export const getCoinList = (page) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_LIST_REQUEST });
  console.log("inside getCoins list");
  try {
    const { data } = await axios.get(`${API_BASE_URL}/coins?page=${page}`);

    console.log("getCoinList", data);

    dispatch({ type: FETCH_COIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_COIN_LIST_FAILURE, payload: error.message });
    console.log("error in getCoins", error);
  }
};

export const getTop50CoinsList = () => async (dispatch) => {
  dispatch({ type: FETCH_TOP_50_COIN_LIST_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/top50`);
    dispatch({ type: FETCH_TOP_50_COIN_LIST_SUCCESS, payload: response.data });
    console.log("top50", response.data);
  } catch (e) {
    dispatch({ type: FETCH_TOP_50_COIN_LIST_FAILURE, payload: e.message });
  }
};

export const fetchMarketChart =
  ({ coinId, days, jwt }) =>
  async (dispatch) => {
    console.log(days, coinId, jwt, "inside fetch chart");
    dispatch({ type: FETCH_MARKET_CHART_REQUEST });
    try {
      const response = await api.get(
        `/coins/${coinId.coinId}/chart?days=${days}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      dispatch({ type: FETCH_MARKET_CHART_SUCCESS, payload: response.data });
      console.log("top50", response.data);
    } catch (e) {
      dispatch({ type: FETCH_MARKET_CHART_FAILURE, payload: e.message });
    }
  };

export const fetchCoinById = (coinId) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_BY_ID_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/coins/${coinId}`);
    dispatch({ type: FETCH_COIN_BY_ID_SUCCESS, payload: response.data });
    console.log("coin by Id", response.data);
  } catch (e) {
    console.log("error", e);
    dispatch({ type: FETCH_COIN_BY_ID_FAILURE, payload: e.message });
  }
};
export const fetchCoinDetails = (coinId, jwt) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DETAILS_REQUEST });
  console.log("coin Id in acion", coinId.coinId, coinId.jwt);
  try {
    const response = await api.get(`coins/details/${coinId.coinId}`, {
      headers: {
        Authorization: `Bearer ${coinId.jwt}`,
      },
    });
    dispatch({ type: FETCH_COIN_DETAILS_SUCCESS, payload: response.data });
    console.log("coin details", response.data);
  } catch (e) {
    console.log("error", e);
    dispatch({ type: FETCH_COIN_DETAILS_FAILURE, payload: e.message });
  }
};
