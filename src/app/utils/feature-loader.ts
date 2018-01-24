import { FeatureConfigService } from '@app/utils/feature-config.service';

export function FeatureLoader(featureService: FeatureConfigService) {
  return () => featureService.load();
}
