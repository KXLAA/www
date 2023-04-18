import features from "./features.json";

export type Feature = keyof typeof features;
export type FeatureConfig = {
  enabled: boolean;
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
  return (feature: Feature) => {
    const featureConfig = features[feature];

    if (!featureConfig) return false;

    const { environments } = featureConfig;

    if (process.env.NODE_ENV === "production") {
      return environments.production.enabled;
    }

    if (process.env.NODE_ENV === "development") {
      return environments.development.enabled;
    }

    return false;
  };
}

export function useFeature(feature: Feature) {
  const checkFeature = useFeatureCheck();

  const isPermitted = checkFeature(feature);

  return isPermitted;
}
