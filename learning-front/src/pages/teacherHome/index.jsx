import AddAssignmentForm from '../../components/forms/addAssignment';
import SideBarCard from '../../components/studentCard';
import { useState, useEffect } from 'react';
import AddQuizForm from '../../components/forms/addQuiz';
import RecordAttendanceForm from '../../components/forms/recordAttendance';
import SubmissionsForm from '../../components/forms/submissionsForm';
import { sendRequest } from "../../core/config/request";
import './styles.css'

const TeacherHome = () => {

    const [shownForm, setShownForm] = useState('assignment')
    const [teacherCourses, setTeacherCourses] = useState([])
    const [courseData, setCourseData] = useState([])

    useEffect(() => {
        const getTeacherCoursesHandler = async () => {
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: "/api/get_teacher_courses",
                });
                setTeacherCourses(response.courses)
            } catch (error) {
                console.log(error);
            }
        };
        getTeacherCoursesHandler()
    }, [])

    const chosenForm = () => {
        if (shownForm === "assignment") {
                return <AddAssignmentForm classInfo={courseData}/>
        } else if (shownForm === "quiz") {
                return <AddQuizForm classInfo={courseData}/>
        } else if (shownForm === "attendance") {
                return <RecordAttendanceForm/>
        } else if (shownForm === "submissions") {
            return <SubmissionsForm/>
        }
    };

    return ( 
        <>
            <div className='teacher-home-body'>
                <div className="teacher-sidebar">
                {teacherCourses.map(classInfo => (
                    <SideBarCard key={classInfo.id} name={classInfo.title} onCall={() => setCourseData(classInfo)}/>))
                }
                </div>
                <div className="teacher-forms-container">
                    <div className='teacher-options'>
                        <button className='teacher-option-btn' onClick={() => setShownForm('assignment')}>Add Assignment</button>
                        <button className='teacher-option-btn' onClick={() => setShownForm('quiz')}>Add Quiz</button>
                        <button className='teacher-option-btn' onClick={() => setShownForm('attendance')}>Record Attendance</button>
                        <button className='teacher-option-btn' onClick={() => setShownForm('submissions')}>Submissions</button>
                    </div>
                    <div className='mmmm'> {chosenForm()}</div>
                    
                </div>
            </div>
        </>
    );
}

export default TeacherHome;