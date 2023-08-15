import { useState } from "react";
import Calendly from "../calendly";
import NavBar from "../navbar"
import landingImg from './landing.svg'
import './styles.css'
import LoginForm from "../forms/login";
const LandingPage = () => {
    localStorage.clear()
    const [showSignIn, setShowSignIn] = useState(false)
    const [usertype, setUSerType] = useState('')

    const handleSignInUserType = (usertype) => {
        setUSerType(usertype)
        setShowSignIn(true)
    }
    return ( 
        <>
            {/* <NavBar/> */}
            <div className="landing-container">
                <div className="landing-left">
                    <span className="landing-title">Learn without limits</span>
                    <span>Start, switch, or advance your career with our amazing courses, 
                        Professional Certificates, and degrees from world-class universities and 
                        companies.</span>
                        {
                        (!showSignIn? 
                            <>
                                <button className="landing-signin-btn" onClick={()=>handleSignInUserType('Teacher')}>Sign in As Teacher</button> 
                                <button className="landing-signin-btn" onClick={()=>handleSignInUserType('Student')}>Sign in As Student</button> 
                                <button className="landing-signin-btn" onClick={()=>handleSignInUserType('Parent')}>Sign in As Parent</button> 
                            </>
                            : '')
                        }
                        
                </div>
                <div className="landing-right">

                    {
                        (showSignIn? <LoginForm userType={usertype}/> : <img src={landingImg}/>)
                    }
                    
                </div>
            </div>
            
        </>
    );
}

export default LandingPage;