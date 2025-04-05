const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schema_migrations', {
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    inserted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'schema_migrations',
    schema: 'realtime',
    timestamps: false,
    indexes: [
      {
        name: "schema_migrations_pkey",
        unique: true,
        fields: [
          { name: "version" },
        ]
      },
    ]
  });
};
