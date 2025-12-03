import React from "react";

/**
 * Minimal Badge component for status indicators
 * 
 * @param {String} variant - Color variant: success, warning, error, info, neutral
 * @param {String} children - Badge content
 * @param {String} size - Size: sm, md
 */
const Badge = ({ variant = "neutral", children, size = "sm" }) => {
    const variants = {
        success: "bg-green-50 text-green-700 border-green-200",
        warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
        error: "bg-red-50 text-red-700 border-red-200",
        info: "bg-blue-50 text-blue-700 border-blue-200",
        neutral: "bg-gray-50 text-gray-700 border-gray-200",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
    };

    return (
        <span
            className={`
                inline-flex items-center font-medium rounded-full border
                ${variants[variant] || variants.neutral}
                ${sizes[size]}
            `}
        >
            {children}
        </span>
    );
};

export default Badge;
