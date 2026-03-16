import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";

export function FloatingEmergencyButton() {
  const navigate = useNavigate();

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full shadow-2xl bg-red-600 hover:bg-red-700 text-white"
      onClick={() => navigate("/emergency")}
    >
      <AlertCircle className="h-8 w-8" />
    </Button>
  );
}
