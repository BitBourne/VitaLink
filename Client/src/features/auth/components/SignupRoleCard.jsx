import React from 'react';
import { User, Dock, Plus } from "lucide-react";

const UserCard = ({
  role,
  icon,
  title,
  description,
  value,
  setValue
}) => {

  const iconMap = {
    User: User,
    Dock: Dock,
    Plus: Plus,
  };

  const IconComponent = icon ? iconMap[icon] : null;
  
  return (
    <div
      className={`flex items-center gap-5 bg-main-gradient-10 w-full px-5 py-6  rounded-xl shadow-md cursor-pointer relative`}
      >
      <div 
        id={role} className='absolute inset-0'
        onClick={e => setValue(e.target.id)}
      ></div>

      {icon ? (
        <div
        className={`p-4 rounded-full bg-white/70`}
        >
          {<IconComponent className="text-gray-400 w-8 h-8" />}
        </div>
      ) : null}

      <div>
        <h3 className="text-lg font-semibold text-[#4C575F] mb-2 text-center">
          {title}
        </h3>
        <p className="text-sm text-center text-[#4C575F]/70">{description}</p>
      </div>
    </div>
  );
}

export default UserCard;