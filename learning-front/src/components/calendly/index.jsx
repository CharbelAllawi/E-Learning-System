import { PopupButton } from "react-calendly";

import "./styles.css"
const Calendly = ( {email} ) => {
    return ( 
        <div className="calendly-div">
            <PopupButton
        url={email}
        rootElement={document.getElementById("root")}
        text="Click here to schedule!"
      />
        </div>
     );
}
 
export default Calendly;