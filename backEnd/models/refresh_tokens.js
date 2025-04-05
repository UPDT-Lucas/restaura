const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('refresh_tokens', {
    instance_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "refresh_tokens_token_unique"
    },
    user_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    revoked: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    parent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    session_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'sessions',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'refresh_tokens',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "refresh_tokens_instance_id_idx",
        fields: [
          { name: "instance_id" },
        ]
      },
      {
        name: "refresh_tokens_instance_id_user_id_idx",
        fields: [
          { name: "instance_id" },
          { name: "user_id" },
        ]
      },
      {
        name: "refresh_tokens_parent_idx",
        fields: [
          { name: "parent" },
        ]
      },
      {
        name: "refresh_tokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "refresh_tokens_session_id_revoked_idx",
        fields: [
          { name: "session_id" },
          { name: "revoked" },
        ]
      },
      {
        name: "refresh_tokens_token_unique",
        unique: true,
        fields: [
          { name: "token" },
        ]
      },
      {
        name: "refresh_tokens_updated_at_idx",
        fields: [
          { name: "updated_at", order: "DESC" },
        ]
      },
    ]
  });
};
