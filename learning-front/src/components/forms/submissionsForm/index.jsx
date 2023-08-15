import SubmissionCard from "../../submissionCard";
import { useEffect, useState } from "react";
import './styles.css'

const SubmissionsForm = ({classInfo}) => {

    const[assignments, setAssignments] = useState([])
    useEffect(() => {
        if (classInfo && classInfo.materials) {
        const filteredAssignments = Object.values(classInfo.materials).filter(item => item.title.startsWith('Assignment'))
        setAssignments(filteredAssignments);
    }
    }, [classInfo])
    

    return ( 
        <div className="submission-form-container">
        
        {(classInfo && classInfo.materials) ? assignments.map((assignment, index) => (
                <SubmissionCard key={index} info={classInfo} assignmentInfo={assignment} />
                )): "No submissions"}
        
        </div>
    );
}
 
export default SubmissionsForm;