import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { 
  ArrowLeft, 
  Phone, 
  Heart, 
  Shield,
  Share2,
  AlertCircle,
  MapPin,
  Users
} from "lucide-react";

const emergencyContacts = [
  {
    name: "Police",
    number: "100",
    icon: Shield,
    color: "bg-indigo-600 hover:bg-indigo-700"
  },
  {
    name: "Ambulance",
    number: "102",
    icon: Heart,
    color: "bg-red-600 hover:bg-red-700"
  },
  {
    name: "Fire",
    number: "101",
    icon: AlertCircle,
    color: "bg-orange-600 hover:bg-orange-700"
  }
];

const nearestEmergency = [
  {
    type: "Medical",
    name: "First Aid Center - Ballygunge",
    distance: "600m",
    time: "8 min walk",
    status: "Available"
  },
  {
    type: "Police",
    name: "Police Booth - Gariahat",
    distance: "400m",
    time: "5 min walk",
    status: "Active"
  }
];

export function EmergencyScreen() {
  const navigate = useNavigate();
  const [sosActivated, setSosActivated] = useState(false);

  const handleSOS = () => {
    setSosActivated(true);
    // In a real app, this would:
    // 1. Get user's current location
    // 2. Send to emergency contacts
    // 3. Alert nearby police
    setTimeout(() => {
      setSosActivated(false);
    }, 5000);
  };

  const shareLocation = () => {
    // Mock location sharing
    if (navigator.share) {
      navigator.share({
        title: 'My Location',
        text: 'I am at Durga Puja - Park Street, Kolkata',
        url: 'https://maps.google.com/?q=22.5726,88.3639'
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            size="icon" 
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/home")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-white text-xl flex-1">Emergency</h2>
        </div>

        {sosActivated && (
          <Alert className="bg-white/10 border-white/20 text-white mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              SOS Alert Sent! Emergency contacts notified. Help is on the way.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center text-white text-sm mb-2">
          Press and hold for 3 seconds
        </div>
        
        {/* SOS Button */}
        <button
          onMouseDown={() => {
            const timer = setTimeout(handleSOS, 3000);
            return () => clearTimeout(timer);
          }}
          className="w-full h-32 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-2xl border-4 border-white/40 transition-all active:scale-95 flex items-center justify-center"
        >
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-white mx-auto mb-2" />
            <div className="text-white text-xl">SOS MODE</div>
          </div>
        </button>
      </div>

      {/* Emergency Contacts */}
      <div className="p-6">
        <h3 className="mb-4">Emergency Helplines</h3>
        <div className="grid gap-3">
          {emergencyContacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <Button
                key={contact.number}
                className={`h-20 ${contact.color} text-white justify-between text-lg`}
                onClick={() => window.open(`tel:${contact.number}`)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8" />
                  <span>{contact.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{contact.number}</span>
                  <Phone className="h-6 w-6" />
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h3 className="mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="h-24 flex-col gap-2"
            onClick={shareLocation}
          >
            <Share2 className="h-8 w-8 text-primary" />
            <span className="text-sm">Share Location</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-24 flex-col gap-2"
            onClick={() => navigate("/map")}
          >
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-sm">View Map</span>
          </Button>
        </div>
      </div>

      {/* Nearest Emergency Services */}
      <div className="px-6 pb-6">
        <h3 className="mb-4">Nearest Emergency Services</h3>
        <div className="space-y-3">
          {nearestEmergency.map((service, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">
                      {service.type}
                    </span>
                    <span className="text-xs text-green-600">{service.status}</span>
                  </div>
                  <h4 className="text-sm mb-1">{service.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {service.distance}
                    </span>
                    <span>{service.time}</span>
                  </div>
                </div>
              </div>
              <Button 
                className="w-full mt-2"
                onClick={() => navigate(`/navigate/${service.type.toLowerCase()}/${index}`)}
              >
                Navigate Now
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Safety Info */}
      <div className="px-6 pb-6">
        <Card className="p-4 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="text-sm text-amber-900 mb-1">Emergency Contacts</h4>
              <p className="text-xs text-amber-800">
                Add emergency contacts in settings to automatically notify them when SOS is activated.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}