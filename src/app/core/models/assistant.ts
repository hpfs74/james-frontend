import { Price } from '../../shared/models';
import { Car } from '../../car/models';

export class AssistantConfig {
  public avatar = {
    name: 'Lisa',
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
      niceCar: (car: Car) => `Gaaf! Je hebt een <strong>${car.make} ${car.model}`,
      coverage: {
        advice: (coverage: Price) => `Op basis van je situatie adviseer ik een <strong>${coverage.header}-dekking</strong>`
      },
      CL: `<strong>WA (Wettelijke Aansprakelijkheid):</strong> Met een WA beperkt casco dekking ben je naast de gewone
        WA ook verzekerd voor schade door brand of storm, ruitschade, diefstal en schade door aanrijding met dieren.`,
      CLC: `<strong>WA + Casco:</strong> naast schade aan anderen is ook brand- ruit- en diefstalschade van je eigen auto gedekt.`,
      CAR: `<strong>Allrisk:</strong> Met een Allrisk dekking ben je het meest gedekt. Met deze verzekering krijg je
        bijna alle schades vergoed – ook door eigen schuld – en heb je recht op vervangend vervoer bij onherstelbare schade.`,
      noClaimProtection: '',
      legalAid: `Deze extra dekking sluit je af vanaf &euro;3 per maand.<br>
        Juridische hulp nodig voor verhaal bij schade aan jouw auto? Conflict met je garage? Deze verzekering zorgt dat
        ervaren juristen je bijstaan.Dit geldt alleen voor verkeer rechtsbijstand en alleen voor deze auto.`,
      coverOccupants: '',
      advice: {
        result: 'Vergelijk de 4 beste deals van alle 42 vergeleken verzekeringen',
        option: 'Selecteer deze extra opties als je het best passende advies wil ontvangen!',
        next: 'Wat wil je doen?'
      },
      review: {
        unsupported: `Dit kan jouw nieuwe verzekering zijn! Lees de gegevens zorgvuldig door, zodat je een goed beeld
         krijgt van de verzekering.`,
        title: `In 3 minuten vraag je een verzekering aan:`,
        steps: `
        1. Check je persoonsgegevens <br>
        2. Vul je autogegevens in <br>
        3. Beantwoord de slotvragen <br>
        4. Vul je betaalgegevens in <br>
        5. Aanvraag wordt verstuurd <br>
        6. Akkoord? Zeg je oude verzekering op!`
      }
    },
    error: {
      carNotFound: 'Ik kan je auto niet vinden. Heb je het juiste kenteken ingevoerd?'
    },
    buy: {
      fill: 'We hebben nog wat gegevens nodig om je aanvraag te regelen. Kun je dit lijstje invullen?',
      check: (insurer: string) => `Je hebt gekozen voor ${insurer}. ${insurer} heeft nog enkele vragen voor je,
        voordat de aanvraag verstuurd kan worden.`,
      payment: 'Nog heel even! Van welk rekeningnummer mag je premie straks worden afgeschreven?',
      summary: 'We zijn er bijna! Kun je nog een keer de ingevulde gegevens controleren? Zo weet je zeker dat' +
        ' de verzekeraar de juiste informatie krijgt.',
      thankyou: `Gefeliciteerd met je nieuwe autoverzekering!  De polis van je autoverzekering is verstuurd
      en wordt binnen 3 dagen goedgekeurd. We houden je op de hoogte!`,
      finalEmail: (email: string) => `Een kopie van de polis is verstuurd naar: ${email}`
    },
    purchased: (firstName: string) => `Via de website krijg je op dit moment enkel advies. Wil je de verzekering beheren?
      Download dan de Knab Verzekeren app.`
  };
}
