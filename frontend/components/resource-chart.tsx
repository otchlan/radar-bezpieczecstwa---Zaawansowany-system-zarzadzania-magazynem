"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ResourceChartProps {
  timeRange: string
  resourceFilter: string
}

export function ResourceChart({ timeRange, resourceFilter }: ResourceChartProps) {
  // W rzeczywistej aplikacji tutaj byłaby integracja z biblioteką do wykresów
  // np. recharts, chart.js, d3.js itp.

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-zinc-800 bg-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
        <CardHeader>
          <CardTitle>Zużycie amunicji</CardTitle>
          <CardDescription className="dark:text-zinc-400">Trend zużycia w czasie {timeRange}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full rounded-md bg-zinc-900 p-4 dark:bg-zinc-900">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="h-3/4 w-full">
                {/* Symulacja wykresu */}
                <div className="relative h-full w-full">
                  <div className="absolute bottom-0 left-0 h-[60%] w-full bg-gradient-to-t from-red-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 h-[60%] w-full border-t border-red-500"></div>
                  <div className="absolute bottom-[60%] right-0 h-1 w-1 rounded-full bg-red-500"></div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-400">Krytyczny poziom zużycia - uzupełnij zapasy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
        <CardHeader>
          <CardTitle>Stan pojazdów</CardTitle>
          <CardDescription className="dark:text-zinc-400">Sprawność w czasie {timeRange}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full rounded-md bg-zinc-900 p-4 dark:bg-zinc-900">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="h-3/4 w-full">
                {/* Symulacja wykresu */}
                <div className="relative h-full w-full">
                  <div className="absolute bottom-0 left-0 h-[85%] w-full bg-gradient-to-t from-green-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 h-[85%] w-full border-t border-green-500"></div>
                  <div className="absolute bottom-[85%] right-0 h-1 w-1 rounded-full bg-green-500"></div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-400">Optymalny poziom sprawności</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
        <CardHeader>
          <CardTitle>Bezpieczeństwo</CardTitle>
          <CardDescription className="dark:text-zinc-400">Incydenty w czasie {timeRange}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full rounded-md bg-zinc-900 p-4 dark:bg-zinc-900">
            <div className="flex h-full flex-col items-center justify-center">
              <div className="h-3/4 w-full">
                {/* Symulacja wykresu */}
                <div className="relative h-full w-full">
                  <div className="absolute bottom-0 left-0 h-[40%] w-full bg-gradient-to-t from-yellow-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 h-[40%] w-full border-t border-yellow-500"></div>
                  <div className="absolute bottom-[40%] right-0 h-1 w-1 rounded-full bg-yellow-500"></div>
                </div>
              </div>
              <div className="mt-2 text-xs text-zinc-400">Podwyższony poziom incydentów - monitoruj</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
