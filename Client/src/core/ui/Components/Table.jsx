import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const Table = ({
    columns,
    data,
    searchable = true,
    searchPlaceholder = "Buscar...",
    emptyMessage = "No hay datos disponibles"
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    // Filter data based on search
    const filteredData = data.filter(row => {
        if (!searchTerm) return true;
        return columns.some(col => {
            const value = col.accessor ? row[col.accessor] : "";
            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
    });

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200">
            {/* Search Bar */}
            {searchable && (
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B490CA] focus:border-transparent outline-none text-sm"
                        />
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            {columns.map((column, idx) => (
                                <th
                                    key={idx}
                                    onClick={() => column.sortable && handleSort(column.accessor)}
                                    className={`px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{column.header}</span>
                                        {column.sortable && sortConfig.key === column.accessor && (
                                            sortConfig.direction === 'asc' ?
                                                <ChevronUp className="w-4 h-4" /> :
                                                <ChevronDown className="w-4 h-4" />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {sortedData.length > 0 ? (
                            sortedData.map((row, rowIdx) => (
                                <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                                    {columns.map((column, colIdx) => (
                                        <td key={colIdx} className="px-6 py-4 text-sm text-gray-900">
                                            {column.render ? column.render(row) : row[column.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                                    {emptyMessage}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer with count */}
            {sortedData.length > 0 && (
                <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
                    <p className="text-sm text-gray-600">
                        Mostrando <span className="font-medium">{sortedData.length}</span> de{" "}
                        <span className="font-medium">{data.length}</span> resultados
                    </p>
                </div>
            )}
        </div>
    );
};

export default Table;
