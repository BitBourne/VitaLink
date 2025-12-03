import React from "react";

const StatsCard = ({ title, value, change, icon: Icon, color = "purple" }) => {
    const colorClasses = {
        purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        green: { bg: 'bg-green-100', text: 'text-green-600' },
        amber: { bg: 'bg-amber-100', text: 'text-amber-600' },
        red: { bg: 'bg-red-100', text: 'text-red-600' },
    };

    const isPositive = change && change.startsWith('+');
    const classes = colorClasses[color] || colorClasses.purple;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${classes.bg}`}>
                    <Icon className={`w-6 h-6 ${classes.text}`} />
                </div>
                {change && (
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {change}
                    </span>
                )}
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
        </div>
    );
};

export default StatsCard;
