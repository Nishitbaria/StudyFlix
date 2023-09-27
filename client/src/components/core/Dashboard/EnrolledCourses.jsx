import React , {useState} from 'react'
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserEnrolledCourses } from "../../../servicess/operations/profileAPI"



export default function EnrolledCourses() {


const {token} = useSelector((state) => state.auth) 
const navigate = useNavigate()
const [enrolledCourses, setEnrolledCourses] = useState(null)



    return (
    <div>
    
    

<h1 className='text-center text-white'>Enrolled Courses</h1>   



    </div>
  )
}
