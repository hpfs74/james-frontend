
import { ContentConfig } from '../content.config';

// Load config files before app bootstrap
export function ContentLoader(contentService: ContentConfig) {
  return () => contentService.load();
}
