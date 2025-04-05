import { DataTypes } from "@sequelize/core";

export default function defineUsuarioSistema(sequelize) {
  return sequelize.define('usuario_sistema', {
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
    contrasena: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    correo: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rol: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'usuario_sistema',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuario_sistema_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ],
      },
    ],
  });
}