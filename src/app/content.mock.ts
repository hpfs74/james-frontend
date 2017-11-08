import { Content } from './content.config';

const testString = '';
const testLink = {
  label: testString,
  link: testString
};

const mockContent = {
  appStore: {
    iOS: 'itunes.apple.com',
    android: 'play.google.com'
  },
  externalLinks: {
    privacyStatement: testString,
    termsAndConditions: testString,
    serviceGuide: testString
  },
  email: {
    phishing: testLink
  },
  phone: testLink
};

export const ContentConfigMock = {
  getContent: () => mockContent,
  getKey: (key: string) => mockContent[key]
};
