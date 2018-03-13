import { FeatureConfigService } from '@app/core/services/feature-config.service';

export function FeatureLoader(featureService: FeatureConfigService) {
  return () => featureService.load();
}
