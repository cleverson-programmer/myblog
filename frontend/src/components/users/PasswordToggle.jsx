import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordToggle = ({ value, onChange, placeholder, ...props }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type={visible ? "text" : "password"} // Alterna entre "text" e "password"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={toggleVisibility}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {visible ? <FaEyeSlash /> : <FaEye />} {/* Alterna entre os ícones */}
      </button>
    </div>
  );
};

export default PasswordToggle;