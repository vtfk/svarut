# [WIP] SvarUt
This node module lets you use [SvarUt](https://www.ks.no/fagomrader/digitalisering/felleslosninger/svar-inn-og-svar-ut/)'s [ForsendelseRestServiceV1](https://ks-no.github.io/svarut/integrasjon/forsendelserestservicev1/) from node without having to think about the REST enpoints. It also verifies that the data provided is valid upon sending.


## Installation
Use npm to install:
```
npm install @vtfk/svarut
```

## Usage

Please take a look at the [forsendelse](https://github.com/vtfk/svarut/blob/master/src/schemas/forsendelse.json) schema.

### Firs - init svarut instance
```javascript
const options = {
  username: 'svarut-username',
  password: 'svarut-password',
  url: 'svarut-url', // optional
  timeout: 5000 // optional, defaults to 16 minutes
}

const svarut = require('@vtfk/svarut')(options)
```

### sendForsendelse
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
        filePath: 'test/data/test.pdf'
      }
    ],
    utskriftsKonfigurasjon: {
      utskriftMedFarger: false,
      tosidig: true
    }
  }

// Send forsendelse
const result = svarut.sendForsendelse(forsendelse)
```

Output:
```javascript
  { id: 'd24658e8-d65d-4c3e-b201-564b5e880cde' }
```

### getStatus
```javascript
  const forsendelseId = 'd24658e8-d65d-4c3e-b201-564b5e880cde'
  const status = svarut.getStatus(forsendelseId)
```

Output:
```javascript
{ 
  forsendelsesId: { id: 'd24658e8-d65d-4c3e-b201-564b5e880cde' },
  sisteStatusEndring: 1571379874246,
  status: 'SENDT_PRINT' 
}
```

## License
[MIT](LICENSE)