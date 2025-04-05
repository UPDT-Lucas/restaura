const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saml_relay_states', {
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
    request_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    for_email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    redirect_to: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    flow_state_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'flow_state',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'saml_relay_states',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "saml_relay_states_created_at_idx",
        fields: [
          { name: "created_at", order: "DESC" },
        ]
      },
      {
        name: "saml_relay_states_for_email_idx",
        fields: [
          { name: "for_email" },
        ]
      },
      {
        name: "saml_relay_states_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "saml_relay_states_sso_provider_id_idx",
        fields: [
          { name: "sso_provider_id" },
        ]
      },
    ]
  });
};
