import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { 
  ArrowLeft, 
  MapPin, 
  Search,
  Navigation2,
  Star,
  Users,
  Baby,
  Clock
} from "lucide-react";

interface Toilet {
  id: string;
  name: string;
  distance: string;
  walkingTime: string;
  cleanliness: number;
  femaleFriendly: boolean;
  babyChanging: boolean;
  status: "open" | "closed";
  crowdLevel: "low" | "medium" | "high";
}

const toilets: Toilet[] = [
  {
    id: "1",
    name: "Community Toilet - Park Street",
    distance: "250m",
    walkingTime: "3 min",
    cleanliness: 4.2,
    femaleFriendly: true,
    babyChanging: true,
    status: "open",
    crowdLevel: "low"
  },
  {
    id: "2",
    name: "Public Facility - Esplanade",
    distance: "800m",
    walkingTime: "10 min",
    cleanliness: 3.8,
    femaleFriendly: true,
    babyChanging: false,
    status: "open",
    crowdLevel: "medium"
  },
  {
    id: "3",
    name: "Municipal Toilet - Gariahat",
    distance: "1.2km",
    walkingTime: "15 min",
    cleanliness: 3.5,
    femaleFriendly: false,
    babyChanging: false,
    status: "open",
    crowdLevel: "high"
  },
  {
    id: "4",
    name: "Modern Facility - Salt Lake",
    distance: "2km",
    walkingTime: "25 min",
    cleanliness: 4.5,
    femaleFriendly: true,
    babyChanging: true,
    status: "open",
    crowdLevel: "low"
  }
];

const getCrowdColor = (level: string) => {
  switch (level) {
    case "low": return "text-green-600 bg-green-50";
    case "medium": return "text-amber-600 bg-amber-50";
    case "high": return "text-red-600 bg-red-50";
    default: return "text-gray-600 bg-gray-50";
  }
};

export function ToiletFinderScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredToilets = toilets.filter(toilet =>
    toilet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            size="icon" 
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-white text-xl flex-1">Find Toilets</h2>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search toilet facilities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 bg-white border-0 shadow-md"
          />
        </div>
      </div>

      {/* Filter Tags */}
      <div className="p-4 flex gap-2 overflow-x-auto">
        <Badge variant="outline" className="whitespace-nowrap">
          👩 Female Friendly
        </Badge>
        <Badge variant="outline" className="whitespace-nowrap">
          👶 Baby Changing
        </Badge>
        <Badge variant="outline" className="whitespace-nowrap">
          ⭐ High Rating
        </Badge>
        <Badge variant="outline" className="whitespace-nowrap">
          ✓ Open Now
        </Badge>
      </div>

      {/* Results */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">
            {filteredToilets.length} facilities found
          </p>
          <Button variant="ghost" size="sm">
            Sort by distance
          </Button>
        </div>

        {filteredToilets.map((toilet) => (
          <Card key={toilet.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm">{toilet.name}</h4>
                  </div>
                  
                  {/* Distance & Time */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {toilet.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {toilet.walkingTime} walk
                    </span>
                  </div>

                  {/* Rating & Features */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm">{toilet.cleanliness}</span>
                    </div>
                    
                    {toilet.femaleFriendly && (
                      <Badge variant="secondary" className="text-xs">
                        👩 Female Friendly
                      </Badge>
                    )}
                    
                    {toilet.babyChanging && (
                      <Badge variant="secondary" className="text-xs">
                        👶 Baby Changing
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <Badge 
                    className={`${getCrowdColor(toilet.crowdLevel)} capitalize mb-2`}
                  >
                    <Users className="h-3 w-3 mr-1" />
                    {toilet.crowdLevel}
                  </Badge>
                  <div className="text-xs text-green-600">
                    {toilet.status === "open" ? "✓ Open" : "Closed"}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button 
                  className="flex-1"
                  onClick={() => navigate(`/navigate/toilet/${toilet.id}`)}
                >
                  <Navigation2 className="h-4 w-4 mr-2" />
                  Navigate
                </Button>
                <Button variant="outline">
                  Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}