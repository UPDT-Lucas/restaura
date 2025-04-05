const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sessions', {
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
    factor_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    aal: {
      type: DataTypes.ENUM("aal1","aal2","aal3"),
      allowNull: true
    },
    not_after: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired."
    },
    refreshed_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ip: {
      type: DataTypes.INET,
      allowNull: true
    },
    tag: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sessions',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "sessions_not_after_idx",
        fields: [
          { name: "not_after", order: "DESC" },
        ]
      },
      {
        name: "sessions_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "sessions_user_id_idx",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "user_id_created_at_idx",
        fields: [
          { name: "user_id" },
          { name: "created_at" },
        ]
      },
    ]
  });
};
