(async () => {
  const config = {
    username: 'svarut-username',
    password: 'svarut-password'
  }

  const svarut = require('./src/index')(config)

  const forsendelse = {
    tittel: 'test forsendelse',
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

  try {
    const response = await svarut.sendForsendelse(forsendelse)
    console.log(response)
  } catch (error) {
    console.error(error.message)
  }
})()
