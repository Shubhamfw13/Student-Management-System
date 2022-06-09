import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { GetEventData } from "../../Redux/Events/action";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Auth/AuthAction";
import axios from "axios";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


const Home = () => {
  const { studentaccessToken, student } = useSelector((state) => state.auth);
  const { Event } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate =  useNavigate()
  const [loading,setLoading] = React.useState(false)
  const [err,setErr] = React.useState("")
  const [query,setQuery] = React.useState("")
  const [queryType,setQueryType] = React.useState("username")

  React.useEffect(() => {
    dispatch(GetEventData());
  }, []);

  const Logout = ()=>{
    dispatch(logout())
    navigate("/login")
  }
  React.useEffect(()=>{
    if(!studentaccessToken){
      navigate("/login")
    }
  },[studentaccessToken])

  const handleEventRegister = async (event_id) => {
    setLoading(true)
    const res = await axios.post("http://localhost:8001/event/register",{
      event_id,
      student_id: student._id
    }).then(res=>res.data).then(()=>dispatch(GetEventData())).catch(error=>setErr(error.response.data)).finally(()=>setLoading(false))
  }

  const searchStudent = () =>{
    const student = axios.get(`http://localhost:8001/user/search?query=${query}&type=${queryType}`).then(res=>res.data).then(res=>console.log(res)).catch((err)=>console.log(err))
  }


  return (
    <div style={{textAlign:"center"}} id="container">
      <div style={{padding: 10}}><input onChange={(e)=>setQuery(e.target.value)} value={query}/>
      <div style={{display:"flex", justifyContent:"center"}}>
       <p> search student by  </p>
       <select value={queryType} onChange={(e)=>setQueryType(e.target.value)}>
         <option value="username">username</option>
         <option value="email">email</option>
         <option value="roll">Roll number</option>
         <option value="term">term</option>
       </select>
       </div>
       <Button onClick={searchStudent}>search student</Button> <span></span>
      </div>
      <Button onClick={()=>{navigate("/assignment")}} variant="contained" >Assignments</Button><br /><br />
      <Button onClick={Logout} variant="contained" >LOGOUT</Button>
      {err && <p style={{textAlign:"center"}}>{err}</p>}
      <TableContainer component={Paper}><br />
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Event Name</StyledTableCell>
              <StyledTableCell align="center">Event Info</StyledTableCell>
              <StyledTableCell align="center">Starts From</StyledTableCell>
              <StyledTableCell align="center">End On</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Register</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Event.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.eventname}
                </StyledTableCell  >
                <StyledTableCell align="center">{row.eventdetails}</StyledTableCell>
                <StyledTableCell align="center">{row.start}</StyledTableCell>
                <StyledTableCell align="center">{row.end}</StyledTableCell>
                <StyledTableCell align="center">{row.eventstatus}</StyledTableCell>
                <StyledTableCell align="center" >{row.student_id.find((s)=>s._id == student._id) ? "Your are already registered" : <Button onClick={()=>handleEventRegister(row._id)}>{loading? "loading": "Register Now"}</Button>}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
