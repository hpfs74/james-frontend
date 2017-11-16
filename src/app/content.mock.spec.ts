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
  phone: testLink,
  footer: {
    solutions: {
      title: 'Oplossingen',
      links: [
        { title: 'Sparen', url: 'https://www.knab.nl/sparen' },
        { title: 'Betalen', url: 'https://www.knab.nl/betalen' },
        { title: 'Beleggen', url: 'https://www.knab.nl/beleggen' },
        { title: 'Financieel overzicht', url: 'https://www.knab.nl/financieel-overzicht' },
        { title: 'Hypotheken', url: 'https://www.knab.nl/hypotheken' },
        { title: 'Crowdfunding', url: 'https://www.knab.nl/crowdfunding-investeren-lenen' },
        { title: 'Verzekeren', url: 'https://www.knab.nl/verzekeren' }
      ]
    },
    packages: {
      title: 'Pakketten',
      links: [
        { title: 'Plus', url: 'https://www.knab.nl/knab-plus' },
        { title: 'Premium', url: 'https://www.knab.nl/knab-premium' },
        { title: 'Zakelijk', url: 'https://www.knab.nl/knab-zakelijk' },
        { title: 'Bereken je voordeel', url: 'https://www.knab.nl/banken-vergelijken' },
        { title: 'Rente & tarieven', url: 'https://www.knab.nl/rente-tarieven' }
      ]
    },
    about: {
      title: 'Over Knab',
      links: [
        { title: 'Wat is Knab', url: 'https://www.knab.nl/wat-is-knab' },
        { title: 'Je geld is veilig', url: 'https://www.knab.nl/veiligheid' },
        { title: 'Pers', url: 'https://www.knab.nl/pers' },
        { title: 'Werken bij Knab', url: 'https://www.werkenbijknab.nl', 'new_page': true }
      ]
    },
    service_contact: {
      title: 'Service & contact',
      links: [
        { title: 'Bibliotheek', url: 'https://bieb.knab.nl' },
        { title: 'Forum', url: 'https://community.knab.nl' },
        { title: 'Blog', url: 'https://blog.knab.nl' },
        {
          title: 'Veelgestelde vragen',
          url: 'https://www.knab.nl/contact/veelgestelde-vragen'
        },
        { title: 'Overstapservice', url: 'https://www.knab.nl/betalen/overstapservice' },
        { title: 'Contact', url: 'https://www.knab.nl/contact' }
      ]
    },
    social: {
      links: [
        {
          title: 'facebook',
          url: 'https://www.facebook.com/knab.nl',
          icon: 'fa-facebook-square'
        },
        { title: 'twitter', url: 'https://twitter.com/@knab_nl', icon: 'fa-twitter-square' },
        {
          title: 'linkedin',
          url: 'https://www.linkedin.com/company/knab',
          icon: 'fa-linkedin-square'
        },
        {
          title: 'google plus',
          url: 'https://plus.google.com/+KnabNL/posts',
          icon: 'fa-google-plus-square'
        },
        {
          title: 'youtube',
          url: 'https://www.youtube.com/channel/UCbE7S5QalEvWDVTk_5HWzxA',
          icon: 'fa-youtube-square'
        }
      ]
    },
    policies: {
      links: [
        { title: 'Privacybeleid', url: 'https://www.knab.nl/privacybeleid', delimiter: '-' },
        {
          title: 'Belangenbeleid',
          url: 'https://www.knab.nl/belangenbeleid',
          delimiter: '-'
        },
        { title: 'Disclaimer', url: 'https://www.knab.nl/disclaimer', delimiter: '-' },
        { title: 'Cookie-instellingen', url: 'https://www.knab.nl/cookies' }
      ]
    }
  }
};

export const ContentConfigMock = {
  getContent: () => mockContent,
  getKey: (key: string) => mockContent[key]
};