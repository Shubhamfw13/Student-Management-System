import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../../Redux/Auth/AuthAction";
import Button  from "@mui/material/Button";

export default function StudentLogin() {
  const { studentaccessToken,student } = useSelector((state) => state.auth);
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("token", studentaccessToken);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit =()=>{
      dispatch(LoginData(input.email,input.password))
  }
  console.log(studentaccessToken,"access",student)


  React.useEffect(()=>{
    console.log(studentaccessToken, "from useffect")
      if(studentaccessToken){
        navigate("/")
      }
  },[studentaccessToken])

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
        <h1>Student Login</h1>
        <TextField
          id="outlined-textarea"
          onChange={(e)=>{handleChange(e)}}
          label="Email"
          name="email"
          placeholder="Email"
          multiline
        />
        <TextField
          id="outlined-textarea"
          onChange={(e)=>{handleChange(e)}}
          label="Password"
          name="password"
          placeholder="Password"
          multiline
        />
        <br />
        <Button onClick={handleSubmit} variant="outlined" >Login</Button>
      </div>
    </Box>
  );
}
