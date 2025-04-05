const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    instance_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    aud: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    encrypted_password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email_confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    invited_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    confirmation_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    confirmation_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    recovery_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    recovery_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email_change_token_new: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email_change: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email_change_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_sign_in_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    raw_app_meta_data: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    raw_user_meta_data: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    is_super_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "NULL",
      unique: "users_phone_key"
    },
    phone_confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    phone_change: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },
    phone_change_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    phone_change_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    confirmed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email_change_token_current: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    email_change_confirm_status: {
      type: DataTypes.SMALLINT,
      allowNull: true,
      defaultValue: 0
    },
    banned_until: {
      type: DataTypes.DATE,
      allowNull: true
    },
    reauthentication_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    reauthentication_sent_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_sso_user: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails."
    },
    is_anonymous: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'auth',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "confirmation_token_idx",
        unique: true,
        fields: [
          { name: "confirmation_token" },
        ]
      },
      {
        name: "email_change_token_current_idx",
        unique: true,
        fields: [
          { name: "email_change_token_current" },
        ]
      },
      {
        name: "email_change_token_new_idx",
        unique: true,
        fields: [
          { name: "email_change_token_new" },
        ]
      },
      {
        name: "reauthentication_token_idx",
        unique: true,
        fields: [
          { name: "reauthentication_token" },
        ]
      },
      {
        name: "recovery_token_idx",
        unique: true,
        fields: [
          { name: "recovery_token" },
        ]
      },
      {
        name: "users_email_partial_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "users_instance_id_email_idx",
        fields: [
          { name: "instance_id" },
        ]
      },
      {
        name: "users_instance_id_idx",
        fields: [
          { name: "instance_id" },
        ]
      },
      {
        name: "users_is_anonymous_idx",
        fields: [
          { name: "is_anonymous" },
        ]
      },
      {
        name: "users_phone_key",
        unique: true,
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
