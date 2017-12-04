import { Tag } from '../../core/models/tag';
import { Price } from '../../shared/models/price';

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
        highlight: false
      };
    });
};
