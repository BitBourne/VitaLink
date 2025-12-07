import React from 'react'
import {AppointmentCard} from '../components/AppointmentCard'
import { HealthMetricsCard } from '../components/HealMetricsCard'
import { PrescriptionsCard } from '../components/Preescription'
import { LabResultsCard } from '../components/LabResutl'
import { UpcomingVisit } from "../components/UpComing"
import { QuickActions } from "../components/Actions"

import useAuth from "../../../auth/hooks/useAuth";

function DashboardPatient() {
  const { user, loading } = useAuth();

  return (
    <div>
        <div className="mb-8">
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Bienvenido, {user.name} {user.last_name}
          </h1>
          <p className="mt-2  text-semibold text-muted-foreground">
            Tu salud es nuestra prioridad. Aquí está tu resumen médico.
          </p>
        </div>

        <UpcomingVisit />

        <QuickActions />

        <div className="grid gap-6 lg:grid-cols-2">
          <AppointmentCard />
          <HealthMetricsCard />
          <PrescriptionsCard />
          <LabResultsCard />
        </div>
    </div>
  )
}

export default DashboardPatient