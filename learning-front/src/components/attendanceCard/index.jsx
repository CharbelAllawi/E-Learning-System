import { useState } from "react";
import "./styles.css"

const AttendanceCard = ({info, studentInfo}) => {

    const [data, setData] = useState({
        is_present: false,
        course_id: info.id,
        student_id: studentInfo.id
    })

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: !data.is_present })
    }


    const handlePresence = () => {
        console.log(data)
    }

    return ( 
        <div className="attendance-card-div">
            <div className="attendance-card-left">
                <span>{studentInfo.name}</span>
            </div>
            
            <div className="submission-card-right">
                <label className="presence-checkbox">
                    <input
                        name="is_present"
                        type="checkbox"
                        checked={data.is_present}
                        onChange={handleDataChange}
                    />
                    Present
                </label>
                <button 
                    className="teacher-option-btn grade-card-btn"
                    onClick={handlePresence}
                >submit</button>
            </div>
        </div>
     );
}
 
export default AttendanceCard;