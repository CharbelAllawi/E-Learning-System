import { PopupButton } from "react-calendly";
import { PopupWidget } from "react-calendly";
const Calendly = () => {
    return ( 
        <div>
        
            
            <PopupButton
        url="https://calendly.com/jaafar-mortada-11"
        rootElement={document.getElementById("root")}
        text="Click here to schedule!"
      />
        </div>
     );
}
 
export default Calendly;