import logo from '../../../ELearning.svg';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import { useState } from 'react';
import { sendRequest } from '../../../core/config/request';
const LoginForm = (userType) => {
    
    const navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleDataChange = (e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }

    const loginHandler = async () => {
        try {
            const response = await sendRequest({
                method: "POST",
                route: "/api/login",
                includeHeaders: false,
                body: data,
            });
            if(response.message === "logged in successfully"){
                const user_type = response.user.user_type_id
                localStorage.setItem('token', response.user.token)
                localStorage.setItem('usertype', user_type)
                if (user_type === 2) {
                    navigate('/teacher')
                    window.location.reload(false)
                } else if (user_type === 3 || user_type === 4){
                    navigate('/home')
                    window.location.reload(false)
                } else if (user_type === 1){
                    navigate('/admin')
                    window.location.reload(false)
                }
                
            }
        } catch (error) {
            console.log(error);
        }}
    

    
    return (
        <div className='login-form-container'>
            <div className='form'>
                <div className="logo">
                    <img src={logo} className="App-logo" alt="logo" />
                    <span className='signin-form-header'>Sign in</span>
                </div>
                <div className="input-with-label">
                    <label className='signin-label'>Enter your email:</label>
                    <input
                        className='signin-input'
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={data.email}
                        onChange={handleDataChange}
                    />
                </div>
                <div className="input-with-label">
                    <label className='signin-label'>Enter your password:</label>
                    <input
                        className='signin-input'
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={data.password}
                        onChange={handleDataChange}
                    />
                </div>

                <div className="signin-btn-container">
                    <button
                        type="button"
                        className="signin-btn"
                        id="signin-btn"
                        onClick={loginHandler}
                    >Sign in</button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;