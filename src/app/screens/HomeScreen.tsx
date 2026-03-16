import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { FloatingEmergencyButton } from "../components/FloatingEmergencyButton";
import { 
  Search, 
  MapPin, 
  Waves, 
  Shield, 
  Heart, 
  Church, 
  Bus,
  AlertCircle,
  Navigation
} from "lucide-react";

const quickAccessButtons = [
  {
    icon: Waves,
    label: "Find Toilets",
    route: "/toilets",
    color: "bg-blue-500"
  },
  {
    icon: Shield,
    label: "Police Booths",
    route: "/police",
    color: "bg-indigo-500"
  },
  {
    icon: Heart,
    label: "Emergency",
    route: "/emergency",
    color: "bg-red-500"
  },
  {
    icon: Church,
    label: "Pandals",
    route: "/pandals",
    color: "bg-[#f59e0b]"
  },
  {
    icon: Bus,
    label: "Transport",
    route: "/transport",
    color: "bg-green-500"
  },
  {
    icon: MapPin,
    label: "Full Map",
    route: "/map",
    color: "bg-purple-500"
  }
];

const nearbyFacilities = [
  {
    type: "Toilet",
    name: "Community Toilet - Park Street",
    distance: "250m",
    time: "3 min walk",
    status: "Open",
    rating: 4.2
  },
  {
    type: "Police",
    name: "Police Booth - Gariahat",
    distance: "400m",
    time: "5 min walk",
    status: "Active",
    rating: null
  },
  {
    type: "Medical",
    name: "First Aid Center - Ballygunge",
    distance: "600m",
    time: "8 min walk",
    status: "Available",
    rating: 4.5
  }
];

export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#c62828] to-[#b71c1c] p-6 rounded-b-3xl shadow-lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl mb-1">শুভ দুর্গা পুজা</h1>
              <p className="text-white/80 text-sm">Kolkata, West Bengal</p>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate("/emergency")}
            >
              <AlertCircle className="h-6 w-6" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for pandals, services..."
              className="pl-12 h-12 bg-white border-0 shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className="p-6">
        <h3 className="mb-4">Quick Access</h3>
        <div className="grid grid-cols-3 gap-4">
          {quickAccessButtons.map((button) => {
            const Icon = button.icon;
            return (
              <button
                key={button.route}
                onClick={() => navigate(button.route)}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card hover:bg-accent transition-colors"
              >
                <div className={`${button.color} p-4 rounded-xl text-white shadow-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs text-center">{button.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Preview */}
      <div className="px-6 mb-6">
        <Card 
          className="h-48 bg-muted rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow relative"
          onClick={() => navigate("/map")}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Navigation className="h-12 w-12 mx-auto text-primary" />
              <p className="text-sm">Tap to view full map</p>
            </div>
          </div>
          {/* Mock Map Markers */}
          <div className="absolute top-1/4 left-1/3">
            <MapPin className="h-6 w-6 text-red-500 fill-red-500" />
          </div>
          <div className="absolute top-1/2 left-1/2">
            <MapPin className="h-6 w-6 text-blue-500 fill-blue-500" />
          </div>
          <div className="absolute bottom-1/4 right-1/3">
            <MapPin className="h-6 w-6 text-green-500 fill-green-500" />
          </div>
        </Card>
      </div>

      {/* Nearest Facilities */}
      <div className="px-6">
        <h3 className="mb-4">Nearest Facilities Around You</h3>
        <div className="space-y-3">
          {nearbyFacilities.map((facility, index) => (
            <Card key={index} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {facility.type}
                    </span>
                    <span className="text-xs text-green-600">{facility.status}</span>
                  </div>
                  <h4 className="text-sm mb-1">{facility.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {facility.distance}
                    </span>
                    <span>{facility.time}</span>
                    {facility.rating && (
                      <span>⭐ {facility.rating}</span>
                    )}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigate(`/navigate/${facility.type.toLowerCase()}/${index}`)}
                >
                  Navigate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}