import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { FloatingEmergencyButton } from "../components/FloatingEmergencyButton";
import { 
  MapPin, 
  Waves, 
  Shield, 
  Heart, 
  Church, 
  X,
  Navigation2,
  ArrowLeft
} from "lucide-react";

type FilterType = "toilets" | "police" | "medical" | "pandals" | "all";

interface MapMarker {
  id: string;
  type: FilterType;
  name: string;
  lat: number;
  lng: number;
  distance: string;
  crowdLevel?: "low" | "medium" | "high";
  status: string;
}

const markers: MapMarker[] = [
  { id: "1", type: "toilets", name: "Community Toilet - Park Street", lat: 35, lng: 30, distance: "250m", status: "Open" },
  { id: "2", type: "police", name: "Police Booth - Gariahat", lat: 45, lng: 50, distance: "400m", status: "Active" },
  { id: "3", type: "medical", name: "First Aid - Ballygunge", lat: 60, lng: 40, distance: "600m", status: "Available" },
  { id: "4", type: "pandals", name: "Kumartuli Park Puja", lat: 25, lng: 65, distance: "1.2km", status: "Open", crowdLevel: "high" },
  { id: "5", type: "pandals", name: "Ekdalia Evergreen", lat: 70, lng: 55, distance: "1.5km", status: "Open", crowdLevel: "medium" },
  { id: "6", type: "toilets", name: "Public Facility - Esplanade", lat: 50, lng: 25, distance: "800m", status: "Open" },
  { id: "7", type: "police", name: "Police Booth - College Street", lat: 40, lng: 70, distance: "1km", status: "Active" },
  { id: "8", type: "medical", name: "Emergency Center - Shyambazar", lat: 55, lng: 45, distance: "1.3km", status: "24/7" },
];

const filterButtons = [
  { type: "all" as FilterType, label: "All", icon: MapPin, color: "bg-primary" },
  { type: "toilets" as FilterType, label: "Toilets", icon: Waves, color: "bg-blue-500" },
  { type: "police" as FilterType, label: "Police", icon: Shield, color: "bg-indigo-500" },
  { type: "medical" as FilterType, label: "Medical", icon: Heart, color: "bg-red-500" },
  { type: "pandals" as FilterType, label: "Pandals", icon: Church, color: "bg-[#f59e0b]" },
];

const getMarkerColor = (type: FilterType) => {
  switch (type) {
    case "toilets": return "text-blue-500";
    case "police": return "text-indigo-500";
    case "medical": return "text-red-500";
    case "pandals": return "text-[#f59e0b]";
    default: return "text-primary";
  }
};

export function MapScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const filteredMarkers = activeFilter === "all" 
    ? markers 
    : markers.filter(m => m.type === activeFilter);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-card/95 backdrop-blur-sm border-b p-4 flex items-center gap-3">
        <Button 
          size="icon" 
          variant="ghost"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="flex-1">Map View</h2>
        <Button 
          size="icon" 
          variant="ghost"
        >
          <Navigation2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Map Area */}
      <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50 relative pt-16 pb-32">
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-200 rounded-full blur-3xl"></div>
        </div>

        {/* User Location */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full opacity-30 animate-ping"></div>
            <div className="relative w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
          </div>
        </div>

        {/* Map Markers */}
        {filteredMarkers.map((marker) => (
          <button
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110"
            style={{ top: `${marker.lat}%`, left: `${marker.lng}%` }}
            onClick={() => setSelectedMarker(marker)}
          >
            <MapPin 
              className={`h-10 w-10 ${getMarkerColor(marker.type)} fill-current drop-shadow-lg`}
            />
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="absolute bottom-24 left-0 right-0 px-4">
        <div className="bg-card rounded-2xl shadow-lg p-3 flex gap-2 overflow-x-auto">
          {filterButtons.map((button) => {
            const Icon = button.icon;
            const isActive = activeFilter === button.type;
            return (
              <button
                key={button.type}
                onClick={() => setActiveFilter(button.type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                  isActive 
                    ? `${button.color} text-white shadow-md` 
                    : "bg-muted hover:bg-accent"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{button.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Marker Info */}
      {selectedMarker && (
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <Card className="p-4 shadow-xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="capitalize">
                    {selectedMarker.type}
                  </Badge>
                  <span className="text-xs text-green-600">{selectedMarker.status}</span>
                  {selectedMarker.crowdLevel && (
                    <Badge 
                      variant={selectedMarker.crowdLevel === "high" ? "destructive" : "outline"}
                      className="capitalize"
                    >
                      {selectedMarker.crowdLevel} crowd
                    </Badge>
                  )}
                </div>
                <h4>{selectedMarker.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  📍 {selectedMarker.distance} away
                </p>
              </div>
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => setSelectedMarker(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                className="flex-1"
                onClick={() => navigate(`/navigate/${selectedMarker.type}/${selectedMarker.id}`)}
              >
                <Navigation2 className="h-4 w-4 mr-2" />
                Navigate
              </Button>
              <Button variant="outline">Details</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}