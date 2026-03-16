import { Outlet, useLocation } from "react-router";
import { BottomNav } from "./BottomNav";
import { FloatingEmergencyButton } from "./FloatingEmergencyButton";

const routesWithoutNav = ["/", "/onboarding"];

export function Layout() {
  const location = useLocation();
  const showNav = !routesWithoutNav.includes(location.pathname);

  return (
    <>
      <Outlet />
      {showNav && <BottomNav />}
      {showNav && <FloatingEmergencyButton />}
    </>
  );
}
