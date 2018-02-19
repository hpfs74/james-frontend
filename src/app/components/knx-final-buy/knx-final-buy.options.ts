interface KNXFinalBuyOptionSection {
  logoUrl?: string;
  key?: string;
  value?: string | number;
  heading?: string;
  divider?: boolean;
}

interface KNXFinalBuyOptionButton {
  pending: boolean;
  onClick: (event: any) => void;
  classes?: string[];
}

export interface KNXFinalBuyOptions {
  sections: KNXFinalBuyOptionSection[];
  button: KNXFinalBuyOptionButton;
}

export const DefaultKNXFinalBuyOptions = {
  sections: [
    {
      logoUrl: 'https://cars.usnews.com/static/images/Auto/izmo/i27385197/2018_audi_a5_sportback_angularfront.jpg',
      divider: true
    },
    {
      heading: 'VVP Personenauto vrije keuze schadehersteller',
      key: 'WA + Beperkt Casco',
      divider: true
    },
    {
      key: 'WA + Beperkt Casco',
      value: '50 euro',
      divider: true
    }
  ],
  button: {
    pending: false,
    onClick: (event) => { }
  }
};
