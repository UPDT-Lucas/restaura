const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('key', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM("default","valid","invalid","expired"),
      allowNull: true,
      defaultValue: "valid"
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: true
    },
    key_type: {
      type: DataTypes.ENUM("aead-ietf","aead-det","hmacsha512","hmacsha256","auth","shorthash","generichash","kdf","secretbox","secretstream","stream_xchacha20"),
      allowNull: true
    },
    key_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: true
    },
    key_context: {
      type: DataTypes.BLOB,
      allowNull: true,
      defaultValue: "\\x7067736f6469756d"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    associated_data: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "associated"
    },
    raw_key: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    raw_key_nonce: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    parent_key: {
      type: DataTypes.UUID,
      allowNull: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'key',
    schema: 'pgsodium',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "key_key_id_key_context_key_type_idx",
        unique: true,
        fields: [
          { name: "key_id" },
          { name: "key_context" },
          { name: "key_type" },
        ]
      },
      {
        name: "key_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "key_status_idx",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "key_status_idx1",
        unique: true,
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "pgsodium_key_unique_name",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
