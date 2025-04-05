const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sso_providers', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    resource_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code."
    }
  }, {
    sequelize,
    tableName: 'sso_providers',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "sso_providers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "sso_providers_resource_id_idx",
        unique: true,
        fields: [
        ]
      },
    ]
  });
};
