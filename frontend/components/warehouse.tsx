"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Clock, Shield, Truck } from "lucide-react"
import { WarehouseDetail } from "@/components/warehouse-detail"

interface MetricProps {
  value: number
  status: "green" | "yellow" | "red"
}

interface WarehouseProps {
  name: string
  ammoReadiness: MetricProps
  vehicleReadiness: MetricProps
  securityIncidents: MetricProps
  classification: "JAWNE" | "ZASTRZEŻONE" | "TAJNE" | "ŚCIŚLE TAJNE"
}

export function Warehouse({
  name,
  ammoReadiness,
  vehicleReadiness,
  securityIncidents,
  classification,
}: WarehouseProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green":
        return "bg-green-500"
      case "yellow":
        return "bg-yellow-500"
      case "red":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case "green":
        return "🟢"
      case "yellow":
        return "🟡"
      case "red":
        return "🔴"
      default:
        return "⚪"
    }
  }

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "JAWNE":
        return "bg-blue-500"
      case "ZASTRZEŻONE":
        return "bg-yellow-500"
      case "TAJNE":
        return "bg-red-500"
      case "ŚCIŚLE TAJNE":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>{name}</CardTitle>
            <Badge className={getClassificationColor(classification)}>{classification}</Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Zwiń szczegóły" : "Rozwiń szczegóły"}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${getStatusColor(ammoReadiness.status)}`} />
            <Clock className="h-4 w-4 text-zinc-400" />
            <span className="text-sm">
              {getStatusEmoji(ammoReadiness.status)} {ammoReadiness.value}h zapasu amunicji
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${getStatusColor(vehicleReadiness.status)}`} />
            <Truck className="h-4 w-4 text-zinc-400" />
            <span className="text-sm">
              {getStatusEmoji(vehicleReadiness.status)} {vehicleReadiness.value}% sprawności pojazdów
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${getStatusColor(securityIncidents.status)}`} />
            <Shield className="h-4 w-4 text-zinc-400" />
            <span className="text-sm">
              {getStatusEmoji(securityIncidents.status)} {securityIncidents.value} incydentów bezpieczeństwa
            </span>
          </div>
        </div>

        {isExpanded && (
          <WarehouseDetail
            name={name}
            ammoReadiness={ammoReadiness}
            vehicleReadiness={vehicleReadiness}
            securityIncidents={securityIncidents}
          />
        )}
      </CardContent>
    </Card>
  )
}
