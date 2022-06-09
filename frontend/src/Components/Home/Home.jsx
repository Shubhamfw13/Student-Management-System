import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [err, setErr] = React.useState("");
  const [filterBy, setFilterBy] = React.useState("");


  React.useEffect(() => {
    dispatch(GetEventData());
  }, []);

  const Logout = () => {
    dispatch(logout());
    navigate("/login");
  };
  React.useEffect(() => {
    if (!studentaccessToken) {
      navigate("/login");
    }
  }, [studentaccessToken]);

  const handleEventRegister = async (event_id) => {
    setLoading(true);
    const res = await axios
      .post("https://studentmanagesystemm.herokuapp.com/event/register", {
        event_id,
        student_id: student._id,
      })
      .then((res) => res.data)
      .then(() => dispatch(GetEventData()))
      .catch((error) => setErr(error.response.data))
      .finally(() => setLoading(false));
  };



  return (
    <div style={{ textAlign: "center", marginTop: "2%" }} id="container">
      <h1>Student's Dashboard</h1>
      <Button
        onClick={() => {
          navigate("/assignment");
        }}
        variant="contained"
      >
        Assignments
      </Button>
      <br />
      <br />
      <Button onClick={Logout} variant="contained">
        LOGOUT
      </Button>
      {err && <p style={{ textAlign: "center" }}>{err}</p>}
      <p>Filter by</p>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Filter By"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <MenuItem value={"upcoming"}>Upcoming</MenuItem>
            <MenuItem value={"ongoing"}>Ongoing</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
            <MenuItem value={""}>All</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <br />
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
            {Event.filter((row) =>
              row.eventstatus.find((c) => c.toLowerCase().includes(filterBy))
            ).map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.eventname}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.eventdetails}
                </StyledTableCell>
                <StyledTableCell align="center">{row.start}</StyledTableCell>
                <StyledTableCell align="center">{row.end}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.eventstatus}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.student_id.find((s) => s._id == student._id) ? (
                    "Your are already registered"
                  ) : (
                    <Button onClick={() => handleEventRegister(row._id)}>
                      {loading ? "loading" : "Register Now"}
                    </Button>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
