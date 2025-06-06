export default (sequelize, DataTypes) => {
  return sequelize.define(
    "sistema_bitacora",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      accion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tabla: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      valor: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      tableName: "sistema_bitacora",
      timestamps: false,
    }
  );
};
