import AddCourse from "../../components/forms/addCourse";
import SideBarCard from "../../components/studentCard";
import { sendRequest } from "../../core/config/request";
import { useState, useEffect } from "react";
import "./styles.css"
import ClassProgress from "../../components/progressBar";
import DeleteUser from "../../components/deleteUser";



const AdminPage = () => {

    const [adminCourses, setAdminCourses] = useState([])
    const [showAddCourseFrom, setShowAddCourseFrom] = useState(false)
    const [showDeleteUserForm, setShowDeleteUserForm] = useState(false)
    const [showCourseProgress, setShowCourseProgress] = useState(false)
    const [courseData, setCourseData] = useState()

    useEffect(() => {
        const getAdminCoursesHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: "/api/get_teacher_courses",
                });
                setAdminCourses(response.courses)
            } catch (error) {
                console.log(error);
            }
        };
        getAdminCoursesHandler()
    }, [])
    return ( 
        <div>
            <>
            <div className='admin-home-body'>
                <div className='admin-course-cards-container'>
                <button className='teacher-option-btn'
                    onClick={() =>{ 
                        setShowCourseProgress(false)
                        setShowDeleteUserForm(false)
                        setShowAddCourseFrom(true)
                    }}
                    >&#43; Add Course</button>
                <button className='teacher-option-btn delete-btn'
                    onClick={() => {
                        setShowAddCourseFrom(false)
                        setShowCourseProgress(false)
                        setShowDeleteUserForm(true)

                    }}
                    >&#128465; Delete User Account</button>
                {adminCourses.map(classInfo => (
                    <SideBarCard key={classInfo.id} name={classInfo.title} 
                        onCall={() => 
                        {
                        setCourseData(classInfo)
                        setShowAddCourseFrom(false)
                        setShowDeleteUserForm(false)
                        setShowCourseProgress(true)
                        }}
                        />))
                }
                
                </div>
                <div className='admin-right-panel'>
                    {showAddCourseFrom? <AddCourse/> : ''}
                    {showCourseProgress? <ClassProgress classInfo={courseData}/>:""}
                    {showDeleteUserForm? <DeleteUser/> : ""}
                </div>
                
            </div>
        </>
        </div>
    );
}

export default AdminPage;