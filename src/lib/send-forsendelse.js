const Ajv = require('ajv')
const FormData = require('form-data')
const { createReadStream, existsSync, statSync } = require('fs')
const forsendelseSchema = require('../schemas/forsendelse.json')

const ajv = new Ajv()
const forsendelseValidator = ajv.compile(forsendelseSchema)

module.exports = async (forsendelse, instance) => {
  const valid = forsendelseValidator(forsendelse)
  if (!valid) throw Error('Schema validator failed', forsendelseValidator.errors)

  try {
    // Gather forsendelse ID
    const idResult = await instance.post('startNyForsendelse')
    const { id } = idResult.data

    if (!id) throw Error('Didn`t get an ID from SvarUt')

    // Removes 'data' or 'filePath' from dokumenter
    const payload = {
      ...forsendelse,
      dokumenter: forsendelse.dokumenter.map(({ filePath, data, ...rest }) => ({ ...rest }))
    }

    // Add 'avgivendeSystem' if not set.
    payload.avgivendeSystem = forsendelse.avgivendeSystem || 'node-svarut-rest'

    const form = new FormData()
    form.append('forsendelse', JSON.stringify(payload))

    // Adds files
    forsendelse.dokumenter
      .filter(({ filePath }) => filePath)
      .forEach(document => {
        if (existsSync(document.filePath)) {
          form.append('filer', createReadStream(document.filePath), { knownLength: statSync(document.filePath).size })
        } else {
          throw Error(`File ${document.filePath} does not exist`)
        }
      })

    const sendResult = await instance.post(`${id}/sendForsendelse`, form, { headers: { ...form.getHeaders(), 'Content-Length': form.getLengthSync() } })
    return sendResult.data
  } catch (error) {
    if (error.response) console.error(error.response.data)
    throw error
  }
}
