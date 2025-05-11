import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Target } from "lucide-react"

export function OperationalImpact() {
  const operations = [
    {
      id: 1,
      name: "Operacja Orzeł",
      status: "active",
      impact: "critical",
      description: "Niedobór amunicji wpływa na zdolność bojową jednostek pierwszego rzutu",
      timeline: "Rozpoczęcie: 3 dni",
    },
    {
      id: 2,
      name: "Ćwiczenia Tarcza-25",
      status: "planned",
      impact: "moderate",
      description: "Ograniczona dostępność pojazdów może wpłynąć na skalę ćwiczeń",
      timeline: "Rozpoczęcie: 14 dni",
    },
    {
      id: 3,
      name: "Misja Wsparcia Sojuszniczego",
      status: "active",
      impact: "low",
      description: "Aktualne stany magazynowe są wystarczające dla realizacji misji",
      timeline: "W trakcie (dzień 45 z 90)",
    },
  ]

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "critical":
        return <Badge className="bg-red-500">Krytyczny</Badge>
      case "moderate":
        return <Badge className="bg-yellow-500">Umiarkowany</Badge>
      case "low":
        return <Badge className="bg-green-500">Niski</Badge>
      default:
        return <Badge>Nieznany</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500">Aktywna</Badge>
      case "planned":
        return <Badge className="bg-purple-500">Planowana</Badge>
      case "completed":
        return <Badge className="bg-green-500">Zakończona</Badge>
      default:
        return <Badge>Nieznany</Badge>
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          Wpływ na operacje
        </CardTitle>
        <CardDescription className="dark:text-zinc-400">
          Jak aktualny stan magazynu wpływa na bieżące i planowane operacje
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {operations.map((operation) => (
            <div
              key={operation.id}
              className="flex items-start gap-4 rounded-md border border-zinc-800 bg-zinc-900 p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mt-1">
                <Target className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{operation.name}</h4>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(operation.status)}
                    {getImpactBadge(operation.impact)}
                  </div>
                </div>
                <p className="mt-1 text-sm text-zinc-400">{operation.description}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{operation.timeline}</span>
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
