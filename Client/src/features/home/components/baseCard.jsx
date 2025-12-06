import React from "react";
import { Calendar } from "lucide-react";

const colorVariants = {
    purple: {
        bg: "bg-purple-600/20",
        text: "text-purple-600"
    },
    blue: {
        bg: "bg-blue-600/20",
        text: "text-blue-600"
    },
    green: {
        bg: "bg-green-600/20",
        text: "text-green-600"
    },
    teal: {
        bg: "bg-teal-600/20",
        text: "text-teal-600"
    },
};

const BaseCard = ({ color = "blue", title, subtitle }) => { // 
    const theme = colorVariants[color] || colorVariants.blue;

    return (
        <div className="flex-1 flex flex-col gap-2 px-10 py-5 justify-center items-center bg-white rounded-xl shadow-md">
            <div className={`grid place-items-center ${theme.bg} rounded-full w-20 h-20`}>
                <Calendar className={theme.text} /> 
            </div>
            
            <p className={`text-3xl ${theme.text} font-bold`}>
                {title || "Título"}
            </p>
            <p className="text-gray-600">
                {subtitle || "Subtítulo"}
            </p>
        </div>
    );
};

export default BaseCard;