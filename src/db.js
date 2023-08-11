require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_DEPLOY } = process.env;

const sequelize = new Sequelize(DB_DEPLOY,{
      logging: false, 
      native: false, 
   }
);
const PokemonModel = require('./models/Pokemon');
const TypesModel = require('./models/Types');
PokemonModel(sequelize)
TypesModel(sequelize)

const { pokemon,type } = sequelize.models;
pokemon.belongsToMany(type, {through: "pokemon_type"});
type.belongsToMany(pokemon, {through: "pokemon_type"});


module.exports = {
  ...sequelize.models, 
   conn: sequelize, 
};
