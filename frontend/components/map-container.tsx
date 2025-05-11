//frontend/container/map-container.tsx
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function MapContainer() {
  const [activeMap, setActiveMap] = useState("warehouses");
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Funkcja do przełączania trybu pełnoekranowego
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`w-full h-full flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      <div className="flex items-center justify-between p-4 bg-card border-b">
        <div>
          <h1 className="text-2xl font-bold">Mapy Lublina</h1>
          <p className="text-muted-foreground">Zobrazowanie zasobów i infrastruktury</p>
        </div>
        <div className="flex items-center gap-4">
          <Tabs defaultValue="warehouses" value={activeMap} onValueChange={setActiveMap} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="warehouses">Magazyny i zasoby</TabsTrigger>
              <TabsTrigger value="people">Mapa ludności</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                  <path d="M21 8h-3a2 2 0 0 1-2-2V3"></path>
                  <path d="M3 16h3a2 2 0 0 1 2 2v3"></path>
                  <path d="M16 21v-3a2 2 0 0 1 2-2h3"></path>
                </svg>
                Zamknij pełny ekran
              </span>
            ) : (
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M3 8V5a2 2 0 0 1 2-2h3"></path>
                  <path d="M16 3h3a2 2 0 0 1 2 2v3"></path>
                  <path d="M21 16v3a2 2 0 0 1-2 2h-3"></path>
                  <path d="M8 21H5a2 2 0 0 1-2-2v-3"></path>
                </svg>
                Pełny ekran
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 p-2 overflow-hidden">
        <div className="h-full w-full relative">
          {activeMap === "warehouses" ? (
            <iframe 
              src="/data/lublin_map.html" 
              className="w-full h-full border-0 rounded-md" 
              title="Mapa magazynów w Lublinie"
            />
          ) : (
            <iframe 
              src="/data/lublin_map_people.html" 
              className="w-full h-full border-0 rounded-md" 
              title="Mapa ludności w Lublinie"
            />
          )}

          <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm p-2 rounded-md shadow-md">
            <div className="text-xs font-medium">Wybrano:</div>
            <div className="text-sm font-bold">
              {activeMap === "warehouses" ? "Magazyny i zasoby" : "Mapa ludności"}
            </div>
          </div>
        </div>
      </div>

      {!isFullscreen && (
        <div className="p-3 bg-card border-t">
          <div className="text-sm text-muted-foreground">
            Źródło: Dane prerenderowane z wykorzystaniem biblioteki Folium (python)
          </div>
        </div>
      )}
    </div>
  );
}