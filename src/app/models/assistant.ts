import { Address, Car, Price } from '.';

export class AssistantConfig {
  public avatar = {
    show: true,
    name: 'Marjolein',
    title: 'Expert verzekeringen'
  };

  public generic = {
    address: (address: Address) => `Ik heb je adres gevonden. Woon je op <strong>${address.street} in ${address.city}</strong>?`,
    addressNotFound: 'Helaas kon ik je adres niet vinden. Heb je je postcode en huisnummer juist ingevoerd?'
  };

  public dashboard = {
    start: 'Waar wil je mee beginnen?',
    welcome:
      (firstName: string) =>
        `Hoi <strong>${firstName}</strong>, ik ben je persoonlijke verzekeringsassistent.
        Verzekeringen die je via Knab afsluit staan automatisch in je overzicht.
        Maar ook je bestaande verzekeringen voeg je gemakkelijk toe.`,
    detail: (insuranceType: string) => `Wat wil je doen met je ${insuranceType} verzekering?`,
    addInsurance: 'Voeg verzekeringen toe aan het overzicht en  ik zoek uit het beter kan.'
  };

  public car = {
    welcome: `Hallo! Ik ben ${this.avatar.name}.
      Ik ga je vandaag helpen <strong>besparen</strong> op je autoverzekering.
      Ben je er klaar voor? Let\'s do this!`,
    info: {
      niceCar: (car: Car) => `Molto bello! Mooie auto die <strong>{{ car.make | titleCase }} {{ car.model | titleCase }}`,
      claimFreeYears:
      `De <strong>schadevrije jaren</strong> vind je op je meest recente polis.<br>
        Je bouwt schadevrije jaren op als een auto op jouw naam is verzekerd. Schadevrije jaren geven je
        korting op de premie. Elk jaar dat je geen schade claimt, bouw je 1 schadevrij jaar op. Elke keer
        dat je wel een schade claimt die jouw schuld is, verlies je 5 of meer jaren.`,
      coverage: {
        advice: (coverage: Price) => `Op basis van je situatie adviseer ik een <strong>${coverage.header} dekking</strong>`
      },
      noClaimProtection: '',
      legalAid:
      `Deze extra dekking sluit je af vanaf &euro;3 per maand.<br>
        Juridische hulp nodig voor verhaal bij schade aan jouw auto? Conflict met je garage? Deze verzekering zorgt dat
        ervaren juristen je bijstaan.Dit geldt alleen voor verkeer rechtsbijstand en alleen voor deze auto.`,
      coverOccupants: '',
      advice: {
        result: 'Vergelijk de 4 beste deals van alle 42 vergeleken verzekeringen',
        option: 'Selecteer extra opties voor het beste advies',
        next: 'Wat wil je doen?'
      },
      review: `Verzekering aanvragen dit kost ongeveer 5 minuten: <br>
      1. Check je gegevens <br>
      2. Vul je autogegevens aan <br>
      3. Beantwoord slotvragen <br>
      4. Vul je betaalgegevens in <br>
      5. Aanvraag naar de verzekeraar 6. Akkoord? Zeg je oude verzekering op.`
    },
    error: {
      carNotFound: 'Ik kan je auto niet vinden. Heb je het juiste kenteken ingevoerd?'
    },
    buy: {
      fill: 'We hebben nog een paar gegevens van je nodig om je aanvraag te regelen. Kun je dit lijstje aanvullen?',
      info: {
        reportingCode: `
          Elke auto heeft een eigen meldcode. Vraag je een verzekering aan, dan geef je altijd de meldcode op.
          De verzekeraar geeft dit door aan de RDW (Rijksdienst voor het Wegverkeer). De RDW houdt zo bij of alle
          auto's (tenminste WA) verzekerd zijn. Je vindt de meldcode van je auto op deel 1B van je kentekenbewijs.
          Het zijn de laatste 4 cijfers van het chassisnummer.`
      }
    }
  };
}
