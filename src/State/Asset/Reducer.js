import * as types from "./ActionType";

const initialState = {
  asset: null,
  userAsset: [],
  loading: false,
  error: null,
  assetDetails: null,
};

const assetReducer = (State = initialState, action) => {
  switch (action.type) {
    case types.GET_ASSET_REQUEST:
    case types.GET_USER_ASSET_REQUEST:
      return {
        ...State,
        loading: true,
        error: null,
      };
    case types.GET_ASSET_SUCCESS:
      return {
        ...State,
        asset: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_USER_ASSET_SUCCESS:
      return {
        ...State,
        userAsset: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_ASSET_DETAILS_SUCCESS:
      return {
        ...State,
        assetDetails: action.payload,
        loading: false,
        error: null,
      };
    case types.GET_ASSET_DETAILS_FAILURE:
    case types.GET_USER_ASSET_FAILURE:
      return {
        ...State,
        loading: false,
        error: action.error,
      };
    default:
      return State;
  }
};

export default assetReducer;
