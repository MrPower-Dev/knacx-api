// 'use strict';
// const {
//   Model
// } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Patient extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Patient.init({
//     first_name: DataTypes.STRING,
//     last_name: DataTypes.STRING,
//     email: DataTypes.STRING,
//     phone_number: DataTypes.STRING,
//     congenital_disease: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'Patient',
//   });
//   return Patient;
// };

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Patient = sequelize.define('Patient', {
  // Define attributes of the patient table
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true,
  },
  first_name: {type: DataTypes.STRING},
  last_name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
  phone_number: {type: DataTypes.STRING},
  congenital_disease: {type: DataTypes.STRING},
}, 
// {
//   timestamps: false, // Disable timestamps
// }
);

module.exports = Patient;
