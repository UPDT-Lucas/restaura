const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('identities', {
    provider_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "identities_provider_id_provider_unique"
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    identity_data: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    provider: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "identities_provider_id_provider_unique"
    },
    last_sign_in_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Auth: Email is a generated column that references the optional email property in the identity_data"
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'identities',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "identities_email_idx",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "identities_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "identities_provider_id_provider_unique",
        unique: true,
        fields: [
          { name: "provider_id" },
          { name: "provider" },
        ]
      },
      {
        name: "identities_user_id_idx",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
