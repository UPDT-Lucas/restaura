const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audit_log_entries', {
    instance_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    payload: {
      type: DataTypes.JSON,
      allowNull: true
    },
    ip_address: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'audit_log_entries',
    schema: 'auth',
    timestamps: true,
    indexes: [
      {
        name: "audit_log_entries_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "audit_logs_instance_id_idx",
        fields: [
          { name: "instance_id" },
        ]
      },
    ]
  });
};
