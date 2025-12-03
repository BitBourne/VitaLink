import React, { useState } from "react";
import { MoreVertical, Search } from "lucide-react";

/**
 * Ultra-clean DataTable component following AntiGravity design system
 * 
 * @param {Array} columns - Array of column definitions: { key, label, render?, sortable? }
 * @param {Array} data - Array of data objects
 * @param {Function} onRowAction - Callback for row actions (edit, delete, etc)
 * @param {Array} actions - Array of action definitions: { label, onClick, variant? }
 * @param {String} searchPlaceholder - Placeholder for search input
 * @param {Boolean} showSearch - Whether to show search bar
 */
const DataTable = ({
    columns = [],
    data = [],
    onRowAction,
    actions = [],
    searchPlaceholder = "Buscar...",
    showSearch = true,
    emptyMessage = "No hay datos disponibles"
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [openActionMenu, setOpenActionMenu] = useState(null);

    // Simple client-side search
    const filteredData = data.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            {showSearch && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                    />
                </div>
            )}

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {/* Header */}
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-200">
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {column.label}
                                    </th>
                                ))}
                                {actions.length > 0 && (
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                )}
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="divide-y divide-gray-200">
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                                        className="px-6 py-12 text-center text-sm text-gray-500"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((row, rowIndex) => (
                                    <tr
                                        key={rowIndex}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className="px-6 py-4 text-sm text-gray-900"
                                            >
                                                {column.render
                                                    ? column.render(row)
                                                    : row[column.key]}
                                            </td>
                                        ))}

                                        {/* Actions Menu */}
                                        {actions.length > 0 && (
                                            <td className="px-6 py-4 text-right">
                                                <div className="relative inline-block">
                                                    <button
                                                        onClick={() =>
                                                            setOpenActionMenu(
                                                                openActionMenu === rowIndex ? null : rowIndex
                                                            )
                                                        }
                                                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                                    >
                                                        <MoreVertical className="w-4 h-4 text-gray-500" />
                                                    </button>

                                                    {openActionMenu === rowIndex && (
                                                        <>
                                                            <div
                                                                className="fixed inset-0 z-10"
                                                                onClick={() => setOpenActionMenu(null)}
                                                            />
                                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                                                                {actions.map((action, actionIndex) => (
                                                                    <button
                                                                        key={actionIndex}
                                                                        onClick={() => {
                                                                            action.onClick(row);
                                                                            setOpenActionMenu(null);
                                                                        }}
                                                                        className={`
                                                                            w-full px-4 py-2 text-left text-sm transition-colors
                                                                            ${action.variant === 'danger'
                                                                                ? 'text-red-600 hover:bg-red-50'
                                                                                : 'text-gray-700 hover:bg-gray-50'
                                                                            }
                                                                        `}
                                                                    >
                                                                        {action.label}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Info */}
            {filteredData.length > 0 && (
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <p>
                        Mostrando <span className="font-medium text-gray-900">{filteredData.length}</span> de{" "}
                        <span className="font-medium text-gray-900">{data.length}</span> resultados
                    </p>
                </div>
            )}
        </div>
    );
};

export default DataTable;
