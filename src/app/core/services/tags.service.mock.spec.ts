export const TagsServiceMock = {
  load: () => null,
  getByKey: (key: string) => {
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
