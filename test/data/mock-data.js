const base64File = Buffer.from(require('fs').readFileSync('./test/data/pdf-a.pdf')).toString('base64')

module.exports.forsendelseBase64 = {
  tittel: 'Testforsendelse #16',
  eksternReferanse: '54321',
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
      filnavn: 'pdf-a.pdf',
      mimeType: 'application/pdf',
      data: base64File
    }
  ],
  utskriftsKonfigurasjon: {
    utskriftMedFarger: false,
    tosidig: true
  }
}

module.exports.forsendelseMultiple = {
  tittel: 'Testforsendelse #16',
  eksternReferanse: '54321',
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
      filnavn: 'pdf-a.pdf',
      mimeType: 'application/pdf',
      data: base64File
    },
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

module.exports.forsendelseBase64MedSignering = {
  tittel: 'Test signeringsforsendelse #16',
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
      filnavn: 'pdf-a.pdf',
      mimeType: 'application/pdf',
      data: base64File,
      skalSigneres: true
    }
  ],
  utskriftsKonfigurasjon: {
    utskriftMedFarger: false,
    tosidig: true
  },
  signaturType: 'AUTENTISERT_SIGNATUR',
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

module.exports.forsendelseMultipleMedSignering = {
  tittel: 'Test signeringsforsendelse #16',
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
    },
    {
      filnavn: 'pdf-a.pdf',
      mimeType: 'application/pdf',
      data: base64File,
      skalSigneres: true
    }
  ],
  utskriftsKonfigurasjon: {
    utskriftMedFarger: false,
    tosidig: true
  },
  signaturType: 'AUTENTISERT_SIGNATUR',
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

module.exports.lestAv = {
  lestAvFodselsNummer: '01029400475',
  navnPaEksterntSystem: 'eksternt system',
  datoLest: Date.now()
}
