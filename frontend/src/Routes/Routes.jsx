
import React from 'react'
import {Routes,Route} from "react-router-dom"
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
    </Routes>
  )
}

export default AllRoutes