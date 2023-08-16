import TextInput from "../inputField/Index";
import { useState } from "react";
import { sendRequest } from "../../core/config/request";
import "./styles.css"

const DeleteUser = () => {

    const [data, setData] = useState({
        email: "",
    })

    const handleDataChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const deleteUserHandler = async () => {
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/deleteUserByEmail",
                body: data,
            });
            if(response.message === "User deleted successfully"){
                setData({
                    email: "",
                })
                const delete_user_btn = document.getElementById("delete-user-btn")
                delete_user_btn.innerHTML = 'Deleted'
                setTimeout(() => { 
                    delete_user_btn.innerHTML = 'Delete' 
                }, 3000)
            }
        } catch (error) {
            console.log(error);
        }}
    
    return ( 
        <div className="delete-user-form">
            <TextInput
            name={"email"}
            label={"Enter the user's E-mail:"}
            placeholder={"Enter the user's E-mail"}
            type={"text"}
            value={data.email}
            onChange={handleDataChange}
            />

            <button 
            id="delete-user-btn"
            className="teacher-option-btn delete-btn form-delete-btn"
            onClick={deleteUserHandler}
            >Delete</button>
        </div>
    );
}

export default DeleteUser
