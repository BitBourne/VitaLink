import React from "react";
import { Mail, Lock, User } from "lucide-react";

const iconMap = {
  mail: Mail,
  lock: Lock,
  user: User,
};

const TextInput = ({
  label,
  type = "text",
  placeholder = "",
  icon = null,
  value,
  onChange,
  name,
}) => {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="flex items-center gap-3 w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:border-[#5EE7DF] transition">
        {IconComponent && <IconComponent className="w-5 h-5 text-gray-400" />}

        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full outline-none text-gray-700"
        />
      </div>
    </div>
  );
};

export default TextInput;
