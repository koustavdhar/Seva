import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { 
  ArrowLeft, 
  MapPin,
  Clock,
  Users,
  Star,
  TrendingUp,
  Navigation2
} from "lucide-react";

interface Pandal {
  id: string;
  name: string;
  location: string;
  distance: string;
  walkingTime: string;
  rating: number;
  crowdLevel: "low" | "medium" | "high";
  waitTime: string;
  imageUrl: string;
  trending?: boolean;
}

const pandals: Pandal[] = [
  {
    id: "1",
    name: "Kumartuli Park Puja",
    location: "North Kolkata",
    distance: "1.2km",
    walkingTime: "15 min",
    rating: 4.8,
    crowdLevel: "high",
    waitTime: "45 min",
    imageUrl: "https://images.unsplash.com/photo-1699027611141-bd57b5f0c88e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJnYSUyMHB1amElMjBwYW5kYWwlMjBrb2xrYXRhJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzczNjQ3NDMwfDA&ixlib=rb-4.1.0&q=80&w=400",
    trending: true
  },
  {
    id: "2",
    name: "Ekdalia Evergreen",
    location: "South Kolkata",
    distance: "1.5km",
    walkingTime: "19 min",
    rating: 4.7,
    crowdLevel: "medium",
    waitTime: "20 min",
    imageUrl: "https://images.unsplash.com/photo-1759844161220-9e85adf74373?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJnYSUyMGdvZGRlc3MlMjBpZG9sJTIwZGVjb3JhdGlvbnxlbnwxfHx8fDE3NzM2NDc0MzF8MA&ixlib=rb-4.1.0&q=80&w=400",
    trending: true
  },
  {
    id: "3",
    name: "Badamtala Ashar Sangha",
    location: "Central Kolkata",
    distance: "2km",
    walkingTime: "25 min",
    rating: 4.6,
    crowdLevel: "high",
    waitTime: "60 min",
    imageUrl: "https://images.unsplash.com/photo-1772304830516-cd64bbd0ef17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZhbCUyMGNyb3dkJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczNjQ3NDMxfDA&ixlib=rb-4.1.0&q=80&w=400"
  },
  {
    id: "4",
    name: "Suruchi Sangha",
    location: "New Alipore",
    distance: "3km",
    walkingTime: "38 min",
    rating: 4.9,
    crowdLevel: "low",
    waitTime: "10 min",
    imageUrl: "https://images.unsplash.com/photo-1699027611141-bd57b5f0c88e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdXJnYSUyMHB1amElMjBwYW5kYWwlMjBrb2xrYXRhJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzczNjQ3NDMwfDA&ixlib=rb-4.1.0&q=80&w=400"
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

export function PandalDiscoveryScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const filteredPandals = activeTab === "trending" 
    ? pandals.filter(p => p.trending)
    : pandals;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            size="icon" 
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-white text-xl flex-1">Discover Pandals</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full bg-white/20 backdrop-blur-sm">
            <TabsTrigger value="all" className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-foreground">
              All
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-foreground">
              <TrendingUp className="h-4 w-4 mr-1" />
              Trending
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Pandals List */}
      <div className="p-4 space-y-4">
        {filteredPandals.map((pandal) => (
          <Card key={pandal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image */}
            <div className="relative h-48 bg-muted">
              <ImageWithFallback
                src={pandal.imageUrl}
                alt={pandal.name}
                className="w-full h-full object-cover"
              />
              {pandal.trending && (
                <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <h3 className="text-white">{pandal.name}</h3>
                <p className="text-white/80 text-sm">{pandal.location}</p>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {pandal.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {pandal.walkingTime}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm">{pandal.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={getCrowdColor(pandal.crowdLevel)}>
                    <Users className="h-3 w-3 mr-1" />
                    {pandal.crowdLevel} crowd
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    ~{pandal.waitTime} wait
                  </span>
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={() => navigate(`/navigate/pandal/${pandal.id}`)}
              >
                <Navigation2 className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}