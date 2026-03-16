import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  Navigation2,
  Phone,
  Clock,
  Shield
} from "lucide-react";

interface PoliceBooth {
  id: string;
  name: string;
  distance: string;
  walkingTime: string;
  status: "active" | "busy";
  phone: string;
  officers: number;
}

const policeBooths: PoliceBooth[] = [
  {
    id: "1",
    name: "Police Booth - Gariahat",
    distance: "400m",
    walkingTime: "5 min",
    status: "active",
    phone: "100",
    officers: 3
  },
  {
    id: "2",
    name: "Police Booth - College Street",
    distance: "1km",
    walkingTime: "13 min",
    status: "active",
    phone: "100",
    officers: 4
  },
  {
    id: "3",
    name: "Police Station - Park Street",
    distance: "1.5km",
    walkingTime: "19 min",
    status: "active",
    phone: "033-2229-1234",
    officers: 8
  },
  {
    id: "4",
    name: "Police Booth - Ballygunge",
    distance: "2km",
    walkingTime: "25 min",
    status: "busy",
    phone: "100",
    officers: 2
  }
];

export function PoliceBoothScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            size="icon" 
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-white text-xl flex-1">Police Assistance</h2>
          <Button 
            size="icon"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => window.open("tel:100")}
          >
            <Phone className="h-5 w-5" />
          </Button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
          <p className="text-sm mb-2">Emergency Helpline</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl">100</span>
            <Button 
              size="sm" 
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => window.open("tel:100")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            {policeBooths.length} police booths nearby
          </p>
        </div>

        {policeBooths.map((booth) => (
          <Card key={booth.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    <h4 className="text-sm">{booth.name}</h4>
                  </div>
                  
                  {/* Distance & Time */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {booth.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {booth.walkingTime} walk
                    </span>
                  </div>

                  {/* Officers */}
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {booth.officers} officers on duty
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  <Badge 
                    className={booth.status === "active" 
                      ? "bg-green-50 text-green-700" 
                      : "bg-amber-50 text-amber-700"
                    }
                  >
                    {booth.status === "active" ? "✓ Active" : "Busy"}
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button 
                  variant="outline"
                  onClick={() => window.open(`tel:${booth.phone}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => navigate(`/navigate/police/${booth.id}`)}
                >
                  <Navigation2 className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Safety Tips */}
      <div className="p-4 mt-4">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="text-sm mb-2 text-blue-900">Safety Tips</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Keep emergency number 100 saved in your phone</li>
            <li>• Stay in well-lit and crowded areas</li>
            <li>• Share your location with family members</li>
            <li>• Keep your belongings secure in crowds</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}