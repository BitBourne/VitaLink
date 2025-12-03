import React from 'react';
import { ArrowLeft, ArrowRight, LogIn, Mail, Lock, User, CircleStar, Circle  } from "lucide-react";

const FormInput = ({ icon, id, label, type, value, setValue }) => {
  const iconMap = {
    Mail,
    Lock,
    ArrowLeft,
    LogIn,
    ArrowRight,
    User,
    CircleStar,
  };
  const IconComponent = icon ? iconMap[icon] : null;

  const handleChange = (e) => {
    if (type === 'file') {
      // Si es un archivo, capturamos el objeto File real
      const file = e.target.files && e.target.files[0];
      setValue(file || null); 
    } else {
      // Si es texto, email, password, capturamos el valor string
      setValue(e.target.value);
    }
  };
  
  return (
    <div className="w-full">
      <div className="relative h-10 leading-10">
        {/* Icono */}
        {icon ? 
          <div className="absolute z-50 px-2.5 py-2">
            {<IconComponent className="text-gray-400 w-5" />} 
          </div>
          : null
        }

        {/* Input */}
        <input
          id={id}
          name={id}
          type={type}
          value={type === 'file' ? undefined : value}
          onChange={handleChange}
          placeholder=" " 
          className={`
            absolute peer w-full outline-none ${icon ? 'pl-10 pr-5' : 'px-5'}  rounded-lg 
            border border-gray-300 transition-all duration-100 ease-in-out z-30 
            bg-transparent text-gray-700

            /* ESTADO FOCUS */
            focus:text-gray-400 focus:border-gray-400

            /* ESTADO CON TEXTO */
            [:not(:placeholder-shown)]:text-gray-400
            [:not(:placeholder-shown)]:border-gray-400
          `}
        />

        {/* Label */}
        <label
          htmlFor={id}
          className={`
            absolute bg-white text-md text-gray-400 ${icon ? 'px-6 mx-5' : 'px-4 mx-3'}  transition-all duration-200 ease-in 
            
            /* ESTADO FOCUS */
            peer-focus:text-gray-500 peer-focus:font-bold peer-focus:h-7 peer-focus:leading-7 
            peer-focus:-translate-y-3.5 peer-focus:-translate-x-1 peer-focus:scale-80 
            peer-focus:px-3 peer-focus:z-30
            

            /* ESTADO CON TEXTO*/            
            peer-[:not(:placeholder-shown)]:text-gray-500 
            peer-[:not(:placeholder-shown)]:h-7 
            peer-[:not(:placeholder-shown)]:leading-7 
            peer-[:not(:placeholder-shown)]:-translate-y-3.5 
            peer-[:not(:placeholder-shown)]:-translate-x-1 
            peer-[:not(:placeholder-shown)]:scale-80 
            peer-[:not(:placeholder-shown)]:z-30 
            peer-[:not(:placeholder-shown)]:px-3 
            peer-[:not(:placeholder-shown)]:font-bold

            ${type === 'file' ? 'h-7 leading-7 -translate-y-3.5 -translate-x-1 scale-80 z-30 px-3 font-bold' : ''}
         `}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default FormInput;