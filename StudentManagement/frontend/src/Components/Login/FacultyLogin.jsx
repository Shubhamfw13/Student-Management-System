import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FacultyLoginData } from "../../Redux/Auth/AuthAction";
import Button from "@mui/material/Button";

const FacultyLogin = () => {
  const { facultyaccessToken, faculty } = useSelector((state) => state.auth);
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(FacultyLoginData(input.email, input.password));
  };
  console.log(facultyaccessToken, "facultyaccess", faculty.role, "faculty");

  React.useEffect(() => {
    if (facultyaccessToken && faculty.role == "Faculty") {
      navigate("/faculty");
    }
  }, [facultyaccessToken, faculty]);

  return (
    <Box
      textAlign={"center"}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <h1>Faculty Login</h1>
        <TextField
          id="outlined-textarea"
          onChange={(e) => {
            handleChange(e);
          }}
          label="Email"
          name="email"
          placeholder="Email"
          multiline
        />
        <TextField
          id="outlined-textarea"
          onChange={(e) => {
            handleChange(e);
          }}
          label="Password"
          name="password"
          placeholder="Password"
          multiline
        />
        <br />
        <Button onClick={handleSubmit} variant="outlined">
          Login
        </Button>
      </div>
    </Box>
  );
};

export default FacultyLogin;
