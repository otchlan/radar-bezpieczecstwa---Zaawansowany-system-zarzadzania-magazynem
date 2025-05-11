"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Filter } from "lucide-react"
import { ResourceChart } from "@/components/resource-chart"
import { AnomalyList } from "@/components/anomaly-list"
import { OperationalImpact } from "@/components/operational-impact"

interface MetricProps {
  value: number
  status: "green" | "yellow" | "red"
}

interface WarehouseDetailProps {
  name: string
  ammoReadiness: MetricProps
  vehicleReadiness: MetricProps
  securityIncidents: MetricProps
}

export function WarehouseDetail({ name, ammoReadiness, vehicleReadiness, securityIncidents }: WarehouseDetailProps) {
  const [timeRange, setTimeRange] = useState("7d")
  const [resourceFilter, setResourceFilter] = useState("all")

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Szczegóły magazynu: {name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-zinc-400" />
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="h-8 w-[180px] bg-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800">
                <SelectValue placeholder="Filtruj zasoby" />
              </SelectTrigger>
              <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                <SelectItem value="all">Wszystkie zasoby</SelectItem>
                <SelectItem value="ammo">Tylko amunicja</SelectItem>
                <SelectItem value="vehicles">Tylko pojazdy</SelectItem>
                <SelectItem value="fuel">Tylko paliwo</SelectItem>
                <SelectItem value="equipment">Tylko sprzęt</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-zinc-400" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="h-8 w-[180px] bg-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800">
                <SelectValue placeholder="Zakres czasu" />
              </SelectTrigger>
              <SelectContent className="dark:bg-zinc-900 dark:border-zinc-800">
                <SelectItem value="24h">Ostatnie 24h</SelectItem>
                <SelectItem value="7d">Ostatnie 7 dni</SelectItem>
                <SelectItem value="30d">Ostatnie 30 dni</SelectItem>
                <SelectItem value="90d">Ostatnie 90 dni</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="trends" className="dark">
        <TabsList className="bg-zinc-900 dark:bg-zinc-900">
          <TabsTrigger value="trends">Trendy zużycia</TabsTrigger>
          <TabsTrigger value="anomalies">
            Anomalie
            <Badge className="ml-2 bg-red-500">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="impact">Wpływ operacyjny</TabsTrigger>
        </TabsList>
        <TabsContent value="trends" className="mt-4">
          <ResourceChart timeRange={timeRange} resourceFilter={resourceFilter} />
        </TabsContent>
        <TabsContent value="anomalies" className="mt-4">
          <AnomalyList />
        </TabsContent>
        <TabsContent value="impact" className="mt-4">
          <OperationalImpact />
        </TabsContent>
      </Tabs>
    </div>
  )
}
