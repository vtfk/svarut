# SvarUt
This node module lets you use [SvarUt](https://www.ks.no/fagomrader/digitalisering/felleslosninger/svar-inn-og-svar-ut/)'s [ForsendelseRestServiceV1](https://ks-no.github.io/svarut/integrasjon/forsendelserestservicev1/) from node without having to think about the REST enpoints. It also verifies that the data provided is valid upon sending. 


## Installation
Use npm to install:
```
npm install @vtfk/svarut
```

## Usage

Please take a look at the [forsendelse](https://github.com/vtfk/svarut/blob/master/src/schemas/forsendelse.json) schema.

### First - init svarut instance
```javascript
const options = {
  username: 'svarut-username',
  password: 'svarut-password',
  url: 'svarut-url', // optional
  timeout: 5000 // optional, defaults to 16 minutes
}

const svarut = require('@vtfk/svarut')(options)
```

### sendForsendelse (simple)
```javascript
const forsendelse = {
  tittel: 'testforsendelse',
  mottaker: {
    postAdresse: {
      navn: 'Terje Tverrtryne',
      adresse1: 'Skogsveien 42',
      postNummer: '3710',
      postSted: 'Skien',
      land: 'Norge'
    },
    digitalAdresse: {
      fodselsNummer: '01029400475'
    }
  },
  dokumenter: [
    {
      filnavn: 'test.pdf',
      mimeType: 'application/pdf',

      // Send file from disk:
      filePath: 'test/data/test.pdf',

      // Or from base64 data:
      data: base64EncodedFile
    }
  ],
  utskriftsKonfigurasjon: {
    utskriftMedFarger: false,
    tosidig: true
  }
}

const result = svarut.sendForsendelse(forsendelse)
```

Output:
```json
{ "id": "d24658e8-d65d-4c3e-b201-564b5e880cde" }
```

### sendForsendelse (signing)
```javascript
const forsendelse = {
  tittel: 'Test signeringsforsendelse #10',
  eksternReferanse: '12345',
  mottaker: {
    postAdresse: {
      navn: 'Terje Tverrtryne',
      adresse1: 'Skogsveien 42',
      postNummer: '3710',
      postSted: 'Skien',
      land: 'Norge'
    },
    digitalAdresse: {
      fodselsNummer: '01029400475'
    }
  },
  dokumenter: [
    {
      filnavn: 'test.pdf',
      mimeType: 'application/pdf',
      filePath: 'test/data/test.pdf',
      skalSigneres: true
    }
  ],
  utskriftsKonfigurasjon: {
    utskriftMedFarger: false,
    tosidig: true
  },
  signaturType: 'AUTENTISERT_SIGNATUR', // AUTENTISERT_SIGNATUR | AVANSERT_SIGNATUR
  signeringUtloper: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).getTime(),
  svarSendesTil: {
    postAdresse: {
      navn: 'Vestfold og Telemark fylkeskommune',
      adresse1: 'Postboks 2844',
      postNummer: '3702',
      postSted: 'Skien'
    },
    digitalAdresse: {
      organisasjonsNummer: '821227062'
    }
  }
}

const result = svarut.sendForsendelse(forsendelse)
```

Output:
```json
{ "id": "d24658e8-d65d-4c3e-b201-564b5e880cde" }
```

### getStatus
```javascript
const forsendelseId = 'd24658e8-d65d-4c3e-b201-564b5e880cde'
const status = svarut.getStatus(forsendelseId)
```

Output:
```json
{
  "statuser": [ 
    {
      "forsendelsesId": { "id": "d24658e8-d65d-4c3e-b201-564b5e880cde" },
      "sisteStatusEndring": 1571379874246,
      "status": "SENDT_PRINT"
    }
  ]
}
```

List of available status codes:

    "MOTTAT",
    "AKSEPTERT",
    "AVVIST",
    "VARSLET",
    "LEST",
    "SENDT_PRINT",
    "PRINTET",
    "MANUELT_HANDTERT",
    "SENDT_DIGITALT",
    "SENDT_SDP",
    "LEVERT_SDP",
    "KLAR_FOR_MOTTAK",
    "IKKE_LEVERT"

### getForsendelseHistorikk
```javascript
const forsendelseId = 'd24658e8-d65d-4c3e-b201-564b5e880cde'
const status = svarut.getForsendelseHistorikk(forsendelseId)
```

Output:
```json
{ 
  "hendelsesLogger": [ 
    { 
      "tidspunkt": "18.10.2019 15:28:30",
      "hendelse": "Mottatt, og tildelt forsendelse-id"
    },
    { 
      "tidspunkt": "18.10.2019 15:28:30",
      "hendelse": "Metadata er validert OK" 
    },
    [...]
  ]
}
```

### getSigneringHistorikk
```javascript
const forsendelseId = 'd24658e8-d65d-4c3e-b201-564b5e880cde'
const status = svarut.getSigneringHistorikk(forsendelseId)
```

#### Ikke startet signering
```json
{
  "forsendelseid": "d24658e8-d65d-4c3e-b201-564b5e880cde",
  "logg": {
    "tidspunkt": "11.04.2018 09:48:20",
    "type": "SigneringsoppdragRegistrert",
    "hendelse": "Signeringsoppdrag av type AUTENTISERT_SIGNATUR registert og utløper 12.04.2018"
  }
}
```

#### Godtatt signering
```json
{
  "forsendelseid": "d24658e8-d65d-4c3e-b201-564b5e880cde",
  "logg": [
    {
      "tidspunkt": "11.04.2018 09:48:20",
      "type": "SigneringsoppdragRegistrert",
      "hendelse": "Signeringsoppdrag av type AUTENTISERT_SIGNATUR registert og utløper 12.04.2018"
    },
    {
      "tidspunkt": "11.04.2018 09:57:28",
      "type": "SigneringsoppdragStartet",
      "hendelse": "Mottaker starter signeringsoppdraget."
    },
    {
      "tidspunkt": "11.04.2018 09:58:18",
      "type": "SigneringsoppdragFullfort",
      "hendelse": "Mottaker har fullført signeringsoppdraget og svar er sendt tilbake til avsender. Referanse: e324e614-4998-453b-a7a0-fba5cfa20ed0"
    }
  ]
}
```

#### Avvist signering
```json
{
  "forsendelseid": "d24658e8-d65d-4c3e-b201-564b5e880cde",
  "logg": [
    {
      "tidspunkt": "11.04.2018 09:48:20",
      "type": "SigneringsoppdragRegistrert",
      "hendelse": "Signeringsoppdrag av type AUTENTISERT_SIGNATUR registert og utløper 12.04.2018"
    },
    {
      "tidspunkt": "11.04.2018 10:01:05",
      "type": "SigneringsoppdragStartet",
      "hendelse": "Mottaker starter signeringsoppdraget."
    },
    {
      "tidspunkt": "11.04.2018 10:01:23",
      "type": "SigneringsoppdragAvvistAvMottaker",
      "hendelse": "Mottaker har avvist signeringsoppdraget."
    }
  ]
}
```

### getDokumentMetadata
```javascript
const forsendelseId = 'd24658e8-d65d-4c3e-b201-564b5e880cde'
const metadata = await svarut.getDokumentMetadata(forsendelseId)
```

Output:
```json
{ 
  "dokumentMetadata": [ 
    { 
      "mimeType": "application/pdf",
      "filnavn": "test.pdf",
      "kanSigneres": false,
      "sizeInBytes": 156993,
      "sha256hash": "042c2acd5123a4133b479fe165723b659d673bb530aba351745b76857bca21bb",
      "dokumentType": null,
      "nedlasningsUrl": "https://test.svarut.ks.no/forsendelse/d24658e8-d65d-4c3e-b201-564b5e880cde/1",
      "signeringsUrl": null 
    } 
  ] 
}
```

### setForsendelseLest
Marks the letter as read in an external system

```javascript
const forsendelseId = 'd24658e8-d65d-4c3e-b201-564b5e880cde'
const lestav = {
  lestAvFodselsNummer: '01029400475',
  navnPaEksterntSystem: 'eksternt system',
  datoLest: Date.now()
}

const result = await svarut.setForsendelseLest(forsendelseId, lestav)
```

### getForsendelseEksternref
Get list of letters with reference from external system

```javascript
const eksternref = '123456'
const forsendelseIds = await svarut.getForsendelseEksternref(eksternref)
```

Output:
```json
{ "forsendelseIder": [ { "id": "d24658e8-d65d-4c3e-b201-564b5e880cde" }, { "id": "..." } ] }
```

### getForsendelseTyper
Get list of available letter types

```javascript
const types = await svarut.getForsendelseTyper()
```

Output:
```json
{ "forsendelseTyper": [ "Byggesøknad", "ks.signertforsendelse", "..." ] }
```

## License
[MIT](LICENSE)