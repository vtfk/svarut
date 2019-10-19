(async () => {
  require('dotenv').config()

  const config = {
    username: process.env.SVARUT_USERNAME,
    password: process.env.SVARUT_PASSWORD
  }

  const svarut = require('./src/index')(config)

  let forsendelseId

  try {
    const forsendelse = {
      tittel: 'Testforsendelse #10',
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

    const response = await svarut.sendForsendelse(forsendelse)
    console.log('sendForsendelse', response)
  } catch (error) {
    console.error('sendForsendelse', error.message)
  }

  try {
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

    const response = await svarut.sendForsendelse(forsendelse)
    forsendelseId = response.id
    console.log('sendForsendelse m/signering', response)
  } catch (error) {
    console.error('sendForsendelse m/signering', error.message)
  }

  try {
    const lestav = {
      lestAvFodselsNummer: '01029400475',
      navnPaEksterntSystem: 'eksternt system',
      datoLest: Date.now()
    }

    const response = await svarut.setForsendelseLest(forsendelseId, lestav)
    console.log('setForsendelseLest', response)
  } catch (error) {
    console.error('setForsendelseLest', error.message)
  }

  try {
    const response = await svarut.getStatus(forsendelseId)
    console.log('getStatus', response)
  } catch (error) {
    console.error('getStatus', error.message)
  }

  try {
    const response = await svarut.getHistory(forsendelseId)
    console.log('getHistory', response)
  } catch (error) {
    console.error('getHistory', error.message)
  }

  try {
    const response = await svarut.getDocumentMetadata(forsendelseId)
    console.log('getDocumentMetadata', response)
  } catch (error) {
    console.error('getDocumentMetadata', error.message)
  }

  try {
    const eksternref = '12345'
    const forsendelseIds = await svarut.getForsendelseEksternref(eksternref)
    console.log('getForsendelseEksternref', forsendelseIds)
  } catch (error) {
    console.error('getForsendelseEksternref', error.message)
  }
})()
