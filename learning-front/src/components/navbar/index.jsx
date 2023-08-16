import logo from '../../ELearning.svg'
import { useState, useEffect } from "react"
import "./styles.css"
import { useEnrollmentState } from '../../global/context'
import { useLocation } from "react-router-dom"
const NavBar = () => {

    const { isEnrolled, setIsEnrolled } = useEnrollmentState();
    const [showButtons, setShowButtons] = useState(true);
    const location = useLocation();
    useEffect(() => {
        if (location.pathname == "/" || (localStorage.getItem('usertype') != 4)) {
            setShowButtons(false);
        } else {
            setShowButtons(true);
        }
      }, [location.pathname]);

    return ( 
        <div className='navbar'>
            <img src={logo} className="App-logo" alt="logo" />
            <div className='navbar-btns-div'>
            {showButtons && (
                <>
                <button className={isEnrolled ? "navbar-btn active" : "navbar-btn"} onClick={()=> setIsEnrolled(true)}>Enrolled</button>
                <button className={isEnrolled ? "navbar-btn" : "navbar-btn active"} onClick={()=> setIsEnrolled(false)}>Browse</button>
                </>
            )}
            </div>
        </div>
    );
}

export default NavBar;