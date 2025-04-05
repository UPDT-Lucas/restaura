const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mfa_challenges', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    factor_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'mfa_factors',
        key: 'id'
      }
    },
    verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ip_address: {
      type: DataTypes.INET,
      allowNull: false
    },
    otp_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    web_authn_session_data: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mfa_challenges',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "mfa_challenge_created_at_idx",
        fields: [
          { name: "created_at", order: "DESC" },
        ]
      },
      {
        name: "mfa_challenges_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
