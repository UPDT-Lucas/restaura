const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('instances', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: true
    },
    raw_base_config: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'instances',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "instances_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
