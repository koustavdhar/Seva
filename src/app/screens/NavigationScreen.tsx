import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  ArrowLeft, 
  Navigation,
  MapPin,
  Clock,
  Footprints,
  Phone,
  Share2
} from "lucide-react";

const mockRoutes: { [key: string]: any } = {
  "toilet-1": {
    name: "Community Toilet - Park Street",
    distance: "250m",
    duration: "3 min",
    type: "Walking"
  },
  "police-1": {
    name: "Police Booth - Gariahat",
    distance: "400m",
    duration: "5 min",
    type: "Walking"
  },
  "pandal-1": {
    name: "Kumartuli Park Puja",
    distance: "1.2km",
    duration: "15 min",
    type: "Walking"
  }
};

export function NavigationScreen() {
  const navigate = useNavigate();
  const { type, id } = useParams();
  
  const routeKey = `${type}-${id}`;
  const route = mockRoutes[routeKey] || {
    name: "Destination",
    distance: "500m",
    duration: "7 min",
    type: "Walking"
  };

  const steps = [
    "Head north on Park Street",
    "Turn right onto Camac Street",
    "Continue straight for 200m",
    "Destination will be on your right"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            size="icon" 
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 text-white">
            <p className="text-sm opacity-80">Navigating to</p>
            <h2 className="text-lg">{route.name}</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-center">
            <MapPin className="h-5 w-5 text-white mx-auto mb-1" />
            <div className="text-white text-sm">{route.distance}</div>
            <div className="text-white/60 text-xs">Distance</div>
          </div>
          <div className="text-center">
            <Clock className="h-5 w-5 text-white mx-auto mb-1" />
            <div className="text-white text-sm">{route.duration}</div>
            <div className="text-white/60 text-xs">Duration</div>
          </div>
          <div className="text-center">
            <Footprints className="h-5 w-5 text-white mx-auto mb-1" />
            <div className="text-white text-sm">{route.type}</div>
            <div className="text-white/60 text-xs">Mode</div>
          </div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="p-4">
        <Card className="h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-200 rounded-full blur-3xl"></div>
          </div>
          
          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full">
            <path
              d="M 50 200 Q 150 150 250 100"
              stroke="#c62828"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>

          {/* Start Point */}
          <div className="absolute bottom-12 left-12">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full opacity-30 animate-ping"></div>
              <div className="relative w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"></div>
            </div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap bg-white px-2 py-1 rounded shadow">
              You
            </span>
          </div>

          {/* End Point */}
          <div className="absolute top-12 right-12">
            <MapPin className="h-8 w-8 text-primary fill-primary drop-shadow-lg" />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap bg-white px-2 py-1 rounded shadow">
              Destination
            </span>
          </div>
        </Card>
      </div>

      {/* Turn-by-Turn Directions */}
      <div className="px-4 pb-4">
        <h3 className="mb-4">Turn-by-turn Directions</h3>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{step}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline"
            onClick={() => {
              // Open in Google Maps
              window.open(`https://www.google.com/maps/dir/?api=1&destination=22.5726,88.3639`);
            }}
          >
            <Navigation className="h-4 w-4 mr-2" />
            Open in Maps
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share Route
          </Button>
        </div>
      </div>

      {/* Safety Info */}
      {type === "police" || type === "medical" ? (
        <div className="px-4 pb-6">
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="h-5 w-5 text-red-600" />
              <h4 className="text-sm text-red-900">Emergency Contact</h4>
            </div>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => window.open("tel:100")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Emergency Services
            </Button>
          </Card>
        </div>
      ) : null}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t">
        <Button 
          className="w-full h-14"
          onClick={() => {
            // In a real app, this would start active turn-by-turn navigation
            alert("Starting navigation...");
          }}
        >
          <Navigation className="h-5 w-5 mr-2" />
          Start Navigation
        </Button>
      </div>
    </div>
  );
}
