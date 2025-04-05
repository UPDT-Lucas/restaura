const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subscription', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    subscription_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    entity: {
      type: "REGCLASS",
      allowNull: false
    },
    filters: {
      type: DataTypes.ARRAY(null),
      allowNull: false,
      defaultValue: []
    },
    claims: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    claims_role: {
      type: "REGROLE",
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'subscription',
    schema: 'realtime',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "ix_realtime_subscription_entity",
        fields: [
          { name: "entity" },
        ]
      },
      {
        name: "pk_subscription",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "subscription_subscription_id_entity_filters_key",
        unique: true,
        fields: [
          { name: "subscription_id" },
          { name: "entity" },
          { name: "filters" },
        ]
      },
    ]
  });
};
