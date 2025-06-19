import * as types from "./ActionTypes";

const initialState = {
  withdrawal: null,
  history: [],
  loding: false,
  error: null,
  paymentDetails: null,
  requests: [],
};

const withdrawalReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.WITHDRAWAL_REQUEST:
    case types.WITHDRAWAL_PROCEED_REQUEST:
    case types.GET_WITHDRAWAL_HISTORY_REQUEST:
    case types.GET_WITHDRAWAL_REQUEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.WITHDRAWAL_SUCCESS:
      return {
        ...state,
        withdrawal: action.payload,
        loading: false,
        error: null,
      };
    case types.ADD_PAYMENT_DETAILS_SUCCESS:
    case types.GET_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        paymentDetails: action.payload,
        loading: false,
        error: null,
      };
    case types.WITHDRAWAL_PROCEED_SUCCESS:
      return {
        ...state,
        requests: state.requests.map(
          (item) => (item.id = action.payload.id ? action.payload : item)
        ),
        loading: false,
        error: null,
      };
    case types.GET_WITHDRAWAL_HISTORY_SUCCESS:
      return {
        ...state,
        history: action.payload,
        error: null,
      };
    case types.WITHDRAWAL_FAILURE:
    case types.WITHDRAWAL_PROCEED_FAILURE:
    case types.GET_WITHDRAWAL_HISTORY_FAILURE:
    case types.GET_WITHDRAWAL_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default withdrawalReducer;
