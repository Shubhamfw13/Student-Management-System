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

  console.log(Event);

  return (
    <div style={{textAlign:"center"}} id="container">
      <input/> <span></span>
      <Button onClick={()=>{navigate("/assignment")}} variant="contained" >Assignments</Button><br /><br />
      <Button onClick={Logout} variant="contained" >LOGOUT</Button>
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
                <StyledTableCell align="center">{row.register}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
