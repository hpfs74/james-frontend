

export function FeatureLoader(featureService: ContentConfig) {
  return () => contentService.load();
}
