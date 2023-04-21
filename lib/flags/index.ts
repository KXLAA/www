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
  return (feature: Feature) => {
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
  };
}

export function useFeature(feature: Feature) {
  const checkFeature = useFeatureCheck();

  return checkFeature(feature);
}
