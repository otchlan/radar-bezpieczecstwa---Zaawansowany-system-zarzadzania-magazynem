//frontend/components/warehouse-details-gmina.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  products?: WarehouseProduct[];
}

interface WarehouseDetailsGminaProps {
  warehouse: Warehouse;
  onClose: () => void;
  className?: string;
}

export function WarehouseDetailsGmina({ warehouse, onClose, className = "" }: WarehouseDetailsGminaProps) {
  // Obliczenie procentowego zapełnienia
  const fillPercentage = Math.round((warehouse.currentAmount / warehouse.capacity) * 100);
  
  // Kolory statusu
  const statusColor = 
    warehouse.status === "Pełny" ? "text-red-500" : 
    warehouse.status === "Optymalny" ? "text-green-500" : "text-yellow-500";
  
  // Funkcja do obliczania sumy kalorii
  const calculateTotalCalories = () => {
    if (!warehouse.products || warehouse.products.length === 0) return 0;
    
    return warehouse.products.reduce((total, product) => {
      return total + (product.calories * product.quantity);
    }, 0);
  };
  
  const totalCalories = calculateTotalCalories();
  
  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle>{warehouse.name}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{warehouse.id}</Badge>
            <Badge>{warehouse.type}</Badge>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-2 p-3 rounded-md bg-zinc-800">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-400">Status zapełnienia:</span>
              <span className={`font-medium ${statusColor}`}>{warehouse.status}</span>
            </div>
            <div className="mt-2 h-3 w-full bg-zinc-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  warehouse.status === "Pełny" ? "bg-red-500" : 
                  warehouse.status === "Optymalny" ? "bg-green-500" : "bg-yellow-500"
                }`}
                style={{ width: `${fillPercentage}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="font-medium">{warehouse.currentAmount}/{warehouse.capacity} jednostek</span>
              <span className="font-medium">{fillPercentage}%</span>
            </div>
          </div>
          
          <div className="p-3 rounded-md bg-zinc-800">
            <span className="text-sm text-zinc-400">Lokalizacja:</span>
            <div className="font-medium mt-1">{warehouse.location}</div>
          </div>
          
          <div className="p-3 rounded-md bg-zinc-800">
            <span className="text-sm text-zinc-400">Całkowita wartość energetyczna:</span>
            <div className="font-medium mt-1">
              {warehouse.type === "Żywnościowo-Sanitarny" 
                ? `${totalCalories.toLocaleString()} kcal` 
                : "Nie dotyczy"}
            </div>
          </div>
        </div>
        
        {warehouse.products && warehouse.products.length > 0 && (
          <>
            <Separator className="my-3" />
            
            <div className="mb-3">
              <h3 className="text-sm font-medium mb-2">Zawartość magazynu</h3>
              <ScrollArea className="h-40 rounded-md border border-zinc-800">
                <div className="p-1">
                  <div className="p-1 text-xs text-zinc-400 flex items-center justify-between border-b border-zinc-700 bg-zinc-800/50">
                    <div className="flex justify-between w-full px-2 py-1">
                      <span>Produkt</span>
                      <div className="flex gap-8">
                        <span>Na stanie</span>
                        <span>Kalorie (całkowite)</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-1">
                    {warehouse.products.map((product) => (
                      <div 
                        key={product.id} 
                        className="flex items-center px-2 py-1 text-xs rounded hover:bg-zinc-800"
                      >
                        <div className="w-5 text-center mr-2">{product.icon}</div>
                        <div className="flex-1">{product.name}</div>
                        <div className="ml-2 text-right min-w-[80px]">
                          {product.quantity} {product.unit}
                        </div>
                        <div className="ml-2 text-right min-w-[120px]">
                          {product.calories > 0 
                            ? `${(product.calories * product.quantity).toLocaleString()} kcal` 
                            : "-"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>
          </>
        )}
        
        <Separator className="my-3" />
        
        <div className="flex justify-between">
          <Button variant="outline" size="sm">Aktualizuj stan</Button>
          <Button variant="default" size="sm">Zarządzaj</Button>
        </div>
      </CardContent>
    </Card>
  );
}