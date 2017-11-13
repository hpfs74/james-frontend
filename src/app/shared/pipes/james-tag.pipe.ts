import { Pipe, PipeTransform } from '@angular/core';

import { TagsService } from '../../core/services/tags.service';

@Pipe({ name: 'jamesTag' })
export class JamesTagPipe implements PipeTransform {
  constructor(private tagsService: TagsService) {}

  transform(value: string, key: string): string {
    return this.tagsService.getTranslationText(key, value);
  }
}
