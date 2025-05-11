//frontend/components/warehouse-list-gmina.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { WarehouseDetailsGmina } from "@/components/warehouse-details-gmina";

type WarehouseType = "Żywnościowo-Sanitarny" | "Zasobów" | "Zewnętrzny" | "Strategiczny" | "Regionalny";

interface WarehouseProduct {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number; // kalorie na jednostkę
  icon: string;
}

interface Warehouse {
  id: string;
  name: string;
  type: WarehouseType;
  capacity: number;
  currentAmount: number;
  status: "Pełny" | "Optymalny" | "Niski";
  content: string;
  location: string;
  products: WarehouseProduct[];
}

// Przykładowe dane o produktach dla każdego magazynu
const warehouseProductsMap: { [warehouseId: string]: WarehouseProduct[] } = {
  "ZS1": [
    { id: "p1", name: "Mąka pszenna", quantity: 1250, unit: "kg", calories: 350, icon: "🌾" },
    { id: "p2", name: "Woda pitna", quantity: 3500, unit: "l", calories: 0, icon: "💧" },
    { id: "p3", name: "Konserwy mięsne", quantity: 860, unit: "szt.", calories: 250, icon: "🥫" },
    { id: "p4", name: "Konserwy warzywne", quantity: 920, unit: "szt.", calories: 80, icon: "🥕" },
    { id: "p5", name: "Kasza gryczana", quantity: 780, unit: "kg", calories: 330, icon: "🌰" },
    { id: "p6", name: "Makaron", quantity: 650, unit: "kg", calories: 370, icon: "🍝" },
    { id: "p7", name: "Przetwory owocowe", quantity: 420, unit: "l", calories: 180, icon: "🍯" },
  ],
  "ZS2": [
    { id: "p1", name: "Mąka pszenna", quantity: 1800, unit: "kg", calories: 350, icon: "🌾" },
    { id: "p2", name: "Woda pitna", quantity: 5200, unit: "l", calories: 0, icon: "💧" },
    { id: "p3", name: "Konserwy mięsne", quantity: 1240, unit: "szt.", calories: 250, icon: "🥫" },
    { id: "p4", name: "Konserwy warzywne", quantity: 1180, unit: "szt.", calories: 80, icon: "🥕" },
    { id: "p5", name: "Kasza gryczana", quantity: 950, unit: "kg", calories: 330, icon: "🌰" },
    { id: "p6", name: "Makaron", quantity: 890, unit: "kg", calories: 370, icon: "🍝" },
    { id: "p7", name: "Przetwory owocowe", quantity: 680, unit: "l", calories: 180, icon: "🍯" },
  ],
  "ZS3": [
    { id: "p1", name: "Mąka pszenna", quantity: 850, unit: "kg", calories: 350, icon: "🌾" },
    { id: "p2", name: "Woda pitna", quantity: 2100, unit: "l", calories: 0, icon: "💧" },
    { id: "p3", name: "Konserwy mięsne", quantity: 420, unit: "szt.", calories: 250, icon: "🥫" },
    { id: "p4", name: "Konserwy warzywne", quantity: 380, unit: "szt.", calories: 80, icon: "🥕" },
    { id: "p5", name: "Kasza gryczana", quantity: 320, unit: "kg", calories: 330, icon: "🌰" },
    { id: "p6", name: "Makaron", quantity: 290, unit: "kg", calories: 370, icon: "🍝" },
    { id: "p7", name: "Przetwory owocowe", quantity: 180, unit: "l", calories: 180, icon: "🍯" },
  ],
  "ZS4": [
    { id: "p1", name: "Mąka pszenna", quantity: 1050, unit: "kg", calories: 350, icon: "🌾" },
    { id: "p2", name: "Woda pitna", quantity: 4200, unit: "l", calories: 0, icon: "💧" },
    { id: "p3", name: "Konserwy mięsne", quantity: 780, unit: "szt.", calories: 250, icon: "🥫" },
    { id: "p4", name: "Konserwy warzywne", quantity: 720, unit: "szt.", calories: 80, icon: "🥕" },
    { id: "p5", name: "Kasza gryczana", quantity: 680, unit: "kg", calories: 330, icon: "🌰" },
    { id: "p6", name: "Makaron", quantity: 630, unit: "kg", calories: 370, icon: "🍝" },
    { id: "p7", name: "Przetwory owocowe", quantity: 290, unit: "l", calories: 180, icon: "🍯" },
  ],
  "ZS5": [
    { id: "p1", name: "Mąka pszenna", quantity: 520, unit: "kg", calories: 350, icon: "🌾" },
    { id: "p2", name: "Woda pitna", quantity: 1800, unit: "l", calories: 0, icon: "💧" },
    { id: "p3", name: "Konserwy mięsne", quantity: 320, unit: "szt.", calories: 250, icon: "🥫" },
    { id: "p4", name: "Konserwy warzywne", quantity: 280, unit: "szt.", calories: 80, icon: "🥕" },
    { id: "p5", name: "Kasza gryczana", quantity: 240, unit: "kg", calories: 330, icon: "🌰" },
    { id: "p6", name: "Makaron", quantity: 190, unit: "kg", calories: 370, icon: "🍝" },
    { id: "p7", name: "Przetwory owocowe", quantity: 110, unit: "l", calories: 180, icon: "🍯" },
  ],
  "MZ1": [
    { id: "f1", name: "Paliwo diesel", quantity: 3800, unit: "l", calories: 0, icon: "⛽" },
    { id: "f2", name: "Olej silnikowy", quantity: 480, unit: "l", calories: 0, icon: "🛢️" },
    { id: "f3", name: "Części zamienne", quantity: 920, unit: "szt.", calories: 0, icon: "🔧" },
  ],
};

// Dodajemy produkty do wszystkich magazynów
const warehouseData: Warehouse[] = [
  {
    id: "ZS1",
    name: "Magazyn Żywnościowo-Sanitarny 1",
    type: "Żywnościowo-Sanitarny",
    capacity: 1000,
    currentAmount: 820,
    status: "Optymalny",
    content: "Żywność, leki, środki higieniczne",
    location: "Lublin, Centrum",
    products: warehouseProductsMap["ZS1"] || [],
  },
  {
    id: "ZS2",
    name: "Magazyn Żywnościowo-Sanitarny 2",
    type: "Żywnościowo-Sanitarny",
    capacity: 1000,
    currentAmount: 950,
    status: "Pełny",
    content: "Żywność, leki, środki higieniczne",
    location: "Lublin, Czuby",
    products: warehouseProductsMap["ZS2"] || [],
  },
  {
    id: "ZS3",
    name: "Magazyn Żywnościowo-Sanitarny 3",
    type: "Żywnościowo-Sanitarny",
    capacity: 1000,
    currentAmount: 560,
    status: "Niski",
    content: "Żywność, leki, środki higieniczne",
    location: "Lublin, Kalinowszczyzna",
    products: warehouseProductsMap["ZS3"] || [],
  },
  {
    id: "ZS4",
    name: "Magazyn Żywnościowo-Sanitarny 4",
    type: "Żywnościowo-Sanitarny",
    capacity: 1000,
    currentAmount: 780,
    status: "Optymalny",
    content: "Żywność, leki, środki higieniczne",
    location: "Lublin, Węglin",
    products: warehouseProductsMap["ZS4"] || [],
  },
  {
    id: "ZS5",
    name: "Magazyn Żywnościowo-Sanitarny 5",
    type: "Żywnościowo-Sanitarny",
    capacity: 1000,
    currentAmount: 430,
    status: "Niski",
    content: "Żywność, leki, środki higieniczne",
    location: "Lublin, Czechów",
    products: warehouseProductsMap["ZS5"] || [],
  },
  {
    id: "MZ1",
    name: "Magazyn Zasobów 1",
    type: "Zasobów",
    capacity: 5000,
    currentAmount: 4800,
    status: "Pełny",
    content: "Paliwo, oleje, części zamienne",
    location: "Lublin, Felin",
    products: warehouseProductsMap["MZ1"] || [],
  },
  // Pozostałe magazyny byłyby tutaj...
];

export function WarehouseListGmina() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [expandedWarehouse, setExpandedWarehouse] = useState<string | null>(null);

  // Filtrowanie magazynów
  const filteredWarehouses = warehouseData?.filter((warehouse) => {
    const matchesQuery = warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         warehouse.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         warehouse.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === null || warehouse.type === filter;
    
    return matchesQuery && matchesFilter;
  }) || [];

  // Funkcja do obsługi kliknięcia na magazyn
  const handleWarehouseClick = (warehouseId: string) => {
    if (expandedWarehouse === warehouseId) {
      setExpandedWarehouse(null);
    } else {
      setExpandedWarehouse(warehouseId);
    }
  };

  // Funkcja do obsługi kliknięcia przycisku szczegółów
  const handleDetailsClick = (warehouse: Warehouse, e: React.MouseEvent) => {
    e.stopPropagation(); // Zatrzymaj propagację, aby nie zamknąć/otworzyć listy produktów
    setSelectedWarehouse(warehouse);
  };

  // Obliczenie całkowitej wartości energetycznej produktu
  const calculateTotalCalories = (product: WarehouseProduct) => {
    return product.calories * product.quantity;
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="py-1 px-3 flex-shrink-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm flex items-center gap-2">
              Lista magazynów
              <Badge variant="outline" className="text-xs">{filteredWarehouses.length}</Badge>
            </CardTitle>
            <div className="flex gap-1">
              <Input
                placeholder="Szukaj..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-7 text-xs w-24"
              />
              <Button
                variant={filter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(null)}
                className="h-7 text-xs px-2"
              >
                Wszystkie
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            <Button
              variant={filter === "Żywnościowo-Sanitarny" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("Żywnościowo-Sanitarny")}
              className="h-6 text-xs px-2"
            >
              Żywnościowe
            </Button>
            <Button
              variant={filter === "Zasobów" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("Zasobów")}
              className="h-6 text-xs px-2"
            >
              Zasobów
            </Button>
            <Button
              variant={filter === "Zewnętrzny" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("Zewnętrzny")}
              className="h-6 text-xs px-2"
            >
              Zewnętrzne
            </Button>
            <Button
              variant={filter === "Strategiczny" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("Strategiczny")}
              className="h-6 text-xs px-2"
            >
              Strategiczne
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-2 pt-0 space-y-1">
              {filteredWarehouses.map((warehouse) => (
                <Collapsible
                  key={warehouse.id}
                  open={expandedWarehouse === warehouse.id}
                  onOpenChange={() => handleWarehouseClick(warehouse.id)}
                  className="rounded-md bg-zinc-800 overflow-hidden"
                >
                  <CollapsibleTrigger asChild>
                    <div className="p-2 cursor-pointer hover:bg-zinc-700 transition-colors">
                      <div className="flex justify-between items-center">
                        <div className="truncate">
                          <div className="font-medium text-sm truncate">{warehouse.id} - {warehouse.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={warehouse.status === "Pełny" ? "destructive" : 
                                    warehouse.status === "Optymalny" ? "default" : "outline"}
                            className="text-xs"
                          >
                            {warehouse.status}
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 w-5 p-0" 
                            onClick={(e) => handleDetailsClick(warehouse, e)}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="8" x2="12" y2="16" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <div className="text-zinc-400 truncate">{warehouse.location}</div>
                        <div className="text-zinc-400">{Math.round((warehouse.currentAmount / warehouse.capacity) * 100)}%</div>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            warehouse.status === "Pełny" ? "bg-red-500" : 
                            warehouse.status === "Optymalny" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                          style={{ width: `${(warehouse.currentAmount / warehouse.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="bg-zinc-900 border-t border-zinc-700 max-h-32 overflow-auto">
                      <div className="p-1 text-xs text-zinc-400 flex items-center justify-between border-b border-zinc-700 bg-zinc-800/50 sticky top-0 z-10">
                        <div className="flex justify-between w-full px-2 py-1">
                          <span>Produkt</span>
                          <div className="flex gap-2">
                            <span>Na stanie</span>
                            <span>Kalorie</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-1">
                        {warehouse.products?.map((product) => (
                          <div 
                            key={product.id} 
                            className="flex items-center px-2 py-1 text-xs rounded hover:bg-zinc-800"
                          >
                            <div className="w-5 text-center mr-2">{product.icon}</div>
                            <div className="flex-1 truncate">{product.name}</div>
                            <div className="ml-2 text-right min-w-[60px]">
                              {product.quantity} {product.unit}
                            </div>
                            <div className="ml-2 text-right min-w-[80px]">
                              {product.calories > 0 
                                ? `${calculateTotalCalories(product).toLocaleString()} kcal` 
                                : "-"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedWarehouse && (
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-3/4 max-w-2xl">
          <WarehouseDetailsGmina 
            warehouse={selectedWarehouse} 
            onClose={() => setSelectedWarehouse(null)} 
          />
        </div>
      )}
    </div>
  );
}

// Dodajemy alias dla kompatybilności z importem WarehouseList
export const WarehouseList = WarehouseListGmina;
export default WarehouseListGmina;