import { Address, Car, Price } from '.';

export class AssistantConfig {
  public avatar = {
    show: true,
    name: 'Marjolein',
    title: 'Expert verzekeringen'
  };

  public dashboard = {
    start: 'Waar wil je mee beginnen?',
    welcome: (firstName: string) =>
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
      houseHold: `<b>Approve message!</b> <br> Uw premie kan veranderen afhankelijk van de huishoudelijke status`,
      niceCar: (car: Car) => `Molto bello! Mooie auto die <strong>${car.make} ${car.model}`,
      coverage: {
        advice: (coverage: Price) => `Op basis van je situatie adviseer ik een <strong>${coverage.header} dekking</strong>`
      },
      noClaimProtection: '',
      legalAid: `Deze extra dekking sluit je af vanaf &euro;3 per maand.<br>
        Juridische hulp nodig voor verhaal bij schade aan jouw auto? Conflict met je garage? Deze verzekering zorgt dat
        ervaren juristen je bijstaan.Dit geldt alleen voor verkeer rechtsbijstand en alleen voor deze auto.`,
      coverOccupants: '',
      advice: {
        result: 'Vergelijk de 4 beste deals van alle 42 vergeleken verzekeringen',
        option: 'Selecteer extra opties voor het beste advies',
        next: 'Wat wil je doen?'
      },
      review: {
        title: `Controleer uw gegevens dat een verzoek om af te sluiten te maken.`,

        list: `Het proces van het vullen van de aanvraag duurt ongeveer 5 minuten t omvat de volgende stappen:<br>
        1. Check je gegevens <br>
        2. Vul je autogegevens aan <br>
        3. Beantwoord slotvragen <br>
        4. Vul je betaalgegevens in <br>
        5. Aanvraag naar de verzekeraar <br>
        6. Akkoord? Zeg je oude verzekering op.`
      }
    },
    error: {
      carNotFound: 'Ik kan je auto niet vinden. Heb je het juiste kenteken ingevoerd?'
    },
    buy: {
      fill: 'We hebben nog een paar gegevens van je nodig om je aanvraag te regelen. Kun je dit lijstje aanvullen?',
      check: 'Je hebt gekozen voor Avéro Achmea. Avéro Achmea heeft nog een paar vragen voor je voordat we je aanvraag kunnen versturen.',
      payment: 'Nog heel even! Van welk rekeningnummer mag je premie straks worden afgeschreven?'
    }
  };
}
