const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saml_providers', {
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
    entity_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "saml_providers_entity_id_key"
    },
    metadata_xml: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metadata_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    attribute_mapping: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    name_id_format: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'saml_providers',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "saml_providers_entity_id_key",
        unique: true,
        fields: [
          { name: "entity_id" },
        ]
      },
      {
        name: "saml_providers_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "saml_providers_sso_provider_id_idx",
        fields: [
          { name: "sso_provider_id" },
        ]
      },
    ]
  });
};
