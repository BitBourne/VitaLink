import React from 'react';
import Button from '../../../core/ui/Components/Button'; 


const InfoCard = ({ title, subtitle, buttonText, isPrimary = false, onClickButton }) => {
  
  //  fondo de la Tarjeta
  const bgColor = isPrimary 
    ? "bg-white border border-gray-100 shadow-md p-5 rounded-xl"
    : "bg-gradient-to-r from-purple-50/50 to-cyan-50/50 border border-gray-100 shadow-sm p-5 rounded-xl";

return (
    <div className={bgColor}>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mt-1 mb-3">{subtitle}</p>
      
      {buttonText && (
        <Button 
          variant={isPrimary ? "secondary" : "primary"} 
          onClick={onClickButton} 
          className="mt-3" 
        >
          <span>{buttonText}</span>
        </Button>
      )}
    </div>
  );
};

export default InfoCard;