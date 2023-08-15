import AttendanceCard from "../../attendanceCard";
import "./styles.css"

const RecordAttendanceForm = () => {
    return ( 
        <div className="attendance-form-container">
            <AttendanceCard/>
            <AttendanceCard/>
        </div>
     );
}
 
export default RecordAttendanceForm;