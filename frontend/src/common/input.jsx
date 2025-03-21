function Input({ type = "text", placeholder = "", value, onChange, className = "" }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`w-full p-2 border border-gray-300 rounded-md ${className}`}
        />
    );
}

export default Input;