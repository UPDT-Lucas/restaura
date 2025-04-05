const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('flow_state', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    auth_code: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    code_challenge_method: {
      type: DataTypes.ENUM("s256","plain"),
      allowNull: false
    },
    code_challenge: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    provider_type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    provider_access_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    provider_refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    authentication_method: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    auth_code_issued_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'flow_state',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "flow_state_created_at_idx",
        fields: [
          { name: "created_at", order: "DESC" },
        ]
      },
      {
        name: "flow_state_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "idx_auth_code",
        fields: [
          { name: "auth_code" },
        ]
      },
      {
        name: "idx_user_id_auth_method",
        fields: [
          { name: "user_id" },
          { name: "authentication_method" },
        ]
      },
    ]
  });
};
