import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Button, TextField } from "@mui/material";
import { logout } from "../../Redux/Auth/AuthAction";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Students",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
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

const Faculty = () => {
  const { facultyaccesstoken, faculty } = useSelector((state) => state.auth);
  const [students, setStudents] = React.useState([]);
  const [chartData, setData] = React.useState(data);
  const [query, setQuery] = React.useState("");
  const [queryType, setQueryType] = React.useState("username");
  const [searchResult, setSearchResult] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = faculty._id;

  const getFacultyStudent = async () => {
    await axios
      .get(`https://studentmanagesystemm.herokuapp.com/user/find/${id}`)
      .then((res) => res.data)
      .then((students) => setStudents(students.student_id))
      .catch((err) => console.log(err));
  };
  console.log(students, "student");

  const searchStudent = () => {
    const student = axios
      .get(`https://studentmanagesystemm.herokuapp.com/user/search?query=${query}&type=${queryType}`)
      .then((res) => res.data)
      .then((res) => setSearchResult(res.users))
      .catch((err) => {
        console.log(err).setSearchResult([]);
      });
  };

  const createData = () => {
    const temp = {};
    for (let i = 0; i < students.length; i++) {
      if (temp[students[i]["term"]]) {
        temp[students[i]["term"]]++;
      } else {
        temp[students[i]["term"]] = 1;
      }
    }
    const labels = Object.keys(temp);
    const data = Object.values(temp);
    chartData.labels = labels.map((l) => "Term " + l);
    chartData.datasets[0].data = data;
    const colors_data = data.map((_, i) => colors[i % data.length]);
    chartData.datasets[0].borderColor = colors_data;
    chartData.datasets[0].backgroundColor = colors_data;
    setData(chartData);
  };
  const Logout = () => {
    dispatch(logout());
    navigate("/login");
  };

  React.useEffect(() => {
    if (students.length <= 0) {
      getFacultyStudent();
    } else {
      createData();
    }
  }, [students]);

  console.log(chartData);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Admin Dashboard</h1>
        <div style={{ display: "flex", width: "70%", padding: "2%" }}>
          <Button
            style={{ flex: 1, marginLeft: "2%" }}
            onClick={Logout}
            variant="contained"
          >
            LOGOUT
          </Button>
          <Button
            style={{ flex: 1, marginLeft: "2%" }}
            onClick={() => {
              navigate("/createfaculty");
            }}
            variant="contained"
          >
            Create Faculty
          </Button>
          <Button
            style={{ flex: 1, marginLeft: "2%" }}
            onClick={() => {
              navigate("/createstudent");
            }}
            variant="contained"
          >
            Create Student
          </Button>
        </div>

        <div style={{ display: "flex", marginTop: "2%" }}>
          <div></div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell align="center">Contact</TableCell>
                  <TableCell align="center">Term</TableCell>
                  <TableCell align="center">Roll Number</TableCell>
                  <TableCell align="center">Current Year</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="center">{row.contact}</TableCell>
                    <TableCell align="center">{row.term}</TableCell>
                    <TableCell align="center">{row.rollnumber}</TableCell>
                    <TableCell align="center">{row.currentyear}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer component={Paper}>
            <div
              style={{
                textAlign: "center",
                padding: 10,
                display: "flex",
              }}
            >
              <TextField
                style={{ width: "30%" }}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                id="standard-search"
                label="Search field"
                type="search student"
                variant="standard"
              />
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={queryType}
                    label="Select"
                    onChange={(e) => setQueryType(e.target.value)}
                  >
                    <MenuItem value={"username"}>Username</MenuItem>
                    <MenuItem value={"email"}>Email</MenuItem>
                    <MenuItem value={"roll"}>Roll</MenuItem>
                    <MenuItem value={"term"}>Term</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button
                style={{ width: "20%" }}
                variant="outlined"
                onClick={searchStudent}
              >
                search student
              </Button>{" "}
              <span></span>
            </div>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Student Name</StyledTableCell>
                  <StyledTableCell align="center">Contact</StyledTableCell>
                  <StyledTableCell align="center">Term</StyledTableCell>
                  <StyledTableCell align="center">Roll Number</StyledTableCell>
                  <StyledTableCell align="center">Current Year</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResult.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.contact}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.term}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.rollnumber}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.currentyear}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <hr />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "400px" }}>
            <Pie data={chartData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Faculty;
