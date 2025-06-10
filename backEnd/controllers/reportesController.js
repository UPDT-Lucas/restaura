import dbConnection from "../DB/dbConnection.js";

const reporteCtr = {};

function convertirFechaADate(fecha) {
  if (!fecha) return null; // Manejar fechas nulas o indefinidas

  // Verificar si la fecha ya está en formato YYYY-MM-DD
  const formatoYYYYMMDD = /^\d{4}-\d{2}-\d{2}$/; // Expresión regular para validar el formato
  if (formatoYYYYMMDD.test(fecha)) {
    return fecha; // Si ya está en el formato correcto, devolver la fecha
  }

  // Si no está en el formato correcto, convertirla
  const [dia, mes, ano] = fecha.split("-"); // Dividir la fecha en partes
  return `${ano}-${mes}-${dia}`; // Reorganizar en formato YYYY-MM-DD
}

reporteCtr.reporteGeneral = async (req, res) => {
  try {
    const db = dbConnection.getInstance();
    const data = req.body;
    const fechaInicio = convertirFechaADate(data.fechaInicio);
    const fechaFin = convertirFechaADate(data.fechaFin);


    const totalServicios = await db.Sequelize.query(
      "select * from fn_total_servicios(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const totalMujeresServicio = await db.Sequelize.query(
      "select * from fn_servicios_mujeres(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const totalHombresServicio = await db.Sequelize.query(
      "select * from fn_servicios_hombres(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const totalDias = await db.Sequelize.query(
      "select * from fn_dias_servicio(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const personas_distintas= await db.Sequelize.query(
      "select * from fn_personas_distintas(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const mujeres_distintas= await db.Sequelize.query(
      "select * from fn_mujeres_distintas(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const hombres_distintos= await db.Sequelize.query(
      "select * from fn_hombres_distintos(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const persona_nuevas= await db.Sequelize.query(
      "select * from fn_personas_nuevas(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const persona_nacionales= await db.Sequelize.query(
      "select * from fn_personas_nacionales(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const persona_extranjeras= await db.Sequelize.query(
      "select * from fn_personas_extranjeras(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const adultos_mayores= await db.Sequelize.query(
      "select * from fn_adultos_mayores(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const adultos_mayores_hombres= await db.Sequelize.query(
      "select * from fn_adultos_mayores_hombres(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const adultos_mayores_mujeres= await db.Sequelize.query(
      "select * from fn_adultos_mayores_mujeres(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const adultos_jovenes= await db.Sequelize.query(
      "select * from fn_adultos_jovenes(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const adultos= await db.Sequelize.query(
      "select * from fn_adultos(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const discapacitados= await db.Sequelize.query(
      "select * from fn_discapacitados(:p_fecha_inicio,:p_fecha_fin);",
        {
            replacements: { p_fecha_inicio: fechaInicio, p_fecha_fin: fechaFin },
        }
    );

    const PromePersonasDia = Math.trunc(totalServicios[0][0].fn_total_servicios/totalDias[0][0].fn_dias_servicio).toString();

    const PromePersonasDiaMujeres = Math.trunc(totalMujeresServicio[0][0].fn_servicios_mujeres/totalDias[0][0].fn_dias_servicio).toString();

    const PromePersonasDiaHombres = Math.trunc(totalHombresServicio[0][0].fn_servicios_hombres/totalDias[0][0].fn_dias_servicio).toString();

    const dataRes = {
      totalDias: totalDias[0][0].fn_dias_servicio,
      totalServicios: totalServicios[0][0].fn_total_servicios,
      totalMujeresServicio: totalMujeresServicio[0][0].fn_servicios_mujeres,
      totalHombresServicio: totalHombresServicio[0][0].fn_servicios_hombres,
      promxDia : PromePersonasDia,
      promxDiaMujeres: PromePersonasDiaMujeres,
      promxDiaHombres: PromePersonasDiaHombres,
      personas_distintas: personas_distintas[0][0].fn_personas_distintas,
      mujeres_distintas: mujeres_distintas[0][0].fn_mujeres_distintas,
      hombres_distintos: hombres_distintos[0][0].fn_hombres_distintos,
      persona_nuevas: persona_nuevas[0][0].fn_personas_nuevas,
      persona_nacionales: persona_nacionales[0][0].fn_personas_nacionales,
      persona_extranjeras: persona_extranjeras[0][0].fn_personas_extranjeras,
      adultos_mayores: adultos_mayores[0][0].fn_adultos_mayores,
      adultos_mayores_hombres: adultos_mayores_hombres[0][0].fn_adultos_mayores_hombres,
      adultos_mayores_mujeres: adultos_mayores_mujeres[0][0].fn_adultos_mayores_mujeres,
      adultos_jovenes: adultos_jovenes[0][0].fn_adultos_jovenes,
      adultos: adultos[0][0].fn_adultos,
      discapacitados: discapacitados[0][0].fn_discapacitados
    };

    res.status(200).json({
      message: "Datos del reporte general recuperados correctamente",
      dataRes,
      status: 200,
    });

  }catch (error) {
    console.error("Error recuperar los datos del reporte :", error);
    res
      .status(500)
      .json({
        message: "Error recuperar los datos del reporte",
        error: error.message,
        status: 500,
      });
  }
};

export default reporteCtr;