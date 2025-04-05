const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sso_domains', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    sso_provider_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'sso_providers',
        key: 'id'
      }
    },
    domain: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sso_domains',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "sso_domains_domain_idx",
        unique: true,
        fields: [
        ]
      },
      {
        name: "sso_domains_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "sso_domains_sso_provider_id_idx",
        fields: [
          { name: "sso_provider_id" },
        ]
      },
    ]
  });
};
