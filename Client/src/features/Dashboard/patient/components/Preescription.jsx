import React from "react";
import { Pill, Download } from "lucide-react";

const prescriptions = [
  {
    id: 1,
    medication: "Losartán 50mg",
    dosage: "1 tableta cada 24 horas",
    duration: "30 días",
    doctor: "Dr. Carlos Mendoza",
    date: "1 Dic 2025",
    refills: 2,
  },
  {
    id: 2,
    medication: "Metformina 850mg",
    dosage: "1 tableta cada 12 horas",
    duration: "90 días",
    doctor: "Dra. Ana Pérez",
    date: "28 Nov 2025",
    refills: 3,
  },
  {
    id: 3,
    medication: "Omeprazol 20mg",
    dosage: "1 cápsula cada 24 horas",
    duration: "15 días",
    doctor: "Dr. Carlos Mendoza",
    date: "5 Dic 2025",
    refills: 0,
  },
];

export function PrescriptionsCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-md p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Recetas Activas
        </h2>
        <button className="text-sm font-medium text-[#B490CA] hover:text-[#5EE7DF] transition">
          Ver historial
        </button>
      </div>

      {/* List */}
      <div className="space-y-3">
        {prescriptions.map((rx) => (
          <div
            key={rx.id}
            className="rounded-xl border border-[#B490CA]/20 bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-[#B490CA] to-[#5EE7DF]">
                  <Pill className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {rx.medication}
                  </h4>
                  <p className="text-sm text-gray-600">{rx.dosage}</p>
                </div>
              </div>

              {/* Download */}
              <button className="flex items-center justify-center h-8 w-8 rounded-md border border-[#B490CA] hover:bg-[#B490CA]/10 transition">
                <Download className="h-4 w-4 text-[#B490CA]" />
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#B490CA]/20 text-xs text-gray-500">
              <span>{rx.doctor}</span>
              <span>{rx.date}</span>
              <span className="px-2 py-1 rounded-full bg-[#5EE7DF]/20 text-black font-medium">
                {rx.refills} resurtidos
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
