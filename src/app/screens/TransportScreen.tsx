import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { 
  ArrowLeft, 
  MapPin,
  Train,
  Bus,
  Car,
  Navigation2,
  Clock,
  IndianRupee
} from "lucide-react";

interface Transport {
  id: string;
  type: "metro" | "bus" | "taxi" | "auto";
  name: string;
  distance: string;
  walkingTime: string;
  estimatedCost?: string;
  nextArrival?: string;
  route?: string;
}

const transports: Transport[] = [
  {
    id: "1",
    type: "metro",
    name: "Park Street Metro Station",
    distance: "300m",
    walkingTime: "4 min",
    nextArrival: "3 min",
    route: "Dakshineswar - Kavi Subhash"
  },
  {
    id: "2",
    type: "metro",
    name: "Esplanade Metro Station",
    distance: "800m",
    walkingTime: "10 min",
    nextArrival: "8 min",
    route: "Dakshineswar - Kavi Subhash"
  },
  {
    id: "3",
    type: "bus",
    name: "Bus Stop - Park Street",
    distance: "200m",
    walkingTime: "3 min",
    route: "Route 30, 7A, 8B"
  },
  {
    id: "4",
    type: "bus",
    name: "Bus Stop - Gariahat",
    distance: "500m",
    walkingTime: "6 min",
    route: "Route 45, 29"
  },
  {
    id: "5",
    type: "taxi",
    name: "Taxi Stand - Park Street",
    distance: "150m",
    walkingTime: "2 min",
    estimatedCost: "₹150-200"
  },
  {
    id: "6",
    type: "auto",
    name: "Auto Stand - Gariahat",
    distance: "400m",
    walkingTime: "5 min",
    estimatedCost: "₹80-120"
  }
];

const getTransportIcon = (type: string) => {
  switch (type) {
    case "metro": return Train;
    case "bus": return Bus;
    case "taxi": return Car;
    case "auto": return Car;
    default: return MapPin;
  }
};

const getTransportColor = (type: string) => {
  switch (type) {
    case "metro": return "bg-blue-500";
    case "bus": return "bg-green-500";
    case "taxi": return "bg-yellow-500";
    case "auto": return "bg-orange-500";
    default: return "bg-gray-500";
  }
};

export function TransportScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            size="icon" 
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-white text-xl flex-1">Transport Options</h2>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white transition-colors">
            <Train className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Metro</span>
          </button>
          <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white transition-colors">
            <Bus className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Bus</span>
          </button>
          <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white transition-colors">
            <Car className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Taxi</span>
          </button>
          <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white transition-colors">
            <Car className="h-6 w-6 mx-auto mb-1" />
            <span className="text-xs">Auto</span>
          </button>
        </div>
      </div>

      {/* Transport Options */}
      <div className="p-4 space-y-3">
        <p className="text-sm text-muted-foreground mb-2">
          {transports.length} transport options nearby
        </p>

        {transports.map((transport) => {
          const Icon = getTransportIcon(transport.type);
          return (
            <Card key={transport.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`${getTransportColor(transport.type)} p-3 rounded-xl text-white`}>
                  <Icon className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm">{transport.name}</h4>
                    <Badge variant="outline" className="text-xs capitalize">
                      {transport.type}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {transport.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {transport.walkingTime} walk
                    </span>
                  </div>

                  {transport.route && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {transport.route}
                    </p>
                  )}

                  <div className="flex items-center gap-3">
                    {transport.nextArrival && (
                      <Badge className="bg-green-50 text-green-700 text-xs">
                        Next in {transport.nextArrival}
                      </Badge>
                    )}
                    {transport.estimatedCost && (
                      <span className="text-xs flex items-center gap-1 text-muted-foreground">
                        <IndianRupee className="h-3 w-3" />
                        {transport.estimatedCost}
                      </span>
                    )}
                  </div>
                </div>

                <Button 
                  size="sm"
                  onClick={() => navigate(`/navigate/transport/${transport.id}`)}
                >
                  <Navigation2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Transport Tips */}
      <div className="p-4 mt-4">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="text-sm mb-2 text-blue-900">Transport Tips</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Metro is the fastest option during festival rush hours</li>
            <li>• Buses may face traffic delays near popular pandals</li>
            <li>• Use app-based taxis for safer night travel</li>
            <li>• Bargain auto fares before starting your journey</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}