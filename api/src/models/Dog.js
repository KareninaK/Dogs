const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dogs', {
    id:{
      type : DataTypes.UUID, //genera un id letras y numeros
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
     },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:true
      }
    },
    height: {
      type: DataTypes. STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdInDB: {    //para distinguir los que vienen de la bd de los que trae la api
      type: DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue: true
    }
  });

  sequelize.define('temperament', {
    //no le paso id porque sequelize lo genera solo si yo no se lo paso
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
