"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CalorieCalculator() {
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [dailyCalories, setDailyCalories] = useState<number>(2000);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [daysSupply, setDaysSupply] = useState<number>(0);
  
  // Stała reprezentująca łączną ilość kilokalorii dostępnych w magazynach
  const TOTAL_AVAILABLE_CALORIES = 3500000; // np. 3.5 mln kilokalorii
  
  // Przelicz całkowitą dzienną liczbę kalorii i zapas dni
  useEffect(() => {
    const total = peopleCount * dailyCalories;
    setTotalCalories(total);
    
    if (total > 0) {
      setDaysSupply(Math.floor(TOTAL_AVAILABLE_CALORIES / total));
    } else {
      setDaysSupply(0);
    }
  }, [peopleCount, dailyCalories]);
  
  // Funkcja do określenia statusu zapasów
  const getSupplyStatus = () => {
    if (daysSupply === 0) return { status: "Brak danych", color: "bg-gray-500" };
    if (daysSupply < 7) return { status: "Krytyczny", color: "bg-red-500" };
    if (daysSupply < 14) return { status: "Niski", color: "bg-yellow-500" };
    if (daysSupply < 30) return { status: "Umiarkowany", color: "bg-blue-500" };
    return { status: "Optymalny", color: "bg-green-500" };
  };
  
  const supplyStatus = getSupplyStatus();
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-1 pt-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <span>Kalkulator zapasów żywnościowych</span>
          <Badge variant="outline" className="text-xs">{supplyStatus.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="people-count" className="text-xs">
              Liczba osób
            </Label>
            <Input
              id="people-count"
              type="number"
              min="0"
              className="h-7 mt-1 text-xs"
              value={peopleCount || ""}
              onChange={(e) => setPeopleCount(parseInt(e.target.value) || 0)}
            />
          </div>
          <div>
            <Label htmlFor="daily-calories" className="text-xs">
              Przydział dzienny (kcal/os)
            </Label>
            <Input
              id="daily-calories"
              type="number"
              min="0"
              className="h-7 mt-1 text-xs"
              value={dailyCalories || ""}
              onChange={(e) => setDailyCalories(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
        
        <div className="my-2 h-px w-full bg-zinc-800"></div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Dzienne zapotrzebowanie:</span>
            <span className="font-medium">{totalCalories.toLocaleString()} kcal</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Dostępne zapasy:</span>
            <span className="font-medium">{TOTAL_AVAILABLE_CALORIES.toLocaleString()} kcal</span>
          </div>
          <div className="flex justify-between items-center text-xs mt-2">
            <span className="text-zinc-400">Wystarczy na:</span>
            <span className="font-medium text-sm">{daysSupply} dni</span>
          </div>
          
          <div className="mt-1 h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${supplyStatus.color}`}
              style={{ 
                width: `${Math.min(100, (daysSupply / 60) * 100)}%` 
              }}
            />
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-zinc-400">0 dni</span>
            <span className="text-zinc-400">30 dni</span>
            <span className="text-zinc-400">60 dni</span>
          </div>
        </div>
        
        <div className="flex justify-end mt-2">
          <Button variant="outline" size="sm" className="text-xs h-6">
            Generuj raport
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}