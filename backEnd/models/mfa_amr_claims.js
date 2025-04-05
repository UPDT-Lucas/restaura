const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mfa_amr_claims', {
    session_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'sessions',
        key: 'id'
      },
      unique: "mfa_amr_claims_session_id_authentication_method_pkey"
    },
    authentication_method: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "mfa_amr_claims_session_id_authentication_method_pkey"
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'mfa_amr_claims',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "amr_id_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "mfa_amr_claims_session_id_authentication_method_pkey",
        unique: true,
        fields: [
          { name: "session_id" },
          { name: "authentication_method" },
        ]
      },
    ]
  });
};
