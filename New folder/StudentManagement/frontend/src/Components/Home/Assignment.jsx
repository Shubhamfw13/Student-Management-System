import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { GetAssignmentData } from '../../Redux/Events/action';
import axios from "axios"

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Assignment() {
  const {Assignment} = useSelector((state)=>state.event)
  const {student} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

  React.useEffect(()=>{
   dispatch(GetAssignmentData() )
  },[])

  const handleMarkComplete =  (assignment_id)=>{
     const res =  axios.patch("http://localhost:8001/assignment/mark-complete",{
       assignment_id,
       student_id: student._id
     }).then(()=> dispatch(GetAssignmentData() ))
  }
  return (
    <TableContainer  component={Paper}>
      <Table sx={{ minWidth: 700 }}  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Assignment Name</StyledTableCell>
            <StyledTableCell align="center">Created At</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
            <StyledTableCell align="center">Assignment Details</StyledTableCell>
            <StyledTableCell align="center">Assignment Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Assignment.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row.assignmentname}
              </StyledTableCell>
              <StyledTableCell align="center">{row.createdAt}</StyledTableCell>
              <StyledTableCell align="center">{row.start}</StyledTableCell>
              <StyledTableCell align="center">{row.end}</StyledTableCell>
              <StyledTableCell align="center">{row.assignmentdetails}</StyledTableCell>
              <StyledTableCell align="center">{row.student_id.find((s)=>s._id == student._id) ?  "Completed" : <Button onClick={()=>handleMarkComplete(row._id)}>Mark Complete</Button>}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
