import AddAssignmentForm from '../../components/forms/addAssignment';
import SideBarCard from '../../components/studentCard';
import { useState } from 'react';
import AddQuizForm from '../../components/forms/addQuiz';
import RecordAttendanceForm from '../../components/forms/recordAttendance';
import SubmissionsForm from '../../components/forms/aubmissionsForm';
import './styles.css'

const TeacherHome = () => {

    const [shownForm, setShownForm] = useState('assignment')

    const chosenForm = () => {
        if (shownForm === "assignment") {
                return <AddAssignmentForm />
        } else if (shownForm === "quiz") {
                return <AddQuizForm/>
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
                    <SideBarCard name={'course'}/>
                </div>
                <div className="add-assignment-form-container">
                    <div className='teacher-options'>
                        <button className='teacher-option-btn' onClick={() => setShownForm('assignment')}>Add Assignment</button>
                        <button className='teacher-option-btn' onClick={() => setShownForm('quiz')}>Add Quiz</button>
                        <button className='teacher-option-btn' onClick={() => setShownForm('attendance')}>Record Attendance</button>
                        <button className='teacher-option-btn' onClick={() => setShownForm('submissions')}>Submissions</button>
                    </div>
                    {chosenForm()}
                </div>
            </div>
        </>
    );
}

export default TeacherHome;