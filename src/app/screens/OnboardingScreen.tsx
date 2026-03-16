import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { MapPin, Shield, Heart, ChevronRight } from "lucide-react";

const onboardingSteps = [
  {
    icon: MapPin,
    title: "Find Essential Services",
    description: "Quickly locate nearby toilets, police booths, medical centers, and transport options while visiting pandals.",
    color: "text-[#c62828]"
  },
  {
    icon: Shield,
    title: "Stay Safe in Crowds",
    description: "Access emergency services, share your location, and get real-time safety information during the festival.",
    color: "text-[#f59e0b]"
  },
  {
    icon: Heart,
    title: "Enjoy Durga Puja",
    description: "Discover popular pandals, check crowd levels, and navigate the city with ease during Kolkata's biggest festival.",
    color: "text-[#fbbf24]"
  }
];

export function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/home");
    }
  };

  const handleSkip = () => {
    navigate("/home");
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip Button */}
      <div className="p-6 flex justify-end">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        <div className={`${step.color} transition-all duration-500`}>
          <Icon className="w-32 h-32" strokeWidth={1.5} />
        </div>

        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-3xl">{step.title}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="flex gap-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? "w-8 bg-primary" 
                  : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Next Button */}
      <div className="p-6">
        <Button 
          onClick={handleNext} 
          className="w-full h-14 text-lg"
          size="lg"
        >
          {currentStep < onboardingSteps.length - 1 ? (
            <>
              Next <ChevronRight className="ml-2 h-5 w-5" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </div>
  );
}
