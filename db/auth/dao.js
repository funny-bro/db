const Auth = require('./model')
const Schema = require('./schema')
const validator = require('../../lib/validator')

const create = (payload) => {
  const invalid = validator(payload, Schema)

  if(invalid) throw new Error(invalid)
  
  const {username, cookieValue, ensid, enuid} = payload
  return Auth.create({
      username,
      cookieValue,
      ensid,
      enuid,
    })
    .then(res => res.dataValues)
}

const update = (payload, condition) => {
  return Auth.update(
    payload,
    { where: condition} /* where criteria */
  )
}

const findOne = (condition) => {
  return Auth.findOne({ where: condition})
  .then(res => {
    if(!res) return null

    return res.dataValues
  })
}

const findAndCountAll = (condition = {}, options = {}) => {
  const {limit = 20, offset = 0} = options
  return Auth.findAndCountAll({
      where: condition,
      limit,
      offset
  }).then(res => {
    if(!res) return []
    
    const {count, rows} = res
    return {
      count,
      data: rows.map(item => item.dataValues)
    }
  })
}

const destroy = (condition) => {
  return Auth.findOne({ where: condition})
    .then( dataObject => dataObject.destroy())
}

module.exports = {create, update, findOne, destroy, findAndCountAll}