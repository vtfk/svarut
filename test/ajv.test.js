const Ajv = require('ajv')
const forsendelseSchema = require('../src/schemas/forsendelse.json')
const lestavSchema = require('../src/schemas/lestav.json')
const { forsendelseBase64, forsendelseMultiple, forsendelseBase64MedSignering, forsendelseMultipleMedSignering, lestAv } = require('./data/mock-data')

const ajv = new Ajv({ allErrors: true })

describe('Schema "forsendelse" compiles correctly', () => {
  test('When adding 1 document with base64', () => {
    const validator = ajv.compile(forsendelseSchema)
    const valid = validator(forsendelseBase64)
    expect(valid).toBe(true)
  })

  test('When adding 1 document with base64 AND signering', () => {
    const validator = ajv.compile(forsendelseSchema)
    const valid = validator(forsendelseBase64MedSignering)
    expect(valid).toBe(true)
  })

  test('When adding 2 documents, 1 with base64 and 1 via filePath', () => {
    const validator = ajv.compile(forsendelseSchema)
    const valid = validator(forsendelseMultiple)
    expect(valid).toBe(true)
  })

  test('When adding 2 documents, 1 with base64 and 1 via filePath, AND signering', () => {
    const validator = ajv.compile(forsendelseSchema)
    const valid = validator(forsendelseMultipleMedSignering)
    expect(valid).toBe(true)
  })
})

describe('Schema "lestav" compiles correctly', () => {
  test('When setting read by', () => {
    const validator = ajv.compile(lestavSchema)
    const valid = validator(lestAv)
    expect(valid).toBe(true)
  })
})
