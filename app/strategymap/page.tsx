import type { Metadata } from "next";

import { StrategyMapWebPage } from "@/components/strategy-map-page";

export const metadata: Metadata = {
  title: "Strategic alliances for success",
  description: "Strategic alliance map — Special Projects Initiative",
};

export default function StrategyMapPage() {
  return <StrategyMapWebPage />;
}
