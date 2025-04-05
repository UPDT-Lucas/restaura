const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('one_time_tokens', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    token_type: {
      type: DataTypes.ENUM("confirmation_token","reauthentication_token","recovery_token","email_change_token_new","email_change_token_current","phone_change_token"),
      allowNull: false
    },
    token_hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    relates_to: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'one_time_tokens',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "one_time_tokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "one_time_tokens_relates_to_hash_idx",
        fields: [
          { name: "relates_to" },
        ]
      },
      {
        name: "one_time_tokens_token_hash_hash_idx",
        fields: [
          { name: "token_hash" },
        ]
      },
      {
        name: "one_time_tokens_user_id_token_type_key",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "token_type" },
        ]
      },
    ]
  });
};
