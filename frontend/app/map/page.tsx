//frontend/app/map/page.tsx
import { Metadata } from "next";
import MapContainer from "@/components/map-container";
import { DashboardShell } from "@/components/dashboard-shell";
import { WarehouseListGmina } from "@/components/warehouse-list-gmina";
import { CalorieCalculator } from "@/components/calorie-calculator";
import { AiAssistant } from "@/components/ai-assistant";

export const metadata: Metadata = {
  title: "Mapa Lublina",
  description: "Interaktywna mapa Lublina z zarządzaniem magazynami",
};

export default function MapPage() {
  return (
    <DashboardShell>
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-100px)] max-h-screen overflow-hidden">
        {/* Mapa (zajmuje 2/3 szerokości) */}
        <div className="col-span-2 overflow-hidden">
          <MapContainer />
        </div>
        
        {/* Panel boczny z listą magazynów, kalkulatorem i asystentem AI (zajmuje 1/3 szerokości) */}
        <div className="col-span-1 flex flex-col h-full overflow-hidden relative">
          {/* Lista magazynów (55% wysokości) */}
          <div className="h-[55%] min-h-0 mb-2">
            <WarehouseListGmina />
          </div>
          
          {/* Kalkulator zapasów żywnościowych (20% wysokości) */}
          <div className="h-[20%] min-h-0 mb-2">
            <CalorieCalculator />
          </div>
          
          {/* Asystent AI (25% wysokości) - rozszerza się do 50% po kliknięciu */}
          <div className="h-[25%] min-h-0">
            <AiAssistant />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}