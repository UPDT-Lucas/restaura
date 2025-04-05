const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('s3_multipart_uploads', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    in_progress_size: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    upload_signature: {
      type: DataTypes.TEXT,
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
    version: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_metadata: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 's3_multipart_uploads',
    schema: 'storage',
    timestamps: true,
    indexes: [
      {
        name: "idx_multipart_uploads_list",
        fields: [
          { name: "bucket_id" },
          { name: "key" },
          { name: "created_at" },
        ]
      },
      {
        name: "s3_multipart_uploads_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
