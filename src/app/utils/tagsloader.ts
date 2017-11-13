import { TagsService } from '../core/services/tags.service';

export function TagsLoader(tagsService: TagsService) {
  return () => tagsService.load();
}
