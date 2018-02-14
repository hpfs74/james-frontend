export const TagsServiceMock = {
  load: () => null,
  getByKey: (key: string) => {

    if (key === 'house_hold_flow_coverages') {
      return [ {
        translation_text: 'Default coverage', tag: '{}'
      }];
    }

    return [
      { translation_text: 'Security 1', tag: 'class1' }
    ];
  },
  getTranslationText: () => 'myTest',
  getTranslationDescription: () => 'myDescription',
  getAsLabelValue: () => {
    return [
      { label: 'Security 1', value: 'class1' }
    ];
  }
};
