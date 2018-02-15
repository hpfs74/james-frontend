import { Tag } from '@app/core/models/tag';
import { Price } from '@app/shared/models';

const coverageFeaturesMap = {
  CL: [
    'Schade die jij aan anderen toebrengt'
  ],
  CLC: [
    'Brand en storm',
    'Ruitschade',
    'Diefstal',
    'Schade door aanrijding met dieren'
  ],
  CAR: [
    'Schade door anderen',
    'Ruitschade',
    'Diefstal',
    'Inbraak',
    'Brand en storm',
    'Schade door vandalisme',
    'Schade door eigen schuld'
  ]
};

const dataAttributesMap = {
  CL: 'WA',
  CLC: 'WABC',
  CAR: 'WAWC'
};

export const createCarCoverages = (tags: Array<Tag>): Array<Price> => {
  return tags
    .filter((tag) => !tag.blocked)
    .sort((t1, t2) => t1.order - t2.order)
    .map((tag) => {
      return {
        id: tag.tag,
        header: tag.translation_text,
        badge: 'Wij bevelen dit aan:',
        features: coverageFeaturesMap[tag.tag],
        dataInactive: 'kies_' + dataAttributesMap[tag.tag],
        dataActive: 'toon_' + dataAttributesMap[tag.tag],
        highlight: false
      };
    });
};
