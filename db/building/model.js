const sequelize = require('../init')
const Sequelize = require('sequelize');

const Building = sequelize.define('building', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  cityCode: {type: Sequelize.STRING, allowNull: false },
  townCode: {type: Sequelize.STRING, allowNull: false },
  sectCode: {type: Sequelize.STRING, allowNull: false },
  landBuildMax: {type: Sequelize.BIGINT, allowNull: false },
  project: {type: Sequelize.STRING, allowNull: false },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

module.exports = Building