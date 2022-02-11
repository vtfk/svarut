(async () => {
  require('dotenv').config()

  const { forsendelseMultiple, forsendelseBase64MedSignering, lestAv } = require('./test/data/mock-data')

  const config = {
    username: process.env.SVARUT_USERNAME,
    password: process.env.SVARUT_PASSWORD
  }

  const svarut = require('./src/index')(config)

  let forsendelseId

  try {
    // Send multiple files from different sources
    const response = await svarut.sendForsendelse(forsendelseMultiple)
    forsendelseId = response.id
    console.log('sendForsendelse', response)
  } catch (error) {
    console.error('sendForsendelse', error.message)
  }

  try {
    const response = await svarut.sendForsendelse(forsendelseBase64MedSignering)
    // forsendelseId = response.id
    console.log('sendForsendelse m/signering', response)
  } catch (error) {
    console.error('sendForsendelse m/signering', error.message)
  }

  try {
    const response = await svarut.setForsendelseLest(forsendelseId, lestAv)
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
    const response = await svarut.getForsendelseHistorikk(forsendelseId)
    console.log('getForsendelseHistorikk', response)
  } catch (error) {
    console.error('getForsendelseHistorikk', error.message)
  }

  try {
    const response = await svarut.getSigneringHistorikk(forsendelseId)
    console.log('getSigneringHistorikk', response)
  } catch (error) {
    console.error('getSigneringHistorikk', error.message)
  }

  try {
    const response = await svarut.getDokumentMetadata(forsendelseId)
    console.log('getDokumentMetadata', response)
  } catch (error) {
    console.error('getDokumentMetadata', error.message)
  }

  try {
    const response = await svarut.getForsendelseTyper()
    console.log('getForsendelseTyper', response)
  } catch (error) {
    console.error('getForsendelseTyper', error.message)
  }

  try {
    const eksternref = '12345'
    const forsendelseIds = await svarut.getForsendelseEksternref(eksternref)
    console.log('getForsendelseEksternref', forsendelseIds)
  } catch (error) {
    console.error('getForsendelseEksternref', error.message)
  }
})()
