
import axios from "axios";
import * as types from "./Types";

const loginReq = (payload) => ({ type: types.LOGIN_REQ });
const loginSuccess = (payload) => ({ type: types.LOGIN_SUCCESS, payload });
const loginFailed = (payload) => ({ type: types.LOGIN_FAILED, payload });

const facultyloginReq = (payload) => ({ type: types.FACULTY_LOGIN_REQ });
const facultyloginSuccess = (payload) => ({ type: types.FACULTY_LOGIN_SUCCESS, payload });
const facultyloginFailed = (payload) => ({ type: types.FACULTY_LOGIN_FAILED, payload });





const LoginData = (email, password) => async (dispatch) => {
  console.log("email",email,"pass",password)
  try {
    dispatch(loginReq({ message: "Loading" }));
    await axios
      .post("http://localhost:8001/studentauth/login", {
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
  console.log("email",email,"pass",password)
  try {
    dispatch(facultyloginReq({ message: "Loading" }));
    await axios
      .post("http://localhost:8001/facultyauth/login", {
        email,
        password,
      })  
      .then((res) => {
        localStorage.setItem("facultyaccesstoken", res.data.token);
        localStorage.setItem("faculty", JSON.stringify(res.data.user));
        dispatch(
          facultyloginSuccess({ accessToken: res.data.token, faculty: res.data.user })
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

export { LoginData, logout,FacultyLoginData };
