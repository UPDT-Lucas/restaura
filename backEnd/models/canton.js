import { DataTypes } from "@sequelize/core";

export default function defineCanton(sequelize) {
  return sequelize.define('canton', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    provincia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'provincia',
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName: 'canton',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "canton_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}