import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { FacultySignup } from "../../Redux/Auth/AuthAction";
export const CreateStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    subject: "",
    student_id: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  // console.log(inputs)
  const handleSubmit = () => {
    dispatch(
      FacultySignup(
        inputs.username,
        inputs.email,
        inputs.password,
        inputs.subject,
        inputs.student_id
      )
    );
  };
  console.log(inputs)

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginTop: "140px" }}>
          <h2>Register </h2>
          <TextField
            type="text"
            onChange={handleChange}
            name="username"
            placeholder="enter name"
            value={inputs.username}
          />{" "}
          <br /> <br />
          <TextField
            type="text"
            onChange={handleChange}
            name="email"
            placeholder="enter email"
            value={inputs.email}
          />{" "}
          <br /> <br />
          <TextField
            type="text"
            onChange={handleChange}
            name="password"
            placeholder="password"
            value={inputs.password}
          />{" "}
          <br /> <br />
          <TextField
            type="text"
            onChange={handleChange}
            name="subject"
            placeholder="subject"
            value={inputs.subject}
          />{" "}
          <br /> <br />
          <TextField
            type="text"
            onChange={handleChange}
            name="student_id"
            placeholder="student_id"
            value={inputs.student_id}
          />{" "}
          <br /> <br />
          <Button onClick={handleSubmit} variant="contained" color="success">
            Register
          </Button>
          <br />
          <Button
            style={{
              marginTop: "4px",
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/faculty");
            }}
          >
            Go back to Dashboard
          </Button>
        </div>
      </div>
    </>
  );
};
