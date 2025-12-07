import React from "react";
import { Activity, Heart, Droplet, Weight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const metrics = [
  { icon: Heart, label: "Presión Arterial", value: "120/80", unit: "mmHg" },
  { icon: Activity, label: "Frecuencia Cardíaca", value: "72", unit: "bpm" },
  { icon: Droplet, label: "Glucosa", value: "95", unit: "mg/dL" },
  { icon: Weight, label: "Peso", value: "68.5", unit: "kg" },
];

const chartData = [
  { name: "Ene", value: 120 },
  { name: "Feb", value: 118 },
  { name: "Mar", value: 122 },
  { name: "Abr", value: 119 },
  { name: "May", value: 120 },
  { name: "Jun", value: 121 },
];

export function HealthMetricsCard() {
  return (
    <div className="w-full rounded-2xl bg-white/80 backdrop-blur-xl p-6 border border-white/20 shadow-lg">
      <h2 className="text-lg font-bold mb-6 text-gray-900">Métricas de Salud</h2>

      {/* Métricas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex flex-col items-start p-4 rounded-xl bg-gradient-to-r from-[#B490CA]/20 to-[#5EE7DF]/20 border border-white/20 shadow-sm hover:shadow-md transition"
          >
            <metric.icon className="h-6 w-6 text-[#B490CA] mb-2" />

            <p className="text-xs text-gray-700">{metric.label}</p>

            <p className="text-2xl font-bold text-gray-900">
              {metric.value}
              <span className="ml-1 text-sm font-normal text-gray-700">{metric.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Gráfico */}
      <div className="rounded-xl p-4 border border-white/20 bg-gradient-to-r from-[#B490CA]/10 to-[#5EE7DF]/10 shadow-sm">
        <h4 className="text-sm font-medium mb-4 text-gray-900">Tendencia de Presión (últimos 6 meses)</h4>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#B490CA" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#5EE7DF" fontSize={12} tickLine={false} axisLine={false} domain={[115, 125]} />
            <Tooltip
              contentStyle={{ backgroundColor: "white", borderRadius: "8px", borderColor: "#B490CA" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ fill: "#B490CA", strokeWidth: 2 }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#B490CA" />
                <stop offset="100%" stopColor="#5EE7DF" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
