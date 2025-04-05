const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('secrets', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    secret: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    key_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('(pgsodium.create_key()).id')
    },
    nonce: {
      type: DataTypes.BLOB,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.fn('pgsodium.crypto_aead_det_noncegen')
    }
  }, {
    sequelize,
    tableName: 'secrets',
    schema: 'vault',
    hasTrigger: true,
    timestamps: true,
    indexes: [
      {
        name: "secrets_name_idx",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "secrets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
