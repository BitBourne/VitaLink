import React from 'react';
import { Heart, Briefcase } from 'lucide-react';

export default function UserCard({
  userType,
  title,
  description,
  isSelected,
  onClick,
}) {
  const isPaciente = userType === 'paciente';

  const borderColor = isPaciente ? '#FB2C36' : '#2B7FFF';
  const hoverBgColor = isPaciente ? 'hover:bg-[#FB2C36]/10' : 'hover:bg-[#2B7FFF]/10';
  const hoverBorderColor = isPaciente ? 'hover:border-[#FB2C36]' : 'hover:border-[#2B7FFF]';

  const bgColor = isSelected
    ? isPaciente
      ? 'bg-[#FB2C36]/30'
      : 'bg-[#2B7FFF]/30'
    : 'bg-white';

  const iconColor = isPaciente ? 'text-[#FB2C36]' : 'text-[#2B7FFF]';

  return (
    <div
      className={`flex flex-col items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 w-full sm:w-60 h-48 ${bgColor} ${hoverBgColor} ${hoverBorderColor}`}
      onClick={onClick}
      style={{
        borderColor: isSelected ? borderColor : '#E5E7EB',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {isPaciente ? (
        <Heart className={`w-8 h-8 mb-3 ${iconColor}`} />
      ) : (
        <Briefcase className={`w-8 h-8 mb-3 ${iconColor}`} />
      )}

      <h3 className="text-lg font-semibold text-[#4C575F] mb-2 text-center">
        {title}
      </h3>
      <p className="text-sm text-center text-[#4C575F]/70">{description}</p>
    </div>
  );
}
