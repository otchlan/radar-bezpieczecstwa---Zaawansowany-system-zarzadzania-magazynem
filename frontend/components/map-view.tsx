//frontend/components/map-view.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface MapViewProps {
  mapUrl: string;
  title: string;
}

export function MapView({ mapUrl, title }: MapViewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Obsługa załadowania iframe
  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", handleLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
      }
    };
  }, []);

  return (
    <Card className="h-full w-full overflow-hidden">
      <div className="relative h-full w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-sm font-medium">Ładowanie mapy...</p>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={mapUrl}
          title={title}
          className="h-full w-full border-0"
          sandbox="allow-same-origin allow-scripts"
          loading="lazy"
        />
      </div>
    </Card>
  );
}
