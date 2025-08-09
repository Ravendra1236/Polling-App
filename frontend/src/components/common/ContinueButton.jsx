import React from "react";

const ContinueButton = ({ 
  onClick, 
  disabled = false, 
  children = "Continue",
  className = "",
  selectedRole = true 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || !selectedRole}
      className={`py-[17px] rounded-[34px] px-[70px] font-medium transition-colors ${
        selectedRole && !disabled
          ? "bg-gradient-to-r from-[#8F64E1] to-[#1D68BD] text-white"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default ContinueButton;
