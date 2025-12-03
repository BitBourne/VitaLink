import React from "react";
import DataTable from "../../../core/ui/Components/DataTable";
import Badge from "../../../core/ui/Components/Badge";

/**
 * Example usage of the DataTable component
 * This shows how to use the ultra-clean DataTable with the AntiGravity design system
 */
const ExampleDataTableUsage = () => {
    // Sample data
    const sampleData = [
        {
            id: 1,
            name: "Dr. Juan Pérez",
            email: "juan.perez@example.com",
            specialty: "Cardiología",
            status: "verified",
            patients: 45,
        },
        {
            id: 2,
            name: "Dra. María García",
            email: "maria.garcia@example.com",
            specialty: "Pediatría",
            status: "pending",
            patients: 32,
        },
        {
            id: 3,
            name: "Dr. Carlos Rodríguez",
            email: "carlos.rodriguez@example.com",
            specialty: "Neurología",
            status: "rejected",
            patients: 28,
        },
    ];

    // Column definitions
    const columns = [
        {
            key: "name",
            label: "Doctor",
            render: (row) => (
                <div>
                    <p className="font-medium text-gray-900">{row.name}</p>
                    <p className="text-sm text-gray-500">{row.email}</p>
                </div>
            ),
        },
        {
            key: "specialty",
            label: "Especialidad",
        },
        {
            key: "patients",
            label: "Pacientes",
            render: (row) => (
                <span className="text-gray-900 font-medium">{row.patients}</span>
            ),
        },
        {
            key: "status",
            label: "Estado",
            render: (row) => {
                const statusMap = {
                    verified: { label: "Verificado", variant: "success" },
                    pending: { label: "Pendiente", variant: "warning" },
                    rejected: { label: "Rechazado", variant: "error" },
                };
                const status = statusMap[row.status] || statusMap.pending;
                return <Badge variant={status.variant}>{status.label}</Badge>;
            },
        },
    ];

    // Action definitions
    const actions = [
        {
            label: "Ver detalles",
            onClick: (row) => console.log("Ver detalles:", row),
        },
        {
            label: "Editar",
            onClick: (row) => console.log("Editar:", row),
        },
        {
            label: "Eliminar",
            onClick: (row) => console.log("Eliminar:", row),
            variant: "danger",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Ejemplo de DataTable</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Tabla ultra-minimalista siguiendo el sistema AntiGravity
                </p>
            </div>

            <DataTable
                columns={columns}
                data={sampleData}
                actions={actions}
                searchPlaceholder="Buscar doctores..."
                showSearch={true}
                emptyMessage="No se encontraron doctores"
            />
        </div>
    );
};

export default ExampleDataTableUsage;
