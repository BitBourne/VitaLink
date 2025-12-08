import React from "react";
import { ChevronRight, PanelLeftClose, PanelLeftOpen } from "lucide-react";

const Header = ({ title, breadcrumbs, user, toggleSidebar, isSidebarOpen }) => {
    return (
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40 transition-all duration-300">
            <div className="flex items-center gap-4">
                {/* Breadcrumb / Title */}
                <div className="flex items-center gap-2">
                    {breadcrumbs && breadcrumbs.length > 0 ? (
                        <div className="flex items-center gap-2 text-sm">
                            {breadcrumbs.map((crumb, idx) => (
                                <React.Fragment key={idx}>
                                    <span className={idx === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "text-gray-500"}>
                                        {crumb}
                                    </span>
                                    {idx < breadcrumbs.length - 1 && (
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    ) : (
                        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                    )}
                </div>
            </div>

            {/* User Profile (Optional) */}
            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-gray-900">{user?.nombre || user?.name}</p>
                    <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B490CA] to-[#5EE7DF] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user?.nombre?.charAt(0) || user?.name?.charAt(0) || "A"}
                </div>
            </div>
        </header>
    );
};

export default Header;
