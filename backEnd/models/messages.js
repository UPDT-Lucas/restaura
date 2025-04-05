const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    topic: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    extension: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    payload: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    event: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    inserted_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now'),
      primaryKey: true
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'messages',
    schema: 'realtime',
    timestamps: true
  });
};
