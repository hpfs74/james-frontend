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

  public household = {
    welcome: `Ik ga je vandaag helpen besparen op je inboedelverzekering. Ben je er klaar voor? <b>Let's go!</b>`,
    premiums: 'Based on your detail we\'ve selected the following insurances for you. If you want to add some' +
              'additional coverage, just change it below.',
    detail: `Dit zou jouw nieuwe verzekering kunnen zijn! Bekijk alle gegevens
             even goed om een goed beeld te krijgen van de verzekering.`,
    buy: `Leave your contact details to start requesting your new household insurance [additional copy here]`,
    thankYou: `Je verzekering is aangevraagd. Nu is het tijd om te relaxen en te genieten!`
  };

  public car = {
    welcome: `Hallo! Ik ben ${this.avatar.name}.
      Ik ga je helpen met de voordeligste autoverzekering die bij jou past.`,
    info: {
      houseHold: `Je premie kan veranderen afhankelijk van je huishoudelijke status`,
      niceCar: (car: Car) => `Gaaf! Je hebt een <strong>${car.make} ${car.model}`,
      coverage: {
        advice: (coverage: Price) => `Op basis van je situatie adviseer ik een <strong>${coverage.header}-dekking</strong>`
      },
      loan: `Je geeft aan dat je een lening hebt, daarom raad ik je een Allrisk dekking aan. Als je auto dan onherstelbaar
            beschadigd raakt, krijg je een vergoeding om een nieuwe te kopen. Bij een andere dekking krijg je die vergoeding
            niet en blijf je met een lening achter, terwijl je geen auto meer hebt.`,
      CL: `Met een WA dekking is alleen de schade die jij toebrengt aan anderen gedekt. Schade aan je eigen auto moet je dus
            zelf betalen. Dit is verstandig bij een auto die ouder is dan 10 jaar.`,
      CLC: `Met een WA beperkt casco dekking ben je naast de gewone WA dekking ook verzekerd voor schade door brand of
            storm, ruitschade, diefstal en schade door aanrijding met dieren.`,
      CAR: `Je hebt een vrij nieuwe auto of een lening, daarom raad ik je Allrisk dekking aan.
            Als je auto dan onherstelbaar beschadigd raakt, krijg je een vergoeding om een nieuwe te kopen.
            Bij een andere dekking krijg je die vergoeding niet en blijf je met een lening achter, terwijl je geen
            auto meer hebt. `,
      noClaimProtection: '',
      legalAid: `Deze extra dekking sluit je af vanaf &euro;3 per maand.<br>
        Juridische hulp nodig voor verhaal bij schade aan jouw auto? Conflict met je garage? Deze verzekering zorgt dat
        ervaren juristen je bijstaan.Dit geldt alleen voor verkeer rechtsbijstand en alleen voor deze auto.`,
      coverOccupants: '',
      advice: {
        result: 'Vergelijk de 4 beste deals van alle 42 vergeleken verzekeringen',
        option: 'Maak hieronder de keuzes die passen bij jouw situatie. Zo krijg je een nog persoonlijker advies.',
        next: 'Wat wil je doen?'
      },
      review: {
        unsupported: `Dit kan jouw nieuwe verzekering zijn! Lees de gegevens zorgvuldig door, zodat je een goed beeld
         krijgt van de verzekering.`,
        title: `We maken ervan.
        In 3 minuten vraag je deze autoverzekering aan.`,
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
      thankyou: `Goed nieuws! We hebben je aanvraag ontvangen en wij gaan deze indienen bij de verzekeraar. We houden je op de hoogte!`,
      finalEmail: (email: string) => `Een kopie van je aanvraag is verstuurd naar ${email}`
    },
    purchased: {
      with: {
        insurances: (firstName: string) => `Hoi ${firstName}! In dit overzicht zie je al jouw aangevraagde verzekeringen.
        Wil je een nieuwe aanvraag doen? Vul dan de adviestool in!`
      },
      without: {
        insurances: (firstName: string) => `Hoi ${firstName}! Je hebt nog geen verzekering aangevraagd.
        Vul de adviestool in en check of jij je voordeliger kunt verzekeren.`
      }
    }
  };


}
