import React from "react";

import { keysOf } from "@/lib/keys-of";

import features from "./features.json";

export type Feature = keyof typeof features;
export type FeatureConfig = {
  environments: {
    production: {
      enabled: boolean;
    };
    development: {
      enabled: boolean;
    };
  };
};

export type FeatureSet = Record<Feature, FeatureConfig>;

export function useFeatureCheck() {
  return React.useCallback((feature: Feature) => {
    const featureConfig = features[feature];
    if (!featureConfig) return false;

    const { environments } = featureConfig;

    switch (process.env.NODE_ENV) {
      case "production":
        return environments.production.enabled;
      case "development":
        return environments.development.enabled;
      default:
        return false;
    }
  }, []);
}

export function useFeature(feature: Feature) {
  const checkFeature = useFeatureCheck();
  return React.useMemo(() => checkFeature(feature), [checkFeature, feature]);
}

export function useFeatures() {
  const checkFeature = useFeatureCheck();

  return React.useMemo(
    () =>
      keysOf(features).reduce(
        (acc, feature) => ({
          ...acc,
          [feature]: checkFeature(feature),
        }),
        {} as Record<Feature, boolean>
      ),
    [checkFeature]
  );
}
