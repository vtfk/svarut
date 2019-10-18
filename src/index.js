const axios = require('axios')
const sendForsendelse = require('./lib/send-forsendelse')
const getStatus = require('./lib/get-status')

module.exports = (settings) => {
  if (!settings) throw Error('Didn`t get any settings, please take a look at the documentation again...')
  if (!settings.username) throw Error('Missing username from settings.. Who am I really?')
  if (!settings.password) throw Error('Missing password from settings.. How are we supposed to log in?')

  const url = settings.url || 'https://test.svarut.ks.no'
  const apiEndpoint = settings.endpoint || '/tjenester/api/forsendelse/v1/'

  const axiosSettings = {
    baseURL: `${url}${apiEndpoint}`,
    timeout: settings.timeout || 16 * 60 * 1000,
    auth: {
      username: settings.username,
      password: settings.password
    }
  }

  const axiosInstance = axios.create(axiosSettings)

  return {
    sendForsendelse: (forsendelse) => {
      return sendForsendelse(forsendelse, axiosInstance)
    },
    getStatus: (forsendelseId) => {
      return getStatus(forsendelseId, axiosInstance)
    }
  }
}
