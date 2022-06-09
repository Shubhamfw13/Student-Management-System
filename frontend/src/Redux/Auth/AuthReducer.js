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
        studentaccessToken: payload.accessToken,
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
        facultyaccessToken: payload.accessToken,
        faculty: payload.faculty,
      };
    case types.FACULTY_LOGIN_FAILED:
      return { ...state, loading: false, error: payload.message };

    case types.FACULTY_SIGNUP_REQUEST:
      return { ...state, loading: true, isRegister: false };
    case types.FACULTY_SIGNUP_SUCCESS:
      return { ...state, loading: false, isRegister: true };
    case types.FACULTY_SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        errMsg: payload.msg,
        isRegister: false,
      };

    case types.STUDENT_SIGNUP_REQUEST:
      return { ...state, loading: true, isRegister: false };
    case types.STUDENT_SIGNUP_SUCCESS:
      return { ...state, loading: false, isRegister: true };
    case types.STUDENT_SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        errMsg: payload.msg,
        isRegister: false,
      };

    default:
      return state;
  }
};
