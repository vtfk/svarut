(async () => {
  require('dotenv').config()

  const config = {
    username: process.env.SVARUT_USERNAME,
    password: process.env.SVARUT_PASSWORD
  }

  const svarut = require('./src/index')(config)

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

  try {
    const response = await svarut.sendForsendelse(forsendelse)
    console.log(response)
  } catch (error) {
    console.error(error.message)
  }
})()
