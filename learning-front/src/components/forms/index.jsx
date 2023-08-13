import logo from '../../ELearning.svg';
import { useNavigate } from 'react-router-dom';
import "./styles.css";
import { useState } from 'react';
import { sendRequest } from '../../core/config/request';
const LoginForm = () => {
    
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
                localStorage.setItem("token", response.user.token)
                navigate('/home')
            }
        } catch (error) {
            console.log(error);
        }}
    
  
    
    return (
        <div className='login-form-container'>
            <div className='form'>
                <div className="logo">
                    <img src={logo} className="App-logo" alt="logo" />
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