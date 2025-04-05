const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bitacora', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'bitacora',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bitacora_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
