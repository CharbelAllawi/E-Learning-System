import Calendly from "../calendly";
import NavBar from "../navbar"
import landingImg from './landing.svg'
import './styles.css'
const LandingPage = () => {
    return ( 
        <>
            <NavBar/>
            <div className="landing-container">
                <div className="landing-left">
                    <span className="landing-title">Learn without limits</span>
                    <span>Start, switch, or advance your career with our amazing courses, 
                        Professional Certificates, and degrees from world-class universities and 
                        companies.</span>
                        <button className="landing-signin-btn">Sign in</button>
                </div>
                <div className="landing-right">
                    <img src={landingImg}/>
                </div>
            </div>
            
        </>
    );
}

export default LandingPage;