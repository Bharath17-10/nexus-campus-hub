import { motion } from "framer-motion";
import { MapPin, Navigation, Accessibility, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CampusMap = () => {
  return (
    <motion.div
      className="bg-card rounded-2xl shadow-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Map Placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Buildings */}
        <div className="absolute inset-4 flex items-center justify-center">
          <div className="relative w-full h-full max-w-sm">
            {/* Main Building */}
            <div className="absolute top-1/4 left-1/4 w-20 h-16 bg-primary/20 rounded-lg border-2 border-primary/40 flex items-center justify-center">
              <span className="text-2xs font-medium text-primary">Main Block</span>
            </div>
            
            {/* Library */}
            <div className="absolute top-1/4 right-1/4 w-16 h-12 bg-accent/20 rounded-lg border-2 border-accent/40 flex items-center justify-center">
              <span className="text-2xs font-medium text-accent">Library</span>
            </div>
            
            {/* Cafeteria */}
            <div className="absolute bottom-1/4 left-1/3 w-14 h-10 bg-success/20 rounded-lg border-2 border-success/40 flex items-center justify-center">
              <span className="text-2xs font-medium text-success">Café</span>
            </div>
            
            {/* Sports Complex */}
            <div className="absolute bottom-1/4 right-1/4 w-18 h-14 bg-warning/20 rounded-lg border-2 border-warning/40 flex items-center justify-center">
              <span className="text-2xs font-medium text-warning">Sports</span>
            </div>
            
            {/* Current Location */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute" />
                <div className="w-4 h-4 bg-primary rounded-full relative z-10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Info */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
            <MapPin className="w-3 h-3 mr-1 text-primary" />
            Campus Map
          </Badge>
          <Badge variant="secondary" className="bg-card/80 backdrop-blur-sm">
            <Accessibility className="w-3 h-3 mr-1" />
            Accessible Routes
          </Badge>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search buildings, rooms..."
              className="w-full h-10 pl-10 pr-4 bg-muted/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <Button size="icon" variant="outline" className="h-10 w-10">
            <Navigation className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="w-4 h-4" />
          <span>Tap on buildings to view details and get directions</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CampusMap;
