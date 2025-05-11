import { Warehouse } from "@/components/warehouse"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { EmergencyProtocol } from "@/components/emergency-protocol"
import { CommandIntegration } from "@/components/command-integration"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        title="System Zarządzania Magazynami Wojskowymi"
        description="Monitorowanie zasobów i gotowości bojowej w czasie rzeczywistym"
      >
        <EmergencyProtocol />
      </DashboardHeader>

      <div className="grid gap-4">
        <CommandIntegration />

        <div className="grid gap-4">
          <Warehouse
            name="Magazyn Alpha"
            ammoReadiness={{ value: 95, status: "green" }}
            vehicleReadiness={{ value: 100, status: "green" }}
            securityIncidents={{ value: 0, status: "green" }}
            classification="TAJNE"
          />

          <Warehouse
            name="Magazyn Bravo"
            ammoReadiness={{ value: 85, status: "yellow" }}
            vehicleReadiness={{ value: 92, status: "green" }}
            securityIncidents={{ value: 1, status: "yellow" }}
            classification="ZASTRZEŻONE"
          />

          <Warehouse
            name="Magazyn Charlie"
            ammoReadiness={{ value: 60, status: "red" }}
            vehicleReadiness={{ value: 75, status: "yellow" }}
            securityIncidents={{ value: 2, status: "yellow" }}
            classification="TAJNE"
          />

          <Warehouse
            name="Magazyn Delta"
            ammoReadiness={{ value: 45, status: "red" }}
            vehicleReadiness={{ value: 100, status: "green" }}
            securityIncidents={{ value: 3, status: "yellow" }}
            classification="JAWNE"
          />

          <Warehouse
            name="Magazyn Echo"
            ammoReadiness={{ value: 90, status: "green" }}
            vehicleReadiness={{ value: 65, status: "yellow" }}
            securityIncidents={{ value: 5, status: "red" }}
            classification="ŚCIŚLE TAJNE"
          />
        </div>
      </div>
    </DashboardShell>
  )
}
