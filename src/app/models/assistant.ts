import { Address, Car, Price } from '.';

export class AssistantConfig {
  public avatar = {
    name: 'Marjolein',
    title: 'Expert verzekeringen'
  };

  public dashboard = {
    start: 'Waar wil je mee beginnen?',
    welcome: (firstName: string) =>
      (firstName ? `Hoi <strong>${firstName}</strong>,` : `Hoi,`) +
        ` ik ben je persoonlijke verzekeringsassistent.
        Verzekeringen die je via Knab afsluit staan automatisch in je overzicht.
        Maar ook je bestaande verzekeringen voeg je gemakkelijk toe.`,
    detail: (insuranceType: string) => `Wat wil je doen met je ${insuranceType} verzekering?`,
    addInsurance: 'Voeg verzekeringen toe aan het overzicht en  ik zoek uit het beter kan.'
  };

  public profile = {
    hello: `Vul hier je persoonlijke gegevens in.`
  };

  public car = {
    welcome: `Hallo! Ik ben ${this.avatar.name}.
      Ik ga je vandaag helpen <strong>besparen</strong> op je autoverzekering.
      Ben je er klaar voor? Let\'s do this!`,
    info: {
      houseHold: `Je premie kan veranderen afhankelijk van je huishoudelijke status`,
      niceCar: (car: Car) => `Molto bello! Mooie auto die <strong>${car.make} ${car.model}`,
      coverage: {
        advice: (coverage: Price) => `Op basis van je situatie adviseer ik een <strong>${coverage.header} dekking</strong>`
      },
      CL: `<strong>WA - Wettelijke Aansprakelijkheid:</strong> alleen schade die jij toebrengt aan anderen is gedekt.`,
      CLC: `<strong>Beperkt casco:</strong> naast schade aan anderen is ook brand- ruit- en diefstalschade van je eigen auto gedekt.`,
      CAR: `<strong>All risk:</strong> Schade aan anderen en vrijwel alle eigen schade is gedekt.`,
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
        unsupported: `Dit zou jouw nieuwe verzekering kunnen zijn! Bekijk alle gegevens even goed om
          een goed beeld te krijgen van de verzekering.`,
        title: `In 3 minuten doe je een aanvraag:`,
        steps: `
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
      payment: 'Nog heel even! Van welk rekeningnummer mag je premie straks worden afgeschreven?',
      summary: 'Voilà! Een overzicht van de verzekering die we voor je gaan aanvragen. Klopt alles zo?',
      thankyou: 'Je verzekering is aangevraagd. Nu is het tijd om te relaxen en te genieten!'
    }
  };
}
