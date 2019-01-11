const sequelize = require('../init')
const Sequelize = require('sequelize');
const BuildingModel = require('../building/model')

const LandBuildRecord = sequelize.define('landBuildRecord', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  landBuild: {type: Sequelize.STRING, allowNull: false },
  data: {type: Sequelize.STRING, defaultValue: ''},
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

LandBuildRecord.belongsTo(BuildingModel)

module.exports = LandBuildRecord