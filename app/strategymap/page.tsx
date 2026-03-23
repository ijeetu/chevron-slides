import type { Metadata } from "next";

import { StrategyMapWebPage } from "@/components/strategy-map-page";

export const metadata: Metadata = {
  title: "Chevron Strategy Map",
  description: "Strategic alliance map — Special Projects Initiative",
};

export default function StrategyMapPage() {
  return <StrategyMapWebPage />;
}
