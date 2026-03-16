import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Flower } from "lucide-react";

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c62828] via-[#d32f2f] to-[#b71c1c] flex items-center justify-center p-6">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-[#fbbf24] opacity-20 blur-3xl rounded-full animate-pulse"></div>
          <Flower className="w-24 h-24 text-[#fbbf24] mx-auto relative animate-bounce" strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-5xl text-white tracking-wide">সেবা</h1>
          <h2 className="text-2xl text-white/90">Durga Puja Seva</h2>
          <p className="text-white/80 text-sm">Festival Navigation & Safety</p>
        </div>

        <div className="flex justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}
