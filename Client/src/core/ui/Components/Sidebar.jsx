import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, ChevronDown, ChevronRight, Menu, ChevronLeft } from "lucide-react";

const Sidebar = ({ navigation, currentPath, user, onLogout, isOpen, toggleSidebar }) => {
    // State to track expanded sections
    const [expandedSections, setExpandedSections] = useState({});

    const toggleSection = (sectionTitle) => {
        if (!isOpen) {
            toggleSidebar(); // Auto-expand if clicking a section while collapsed
            setExpandedSections(prev => ({ ...prev, [sectionTitle]: true }));
        } else {
            setExpandedSections(prev => ({
                ...prev,
                [sectionTitle]: !prev[sectionTitle]
            }));
        }
    };

    return (
        <aside
            className={`fixed top-0 left-0 h-screen bg-white/80 backdrop-blur-xl border-r border-gray-100 z-50 flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : 'w-20'
                }`}
        >
            {/* Centered Toggle Button */}
            <button
                onClick={toggleSidebar}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center cursor-pointer shadow-sm text-gray-400 hover:text-purple-600 hover:border-purple-200 transition-all z-50"
                title={isOpen ? "Colapsar menú" : "Expandir menú"}
            >
                {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>

            {/* Logo Section */}
            <div className={`h-20 flex items-center border-b border-gray-50 transition-all duration-300 ease-in-out ${isOpen ? 'px-8' : 'justify-center'}`}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0">
                        <span className="text-white font-bold text-lg">V</span>
                    </div>
                    <span className={`text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent whitespace-nowrap transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 w-auto delay-75' : 'opacity-0 w-0 overflow-hidden'
                        }`}>
                        VitaLink
                    </span>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 py-6 space-y-6 overflow-y-auto custom-scrollbar overflow-x-hidden">
                {navigation.map((group, index) => (
                    <div key={index} className="px-4">
                        {group.title && isOpen && (
                            <p className="px-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 animate-fade-in">
                                {group.title}
                            </p>
                        )}

                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = currentPath === item.href;
                                const hasSubItems = item.subItems && item.subItems.length > 0;
                                const isExpanded = expandedSections[item.name];
                                const isChildActive = hasSubItems && item.subItems.some(sub => sub.href === currentPath);

                                return (
                                    <div key={item.name}>
                                        {hasSubItems ? (
                                            // Collapsible Parent Item
                                            <button
                                                onClick={() => toggleSection(item.name)}
                                                className={`w-full group relative flex items-center ${isOpen ? 'justify-between px-4' : 'justify-center px-2'} py-3 rounded-xl transition-all duration-300 ${isExpanded || isChildActive
                                                    ? "bg-gray-50 text-gray-900"
                                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}
                                                title={!isOpen ? item.name : ''}
                                            >
                                                <div className={`flex items-center gap-3 ${!isOpen && 'justify-center w-full'}`}>
                                                    <item.icon
                                                        size={20}
                                                        className={`transition-colors duration-300 ease-in-out shrink-0 ${isExpanded || isChildActive ? "text-[#B490CA]" : "text-gray-400 group-hover:text-gray-600"
                                                            }`}
                                                        strokeWidth={isExpanded || isChildActive ? 2.5 : 2}
                                                    />
                                                    <span className={`font-medium text-sm tracking-wide whitespace-nowrap transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 w-auto delay-75' : 'opacity-0 w-0 overflow-hidden absolute'
                                                        }`}>
                                                        {item.name}
                                                    </span>
                                                </div>
                                                {isOpen && (
                                                    isExpanded ? (
                                                        <ChevronDown size={16} className="text-gray-400 shrink-0" />
                                                    ) : (
                                                        <ChevronRight size={16} className="text-gray-400 shrink-0" />
                                                    )
                                                )}
                                            </button>
                                        ) : (
                                            // Regular Link Item
                                            <Link
                                                to={item.href}
                                                className={`group relative flex items-center gap-3 ${isOpen ? 'px-4' : 'justify-center px-2'} py-3 rounded-xl transition-all duration-300 ease-in-out ${isActive
                                                    ? "bg-purple-50 text-purple-700 font-semibold" // Subtle active state
                                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}
                                                title={!isOpen ? item.name : ''}
                                            >
                                                <item.icon
                                                    size={20}
                                                    className={`transition-colors duration-300 ease-in-out shrink-0 ${isActive ? "text-purple-600" : "text-gray-400 group-hover:text-gray-600"
                                                        }`}
                                                    strokeWidth={isActive ? 2.5 : 2}
                                                />
                                                <span className={`font-medium text-sm tracking-wide whitespace-nowrap transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 w-auto delay-75' : 'opacity-0 w-0 overflow-hidden absolute'
                                                    }`}>
                                                    {item.name}
                                                </span>

                                                {isActive && isOpen && (
                                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-purple-500" />
                                                )}
                                            </Link>
                                        )}

                                        {/* Render Sub-items if expanded */}
                                        {hasSubItems && isExpanded && isOpen && (
                                            <div className="mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1 animate-slide-down">
                                                {item.subItems.map((subItem) => {
                                                    const isSubActive = currentPath === subItem.href;
                                                    return (
                                                        <Link
                                                            key={subItem.name}
                                                            to={subItem.href}
                                                            className={`block px-4 py-2 rounded-lg text-sm transition-all duration-200 ${isSubActive
                                                                ? "text-purple-600 font-medium bg-purple-50/50"
                                                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                                                }`}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Profile Section */}
            <div className={`border-t border-gray-50 transition-all duration-300 ease-in-out ${isOpen ? 'p-4' : 'p-2'}`}>
                <div className={`relative flex items-center gap-3 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white transition-all duration-300 ease-in-out ${isOpen ? 'p-3' : 'p-2 justify-center'}`}>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold shadow-inner shrink-0">
                        {user?.nombre?.charAt(0) || "A"}
                    </div>

                    <div className={`flex-1 min-w-0 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 w-auto delay-75' : 'opacity-0 w-0 overflow-hidden absolute'}`}>
                        <p className="text-sm font-bold text-gray-900 truncate">
                            {user?.nombre || "Admin"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user?.email || "admin@vitalink.com"}
                        </p>
                    </div>

                    {isOpen && (
                        <button
                            onClick={onLogout}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Cerrar Sesión"
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
