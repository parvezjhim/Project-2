'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class animals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.animals.belongsToMany(models.user, {through:'users_animals'})
    
    }
  }
  animals.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    fixed: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    species: DataTypes.STRING,
    breed: DataTypes.STRING,
    shelter_email: DataTypes.STRING,
    size: DataTypes.STRING,
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'animals',
  });
  return animals;
};