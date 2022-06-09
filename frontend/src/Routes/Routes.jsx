
import React from 'react'
import {Routes,Route} from "react-router-dom"
import { CreateFaculty } from '../Components/Admin/CreateFaculty'
import { CreateStudent } from '../Components/Admin/CreateStudent'
import Faculty from '../Components/Admin/Faculty'
import Assignment from '../Components/Home/Assignment'

import Home from '../Components/Home/Home'
import FacultyLogin from '../Components/Login/FacultyLogin'
import LoginPage from '../Components/Login/LoginPage'
import StudentLogin from '../Components/Login/StudentLogin'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/studentlogin' element={<StudentLogin/>} />
        <Route path='/facultylogin' element={<FacultyLogin/>} />
        <Route path='/faculty' element={<Faculty/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/assignment' element={<Assignment/>} />
        <Route path='/createfaculty' element={<CreateFaculty/>} />
        <Route path='createstudent' element={<CreateStudent/>} />
    </Routes>
  )
}

export default AllRoutes