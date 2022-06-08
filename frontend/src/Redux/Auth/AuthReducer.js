import * as types from "./Types";

const initialState = {
  studentaccessToken: localStorage.getItem("studentaccesstoken"),
  loading: false,
  error: "",
  student: localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : {},
  facultyaccessToken: localStorage.getItem("facultyaccesstoken"),
  error: "",
  faculty: localStorage.getItem("faculty")
    ? JSON.parse(localStorage.getItem("faculty"))
    : {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.LOGIN_REQ:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        studentaccessToken: payload.studentaccessToken,
        student: payload.student,
      };
    case types.LOGIN_FAILED:
      return { ...state, loading: false, error: payload.message };
    case types.FACULTY_LOGIN_REQ:
      return { ...state, loading: true };
    case types.FACULTY_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        facultyaccessToken: payload.facultyaccessToken,
        faculty: payload.faculty,
      };
    case types.FACULTY_LOGIN_FAILED:
      return { ...state, loading: false, error: payload.message };

    default:
      return state;
  }
};
