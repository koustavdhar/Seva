import { useNavigate, useLocation } from "react-router";
import { Home, Map, Church, AlertCircle, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Map, label: "Map", path: "/map" },
  { icon: Church, label: "Pandals", path: "/pandals" },
  { icon: AlertCircle, label: "Emergency", path: "/emergency" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on splash or onboarding
  if (location.pathname === "/" || location.pathname === "/onboarding") {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t z-40 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "fill-primary/10" : ""}`} />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
