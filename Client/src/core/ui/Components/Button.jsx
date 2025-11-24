import React from "react";
import { ArrowLeft, LogIn } from "lucide-react";

const iconMap = {
  arrowLeft: ArrowLeft,
  login: LogIn,
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", 
  icon,
  iconPosition = "right",
}) => {
  const IconComponent = icon ? iconMap[icon] : null;

  const baseStyles =
    "flex items-center gap-2 px-5 py-2 text-sm rounded-md transition";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white font-medium hover:opacity-90",
    secondary:
      "border border-[#5EE7DF] text-[#4C575F] px-4 py-2 hover:bg-[#5EE7DF]/10",
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {icon && iconPosition === "left" && IconComponent && (
        <IconComponent className="w-4 h-4" />
      )}

      {children}

      {icon && iconPosition === "right" && IconComponent && (
        <IconComponent className="w-4 h-4" />
      )}
    </button>
  );
};

export default Button;
