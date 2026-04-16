"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { config } from "@/lib/config";

type FeatureKey  = keyof typeof config.features;
type FeaturesMap = { [K in FeatureKey]: boolean };

interface Ctx {
  features: FeaturesMap;
  toggle: (key: FeatureKey) => void;
}

const RuntimeFeaturesContext = createContext<Ctx | null>(null);

export function RuntimeFeaturesProvider({ children }: { children: ReactNode }) {
  const defaults = Object.fromEntries(
    Object.entries(config.features).map(([k, v]) => [k, v as boolean])
  ) as FeaturesMap;

  const [overrides, setOverrides] = useState<Partial<FeaturesMap>>({});

  const features: FeaturesMap = { ...defaults, ...overrides };

  function toggle(key: FeatureKey) {
    setOverrides((prev) => ({ ...prev, [key]: !features[key] }));
  }

  return (
    <RuntimeFeaturesContext.Provider value={{ features, toggle }}>
      {children}
    </RuntimeFeaturesContext.Provider>
  );
}

export function useRuntimeFeatures(): Ctx {
  const ctx = useContext(RuntimeFeaturesContext);
  if (!ctx) throw new Error("useRuntimeFeatures must be inside RuntimeFeaturesProvider");
  return ctx;
}
