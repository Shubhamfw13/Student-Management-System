import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()
  return (
    <div style={{textAlign:"center"}} >
      <Button onClick={()=> {navigate("/facultylogin")}} variant="outlined">Login As Faculty</Button>
      <Button onClick={()=> {navigate("/studentlogin")}} variant="outlined">Login As Student</Button>
    </div>
  );
};

export default LoginPage;
