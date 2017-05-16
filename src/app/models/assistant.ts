import { Address } from './address';
import { Price } from './price';

export interface AssistantConfig {
  avatar: {
    show: boolean;
    name: string;
    title: string;
  };
  generic: any;
  dashboard?: any;
  car?: any;
}

export class AppAssistantConfig implements AssistantConfig {
  public avatar = {
    show: true,
    name: 'Marjolein',
    title: 'Expert verzekeringen'
  };

  public generic = {
    address: (address: Address) => `Ik heb je adres gevonden. Woon je op <strong>${address.street} in ${address.city}</strong>?`
  };

  public dashboard = {
    welcome:
    `Verzekeringen die je via Knab afsluit staan automatisch in je overzicht.
    Maar ook je bestaande verzekeringen voeg je gemakkelijk toe. Super handig!`,
    start: 'Waar wil je mee beginnen?'
  };

  public car = {
    welcome: (firstname: string) =>
      `Hallo ${firstname}! Ik ben ${this.avatar.name}.
      Ik ga je vandaag helpen <strong>besparen</strong> op je autoverzekering.
      Ben je er klaar voor? Let\'s do this!`,
    info: {
      damageFreeYears:
        `De <strong>schadevrije jaren</strong> vind je op je meest recente polis.<br>
        Je bouwt schadevrije jaren op als een auto op jouw naam is verzekerd. Schadevrije jaren geven je
        korting op de premie. Elk jaar dat je geen schade claimt, bouw je 1 schadevrij jaar op. Elke keer
        dat je wel een schade claimt die jouw schuld is, verlies je 5 of meer jaren.`,
      adviceResult: 'Dit zijn de 4 beste verzekeringen voor jouw auto. Je kunt er een kiezen of je wensen aanpassen.',
      nextAction: 'Wat wil je doen?'
    },
    error: {
      carNotFound: 'Ik kan je auto niet vinden. Heb je het juiste kenteken ingevoerd?'
    },
    coverageAdvice: (coverage: Price) => `Op basis van je situatie adviseer ik een <strong>${coverage.header} dekking</strong>`
  };
}
