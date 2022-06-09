import axios from "axios";
import * as types from "./Types";

const loginReq = (payload) => ({ type: types.LOGIN_REQ });
const loginSuccess = (payload) => ({ type: types.LOGIN_SUCCESS, payload });
const loginFailed = (payload) => ({ type: types.LOGIN_FAILED, payload });

const facultyloginReq = (payload) => ({ type: types.FACULTY_LOGIN_REQ });
const facultyloginSuccess = (payload) => ({
  type: types.FACULTY_LOGIN_SUCCESS,
  payload,
});
const facultyloginFailed = (payload) => ({
  type: types.FACULTY_LOGIN_FAILED,
  payload,
});

const facultySignupRequest = (payload) => ({
  type: types.FACULTY_SIGNUP_REQUEST,
  payload,
});
const facultySignupSuccess = (payload) => ({
  type: types.FACULTY_SIGNUP_SUCCESS,
  payload,
});
const facultySignupFail = (payload) => ({
  type: types.FACULTY_SIGNUP_FAILED,
  payload,
});

const studentSignupRequest = (payload) => ({
  type: types.STUDENT_SIGNUP_REQUEST,
  payload,
});
const studentSignupSuccess = (payload) => ({
  type: types.STUDENT_SIGNUP_SUCCESS,
  payload,
});
const studentSignupFail = (payload) => ({
  type: types.STUDENT_SIGNUP_FAILED,
  payload,
});

const FacultySignup =
  (username, email, password, subject, student_id) => async (dispatch) => {
    dispatch(facultySignupRequest({ msg: "loading" }));
    await axios
      .post("https://studentmanagesystemm.herokuapp.com/facultyauth/register", {
        username,
        email,
        password,
        subject,
        student_id,
      })
      .then((res) => {
        dispatch(facultySignupSuccess());
        alert("facultySignup Successfull");
      })
      .catch((err) => {
        dispatch(facultySignupFail({ msg: err.response.data }));
      });
  };

const StudentSignup =
  (username, email, password, rollnumber, role, term, contact, currentyear) =>
  async (dispatch) => {
    dispatch(studentSignupRequest({ msg: "loading" }));
    await axios
      .post("https://studentmanagesystemm.herokuapp.com/studentauth/register", {
        username,
        email,
        password,
        rollnumber,
        role,
        term,
        contact,
        currentyear,
      })
      .then((res) => {
        dispatch(studentSignupSuccess());
        alert("studentSignup Successfull");
      })
      .catch((err) => {
        dispatch(studentSignupFail({ msg: err.response.data }));
      });
  };

const LoginData = (email, password) => async (dispatch) => {
  console.log("email", email, "pass", password);
  try {
    dispatch(loginReq({ message: "Loading" }));
    await axios
      .post("https://studentmanagesystemm.herokuapp.com/studentauth/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("studentaccesstoken", res.data.token);
        localStorage.setItem("student", JSON.stringify(res.data.user));
        dispatch(
          loginSuccess({ accessToken: res.data.token, student: res.data.user })
        );
        alert("Login Success");
      })
      .catch((err) => {
        console.log(err);
        dispatch(loginFailed({ msg: err.response.data }));
        alert("Invalid Credentials");
      });
  } catch (error) {
    console.log(error.message);
  }
};

const FacultyLoginData = (email, password) => async (dispatch) => {
  console.log("email", email, "pass", password);
  try {
    dispatch(facultyloginReq({ message: "Loading" }));
    await axios
      .post("https://studentmanagesystemm.herokuapp.com/facultyauth/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("facultyaccesstoken", res.data.token);
        localStorage.setItem("faculty", JSON.stringify(res.data.user));
        dispatch(
          facultyloginSuccess({
            accessToken: res.data.token,
            faculty: res.data.user,
          })
        );
        alert("Login Success");
      })
      .catch((err) => {
        console.log(err);
        dispatch(facultyloginFailed({ msg: err.response.data }));
        alert("Invalid Credentials");
      });
  } catch (error) {
    console.log(error.message);
  }
};

const logout = () => (dispatch) => {
  localStorage.removeItem("studentaccesstoken");
  localStorage.removeItem("student");
  localStorage.removeItem("facultyaccesstoken");
  localStorage.removeItem("faculty");
  dispatch({ type: types.LOGOUT });
};

export { LoginData, logout, FacultyLoginData, FacultySignup,StudentSignup };
