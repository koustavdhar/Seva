import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { SplashScreen } from "./screens/SplashScreen";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { MapScreen } from "./screens/MapScreen";
import { ToiletFinderScreen } from "./screens/ToiletFinderScreen";
import { PoliceBoothScreen } from "./screens/PoliceBoothScreen";
import { EmergencyScreen } from "./screens/EmergencyScreen";
import { PandalDiscoveryScreen } from "./screens/PandalDiscoveryScreen";
import { TransportScreen } from "./screens/TransportScreen";
import { NavigationScreen } from "./screens/NavigationScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: SplashScreen,
      },
      {
        path: "onboarding",
        Component: OnboardingScreen,
      },
      {
        path: "home",
        Component: HomeScreen,
      },
      {
        path: "map",
        Component: MapScreen,
      },
      {
        path: "toilets",
        Component: ToiletFinderScreen,
      },
      {
        path: "police",
        Component: PoliceBoothScreen,
      },
      {
        path: "emergency",
        Component: EmergencyScreen,
      },
      {
        path: "pandals",
        Component: PandalDiscoveryScreen,
      },
      {
        path: "transport",
        Component: TransportScreen,
      },
      {
        path: "navigate/:type/:id",
        Component: NavigationScreen,
      },
    ],
  },
]);