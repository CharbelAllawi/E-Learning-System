import AttendanceCard from "../../attendanceCard";
import "./styles.css"

const RecordAttendanceForm = ({classInfo}) => {

    return ( 
        <div className="attendance-form-container">
            {classInfo? classInfo.enrolledStudents.map(student => (
                <AttendanceCard key={student.id} info={classInfo} studentInfo={student} />
            )): "No enrolled Students"}
        </div>
    );
}
 
export default RecordAttendanceForm;