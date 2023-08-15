import "./styles.css"

const TextInput = ({ label, name, type, placeholder, value, onChange }) => {
    return (
        <div className="base-input-field">
            <label>{label}</label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="input transition">
            </input>
        </div>
    );
}

export default TextInput;