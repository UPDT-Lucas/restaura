import { DataTypes } from "@sequelize/core";

export default function(sequelize) {
  return sequelize.define('droga', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'droga',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "droga_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
}
