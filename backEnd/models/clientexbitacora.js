const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clientexbitacora', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numerocuarto: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bitacora_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'bitacora',
        key: 'id'
      }
    },
    cliente_servicio_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cliente_servicio',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'clientexbitacora',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clientexbitacora_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "bitacora_id" },
          { name: "cliente_servicio_id" },
        ]
      },
    ]
  });
};
