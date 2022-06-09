import React from 'react'
import { useSelector } from 'react-redux'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios"
ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
]

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Students',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Faculty = () => {
  const {facultyaccesstoken,faculty} = useSelector((state)=> state.auth)
  const [students,setStudents] = React.useState([])
  const [chartData,setData] = React.useState(data)
  

  const getAllStudent = async () => {
    const student = await axios.get("http://localhost:8001/user/find").then(res=>res.data).then(student=>setStudents(student)).catch(err=>console.log(err))
  }

  const createData = () => {
    const temp = {}
    for(let i = 0; i < students.length; i++){
      if(temp[students[i]["term"]]){
        temp[students[i]["term"]]++
      }else {
        temp[students[i]["term"]] = 1
      }
    }
    const labels = Object.keys(temp)
    const data = Object.values(temp)
    chartData.labels = labels.map(l=>"Term " + l)
    chartData.datasets[0].data =  data
    const colors_data = data.map((_,i)=>colors[i % data.length])
    chartData.datasets[0].borderColor = colors_data
    chartData.datasets[0].backgroundColor = colors_data
    setData(chartData)
  }

  React.useEffect(()=>{
   if(students.length <= 0){
     getAllStudent()
   } else {
     createData()
   }
  },[students])

  console.log(chartData)
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
      <div style={{width:"400px"}}>
      <Pie data={chartData} />
      </div>
    </div>
  )
}

export default Faculty