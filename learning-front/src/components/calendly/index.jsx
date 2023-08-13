import { PopupButton } from "react-calendly";

const Calendly = ({ email }) => {
  return (
    <div className="calendly-div">
      <PopupButton className="calendly-button"
        url={email}
        rootElement={document.getElementById("root")}
        text="Click here to schedule!"
      />
    </div>
  );
}

export default Calendly;