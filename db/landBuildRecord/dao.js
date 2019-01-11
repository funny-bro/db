const Building = require('./model')
const Schema = require('./schema')

const DaoBase = require('../DaoBase')

const dao = new DaoBase({
  model: Building,
  schema: Schema
})

module.exports = dao