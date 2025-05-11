"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertTriangle, ArrowRight, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function EmergencyProtocol() {
  const [protocolActive, setProtocolActive] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="gap-2">
          <AlertTriangle className="h-4 w-4" />
          Protokół awaryjny
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <Shield className="h-5 w-5" />
            Aktywacja protokołu awaryjnego
          </DialogTitle>
          <DialogDescription className="dark:text-zinc-400">
            Protokół awaryjny umożliwia szybkie przeniesienie zasobów lub zniszczenie wrażliwych danych w sytuacji
            zagrożenia.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-md bg-red-950/20 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h4 className="font-medium text-red-500">UWAGA: Działanie nieodwracalne</h4>
            </div>
            <p className="mt-2 text-sm">Aktywacja protokołu awaryjnego spowoduje:</p>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                Uruchomienie procedury ewakuacji zasobów krytycznych
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                Zniszczenie wrażliwych danych zgodnie z procedurą ZKSW-7
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" />
                Powiadomienie dowództwa i jednostek zabezpieczających
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-yellow-500">Poziom autoryzacji: DOWÓDCA</Badge>
            <Badge className="bg-blue-500">Kod protokołu: ECHO-7</Badge>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <Button variant="outline" className="mt-2 sm:mt-0 dark:border-zinc-700 dark:bg-zinc-800">
            Anuluj
          </Button>
          <Button variant="destructive" onClick={() => setProtocolActive(true)} className="gap-2">
            <Shield className="h-4 w-4" />
            Aktywuj protokół awaryjny
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
