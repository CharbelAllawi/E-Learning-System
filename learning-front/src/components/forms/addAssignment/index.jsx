import TextInput from '../../inputField/Index';
import './styles.css'
import { useState } from 'react';

const AddAssignmentForm = ({course_id}) => {
    const [data, setData] = useState({
        assignmentTitle:"Assignment",
        assignmentDescription:"",
        assignmentDueDate:"",
        course_id: 1
    });

    const handleDataChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return ( 
        <div className='add-assignment-form'>
            <TextInput
                name = {"assignmentDescription"}
                label={"Assignment Description:"}
                type={"text"}
                value={data.assignmentDescription}
                placeholder={"Enter assignment Description"}
                onChange={handleDataChange}
            />
            <TextInput
                name = {"assignmentDueDate"}
                label={"Assignment Due Date:"}
                type={"date"}
                value={data.assignmentDueDate}
                placeholder={"Enter assignment Due Date"}
                onChange={handleDataChange}
            />
            <button className='teacher-option-btn submit'>Submit</button>
        </div>
    );
}

export default AddAssignmentForm;