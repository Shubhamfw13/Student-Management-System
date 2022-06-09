import * as types from "./types";

const initialState = {
  loading: "",
  error: "",
  Event: [],
  Assignment: [],
};

export const eventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.GET_EVENT_DATA_REQ:
      return { ...state, loading: payload };
    case types.GET_EVENT_DATA_SUCCESS:
      return { ...state, Event: payload };
    case types.GET_EVENT_DATA_FAIL:
      return { ...state, error: payload };
    case types.GET_ASSIGNMENT_DATA_REQ:
      return { ...state, error: payload };
    case types.GET_ASSIGNMENT_DATA_SUCCESS:
      return { ...state, Assignment: payload };
    case types.GET_ASSIGNMENT_DATA_SUCCESS:
      return { ...state, error: payload };

    default:
      return state;
  }
};
