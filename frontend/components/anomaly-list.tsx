import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Shield, User } from "lucide-react"

export function AnomalyList() {
  const anomalies = [
    {
      id: 1,
      title: "Nieautoryzowane pobranie amunicji",
      description: "Wykryto pobranie 200 szt. amunicji 5.56mm bez autoryzacji dowódcy",
      timestamp: "2025-05-10T14:32:15",
      severity: "critical",
      category: "security",
    },
    {
      id: 2,
      title: "Przekroczenie limitu wydań paliwa",
      description: "Wydano 500L paliwa ponad dzienny limit dla jednostki Alpha-2",
      timestamp: "2025-05-10T12:15:43",
      severity: "warning",
      category: "logistics",
    },
    {
      id: 3,
      title: "Próba dostępu do strefy zastrzeżonej",
      description: "3 nieudane próby dostępu do strefy z materiałami wybuchowymi",
      timestamp: "2025-05-10T09:47:22",
      severity: "critical",
      category: "security",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge className="bg-red-500">Krytyczny</Badge>
      case "warning":
        return <Badge className="bg-yellow-500">Ostrzeżenie</Badge>
      case "info":
        return <Badge className="bg-blue-500">Informacja</Badge>
      default:
        return <Badge>Nieznany</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security":
        return <Shield className="h-4 w-4 text-red-500" />
      case "logistics":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Wykryte anomalie
        </CardTitle>
        <CardDescription className="dark:text-zinc-400">
          Ostatnie nieregularne zdarzenia wymagające uwagi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="flex items-start gap-4 rounded-md border border-zinc-800 bg-zinc-900 p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mt-1">{getCategoryIcon(anomaly.category)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{anomaly.title}</h4>
                  {getSeverityBadge(anomaly.severity)}
                </div>
                <p className="mt-1 text-sm text-zinc-400">{anomaly.description}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(anomaly.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>Wymaga weryfikacji</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
