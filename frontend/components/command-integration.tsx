import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Radio } from "lucide-react"

export function CommandIntegration() {
  return (
    <Card className="border-zinc-800 bg-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-green-500" />
              Integracja z systemem dowodzenia
            </CardTitle>
            <Badge className="bg-green-500">Połączono</Badge>
          </div>
          <Badge variant="outline" className="text-xs dark:border-zinc-700 dark:text-zinc-300">
            Ostatnia aktualizacja: 5 min temu
          </Badge>
        </div>
        <CardDescription className="dark:text-zinc-400">
          Automatyczna wymiana danych z systemem dowodzenia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-md bg-zinc-900 p-3 dark:bg-zinc-900">
            <div className="text-xs text-zinc-500">Priorytet operacyjny</div>
            <div className="mt-1 text-lg font-medium">WYSOKI</div>
          </div>
          <div className="rounded-md bg-zinc-900 p-3 dark:bg-zinc-900">
            <div className="text-xs text-zinc-500">Aktywne jednostki</div>
            <div className="mt-1 text-lg font-medium">7 / 10</div>
          </div>
          <div className="rounded-md bg-zinc-900 p-3 dark:bg-zinc-900">
            <div className="text-xs text-zinc-500">Poziom gotowości</div>
            <div className="mt-1 text-lg font-medium">B2</div>
          </div>
          <div className="rounded-md bg-zinc-900 p-3 dark:bg-zinc-900">
            <div className="text-xs text-zinc-500">Alerty dowództwa</div>
            <div className="mt-1 text-lg font-medium text-yellow-500">3</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
