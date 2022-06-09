import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { StudentSignup } from "../../Redux/Auth/AuthAction";
export const CreateStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    rollnumber: "",
    role: "",
    term: "",
    contact: "",
    currentyear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  // console.log(inputs)
  const handleSubmit = () => {
    dispatch(
      StudentSignup(
        inputs.username,
        inputs.email,
        inputs.password,
        inputs.rollnumber,
        inputs.role,
        inputs.term,
        inputs.contact,
        inputs.currentyear
      )
    );
  };
  console.log(inputs);

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
            name="rollnumber"
            placeholder="rollnumber"
            value={inputs.rollnumber}
          />{" "}
          <br /> <br />
          <TextField
            type="text"
            onChange={handleChange}
            name="role"
            placeholder="role"
            value={inputs.role}
          />{" "}
          <br /> <br />
          <TextField
            type="text"
            onChange={handleChange}
            name="term"
            placeholder="term"
            value={inputs.term}
          />{" "}
          <br /> <br />
          <TextField
            type="text"
            onChange={handleChange}
            name="contact"
            placeholder="contact"
            value={inputs.contact}
          />{" "}
          <br /> <br />
          <TextField
            type="text"
            onChange={handleChange}
            name="currentyear"
            placeholder="currentyear"
            value={inputs.currentyear}
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
