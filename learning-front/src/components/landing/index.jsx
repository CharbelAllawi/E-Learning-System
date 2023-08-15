import { useState } from "react";
import Calendly from "../calendly";
import NavBar from "../navbar"
import landingImg from './landing.svg'
import './styles.css'
import LoginForm from "../forms/login";
const LandingPage = () => {
    localStorage.clear()
    const [showSignIn, setShowSignIn] = useState(false)

    return ( 
        <>
            <div className="landing-container">
                <div className="landing-left">
                    <span className="landing-title">Learn without limits</span>
                    <span>Start, switch, or advance your career with our amazing courses, 
                        Professional Certificates, and degrees from world-class universities and 
                        companies.</span>
                        {
                        (!showSignIn? 
                            <>
                                <button className="landing-signin-btn" onClick={()=>setShowSignIn(true)}>Sign in</button> 
                            </>
                            : '')
                        }
                        
                </div>
                <div className="landing-right">

                    {
                        (showSignIn? <LoginForm/> : <img src={landingImg}/>)
                    }
                    
                </div>
            </div>
            
        </>
    );
}

export default LandingPage;