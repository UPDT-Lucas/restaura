const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('migrations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "migrations_name_key"
    },
    hash: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    executed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'migrations',
    schema: 'storage',
    timestamps: false,
    indexes: [
      {
        name: "migrations_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "migrations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
