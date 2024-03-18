const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const configPath = path.resolve(__dirname, 'configDb.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const sequelizeUser = new Sequelize(config);
const User = require('./userModel')(sequelizeUser);

module.exports = { sequelizeUser, User };
