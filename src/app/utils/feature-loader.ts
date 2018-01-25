import { FeatureConfig } from '@app/utils/feature-config';

export function FeatureLoader(featureService: FeatureConfig) {
  return () => featureService.load();
}
