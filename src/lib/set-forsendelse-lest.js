const Ajv = require('ajv')
const lestavSchema = require('../schemas/lestav.json')

const ajv = new Ajv()
const lestavValidator = ajv.compile(lestavSchema)

module.exports = async (forsendelseId, lestav, instance) => {
  const valid = lestavValidator(lestav)
  if (!valid) throw Error('Schema validator failed', lestavValidator.errors)

  try {
    const { data } = await instance.post(`${forsendelseId}/settLest`, lestav)
    return data || true
  } catch (error) {
    if (error.response) return (error.response.data) || false
    throw error
  }
}
