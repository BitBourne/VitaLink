import React from "react";
import { FileText, Download, Eye } from "lucide-react";

const labResults = [
  {
    id: 1,
    test: "Perfil Lipídico Completo",
    date: "3 Dic 2025",
    status: "completed",
    result: "Normal",
    doctor: "Dra. Ana Pérez",
  },
  {
    id: 2,
    test: "Hemograma Completo",
    date: "28 Nov 2025",
    status: "completed",
    result: "Normal",
    doctor: "Dr. Carlos Mendoza",
  },
  {
    id: 3,
    test: "Examen de Tiroides (TSH, T3, T4)",
    date: "15 Nov 2025",
    status: "completed",
    result: "Normal",
    doctor: "Dra. Laura Martínez",
  },
];

export function LabResultsCard() {
  return (
    <div className="w-full rounded-2xl border border-[#B490CA]/20 bg-white shadow-md p-5">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Resultados de Laboratorio
        </h2>
        <button className="text-sm font-medium text-[#B490CA] hover:text-[#5EE7DF] transition">
          Ver todos
        </button>
      </div>

      {/* Lista de resultados */}
      <div className="space-y-3">
        {labResults.map((result) => (
          <div
            key={result.id}
            className="rounded-xl border border-[#B490CA]/20 bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Info */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#B490CA] to-[#5EE7DF]">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{result.test}</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {result.doctor} • {result.date}
                  </p>
                </div>
              </div>

              {/* Badge resultado */}
              <span className="rounded-full px-3 py-1 text-xs font-medium bg-gradient-to-r from-[#B490CA]/20 to-[#5EE7DF]/20 text-[#5EE7DF]">
                {result.result}
              </span>
            </div>

            {/* Botones */}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 border border-[#B490CA]/30 rounded-md py-1.5 text-sm font-medium text-[#B490CA] hover:bg-[#B490CA]/10 transition">
                <Eye className="h-4 w-4" />
                Ver Detalles
              </button>

              <button className="flex-1 flex items-center justify-center gap-2 border border-[#B490CA]/30 rounded-md py-1.5 text-sm font-medium text-[#B490CA] hover:bg-[#B490CA]/10 transition">
                <Download className="h-4 w-4" />
                Descargar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
