import React from "react";
import { ArrowLeft, ArrowRight, LogIn } from "lucide-react";

const iconMap = {
  arrowLeft: ArrowLeft,
  login: LogIn,
  arrowRight: ArrowRight,
};

const Button = ({
  icon,
  iconPosition,
  type = "button",
  variant = "primary", 
  children,
  text,
  onClick
}) => {

  const IconComponent = icon ? iconMap[icon] : null;

  const baseStyles =
    "flex items-center justify-center gap-2 px-5 py-2 text-sm font-bold rounded-md transition";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#B490CA] to-[#5EE7DF] text-white font-medium hover:opacity-90",
    secondary:
      "bg-white pr-4 pl-3 py-2 hover:bg-main-gradient hover:text-white group",
  };

  return (
    <div className="p-0.5 bg-main-gradient rounded-lg inline-block">
      <button 
        type={type} 
        onClick={onClick} 
        className={`${baseStyles} ${variants[variant]}`}
      >
        {icon && iconPosition === "left" && IconComponent && (
          <IconComponent className="w-4 h-4 text-secondary group-hover:text-white" />
        )}

        
        {variant === "primary" ? (
          <span>{text}{children}</span>
        ) : (
        <span className="bg-main-gradient text-transparent bg-clip-text group-hover:text-white">
          {text}
          {children}
        </span>
        )}

        {icon && iconPosition === "right" && IconComponent && (
          <IconComponent className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default Button;
