import SubmissionCard from "../../submissionCard";
import './styles.css'

const SubmissionsForm = () => {
    return ( 
        <div className="submission-form-container">
            <SubmissionCard/>
            <SubmissionCard/>
            <SubmissionCard/>
        </div>
    );
}
 
export default SubmissionsForm;