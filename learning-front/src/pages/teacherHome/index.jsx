import AddAssignmentForm from '../../components/forms/addAssignment';
import SideBarCard from '../../components/studentCard';
import './styles.css'

const TeacherHome = () => {


    return ( 
        <>
        <div className='teacher-home-body'>
            <div className="teacher-sidebar">
                <SideBarCard name={'course'}/>
            </div>
            
            <div className="add-assignment-form-container">
                <div className='teacher-options'>
                    <button className='teacher-option-btn'>Add Assignment</button>
                    <button className='teacher-option-btn'>Add Quiz</button>
                    <button className='teacher-option-btn'>Record Attendance</button>
                    <button className='teacher-option-btn'>Submissions</button>
                </div>
                <AddAssignmentForm/>
                <button className='teacher-option-btn submit'>Submit</button>
            </div>
        </div>
            
        </>
     );
}
 
export default TeacherHome;