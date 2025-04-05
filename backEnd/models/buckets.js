const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('buckets', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "Field is deprecated, use owner_id instead"
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    avif_autodetection: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    file_size_limit: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    allowed_mime_types: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'buckets',
    schema: 'storage',
    timestamps: true,
    indexes: [
      {
        name: "bname",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "buckets_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
