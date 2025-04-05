const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s3_multipart_uploads_parts', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    upload_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 's3_multipart_uploads',
        key: 'id'
      }
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    part_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bucket_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'buckets',
        key: 'id'
      }
    },
    key: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    etag: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    version: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 's3_multipart_uploads_parts',
    schema: 'storage',
    timestamps: true,
    indexes: [
      {
        name: "s3_multipart_uploads_parts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
