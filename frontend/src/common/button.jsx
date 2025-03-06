function Button({ children, type = "button", onClick, className = "" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`py-2 px-4 rounded-md text-white ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;  