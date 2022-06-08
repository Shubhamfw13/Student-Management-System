import React from 'react'
import { useSelector } from 'react-redux'

const Faculty = () => {
  const {facultyaccesstoken,faculty} = useSelector((state)=> state.auth)


  return (

    <div>
    </div>
  )
}

export default Faculty