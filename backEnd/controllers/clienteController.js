/**
 * @file clienteController.js
 * @description Controlador que contiene la lógica de negocio de los clientes.
 */
import dbConnection from "../DB/dbConnection.js";

import defineClienteServicio from "../models/cliente_servicio.js";
import defineAcademicoXCliente from "../models/academicoxcliente.js";
import defineDrogaXCliente from "../models/drogaxcliente.js";
import defineAyudaXInamu from "../models/ayudaxinamu.js";
import defineContacto from "../models/contacto.js";
import defineInfo3Meses from "../models/info3meses.js";
import defineInformacionInamu from "../models/informacion_inamu.js";
import defineInstituxViolen from "../models/instituxviolen.js";
import definePensionXCliente from "../models/pensionxcliente.js";
import defineRazonSerXCliente from "../models/razon_serxcliente.js";
import defineViolenciaXInamu from "../models/violenciaxinamu.js";




const clienteCtr = {};

function compararListas(listaOriginal, listaNueva) {
    // Convertir las listas en conjuntos
    const setOriginal = new Set(listaOriginal);
    const setNueva = new Set(listaNueva);

    // Números removidos: están en la lista original pero no en la nueva
    const removidos = [...setOriginal].filter(num => !setNueva.has(num));

    // Números agregados: están en la lista nueva pero no en la original
    const agregados = [...setNueva].filter(num => !setOriginal.has(num));

    return { removidos, agregados };
}
/**
 * @description Guarda un usuario del servicio.
 * @route  PUT /cliente
 * @returns {Object} 200 - informacion del cliente guardado
 * @returns {Error} 400 - Error al guardar el cliente
 * @returns {Error} 500 - Error al obtener los catalagos
 */
clienteCtr.getClienteExist = async (req,res)=> {
    try{
        const db = dbConnection.getInstance();
        const p_id = req.params.id;
        const clienteServicio = defineClienteServicio(db.Sequelize,db.dataType);
        let depurateString = p_id.replaceAll(" ","").replaceAll("\n","");
        console.log(p_id);
        console.log(depurateString);
        const cliente = await clienteServicio.findOne({
            where: { id: p_id }
        });
        if(cliente !== undefined && cliente !== null){
            res.status(200).json({ clienteServicio:cliente,status: 200});
        }else{
            res.status(404).json({ status: 404});
        }
    }catch(error){
        console.error("Error al obtener cliente:", error);
        res.status(500).json({ message: "Error al obtener cliente", error,status:500 });
    }
}

clienteCtr.saveCliente = async (req,res)=> {
    try {
        const db = dbConnection.getInstance();
        let data = req.body;
        data.personal.id = data.personal.id.replaceAll(" ","").replaceAll("\n","");

        const clienteServicio = defineClienteServicio(db.Sequelize,db.dataType);
        const nuevoCliente = await clienteServicio.create(data.personal);
        
        if( nuevoCliente !== undefined && nuevoCliente !== null){


            if(data.contacto !== undefined && data.contacto !== null){
                const contactoAdd = defineContacto(db.Sequelize,db.dataType);
                const datanuevoContacto = {
                    cliente_servicio_id: nuevoCliente.id,
                    nombre: data.contacto.nombre,
                    telefono: data.contacto.telefono,
                    relacion: data.contacto.relacion
                }
                const nuevoContacto = await contactoAdd.create(datanuevoContacto);

            }


            const info3MesesAdd = defineInfo3Meses(db.Sequelize,db.dataType);
            let dataInfo3Meses = data.info3meses_id;
            dataInfo3Meses.cliente_servicio_id = nuevoCliente.id;

            const nuevoInfo3Meses = await info3MesesAdd.create(dataInfo3Meses);

            const  academicoxcliente = defineAcademicoXCliente(db.Sequelize,db.dataType); 

            for( let i = 0; i < data.catalogos.gradosacademicos.length;i++){
                let dataAcademico ={
                    grado_academico_id: data.catalogos.gradosacademicos[i],
                    cliente_servicio_id: nuevoCliente.id
                }
                await academicoxcliente.create(dataAcademico);
            }


            
            const drogaxcliente = defineDrogaXCliente(db.Sequelize,db.dataType);

            for( let i = 0; i < data.catalogos.drogas.length;i++){
                let dataDroga ={
                    droga_id: data.catalogos.drogas[i],
                    cliente_servicio_id: nuevoCliente.id,
                    importante: false
                }
                await drogaxcliente.create(dataDroga);
            }
           

            const pensionxcliente = definePensionXCliente(db.Sequelize,db.dataType);

            for( let i = 0; i < data.catalogos.pensiones.length;i++){
                let dataPension ={
                    tipo_pension_id: data.catalogos.pensiones[i],
                    cliente_servicio_id: nuevoCliente.id
                }
               await pensionxcliente.create(dataPension);
            }
            

            const razonSerXCliente = defineRazonSerXCliente(db.Sequelize,db.dataType);
            for( let i = 0; i < data.catalogos.razon_servicio.length;i++){
                let dataRazonSer ={
                    razon_servicio_id: data.catalogos.razon_servicio[i],
                    cliente_servicio_id: nuevoCliente.id
                }
                await razonSerXCliente.create(dataRazonSer);
            }

            

            if(data.inamu !== undefined && data.inamu !== null){


                const informacionInamu = defineInformacionInamu(db.Sequelize,db.dataType);
                let dataInamu = data.inamu;
                dataInamu.cliente_servicio_id = nuevoCliente.id;
                const nuevoInformacionInamu = await informacionInamu.create(dataInamu);


                const violenciaXInamu = defineViolenciaXInamu(db.Sequelize,db.dataType);
                for( let i = 0; i < data.catalogos.tipos_violencia.length;i++){
                    let dataViolenciaXinam ={
                        tipo_violencia_id: data.catalogos.tipos_violencia[i],
                        informacion_inamu_id: nuevoInformacionInamu.id
                    }
                     await violenciaXInamu.create(dataViolenciaXinam);                
                }
                

                const institucionesViolencia = defineInstituxViolen(db.Sequelize,db.dataType);
                for( let i = 0; i < data.catalogos.instituciones_violencia.length;i++){
                    let datainstiViolencia ={
                        instituciones_violencia_id: data.catalogos.instituciones_violencia[i],
                        informacion_inamu_id: nuevoInformacionInamu.id
                    }
                    await institucionesViolencia.create(datainstiViolencia);
                }
                

                const ayudaxinamu = defineAyudaXInamu(db.Sequelize,db.dataType);
                for( let i = 0; i < data.catalogos.tipos_ayuda.length;i++){
                    let dataTipos_ayuda ={
                        tipos_ayuda_id: data.catalogos.tipos_ayuda[i],
                        informacion_inamu_id: nuevoInformacionInamu.id
                    }
                    await ayudaxinamu.create(dataTipos_ayuda);
                }

        
            }
        }
        
        res.status(200).json({ message: "Usuario correctamente guardado",
            cliente: nuevoCliente,status: 200});
        
        
        


        
    }catch (error){
        console.error("Error al guardar cliente:", error);
        res.status(500).json({ message: "Error al guardar cliente", status: 500});
    }
}

clienteCtr.getClienteAll = async (req,res)=> {
    const p_id = req.params.id; 
    try {
        const sequelize = dbConnection.getInstance().Sequelize; 
        let finalRes = {};

        const [clientService, metadata] = await sequelize.query(
            'SELECT * FROM fn_get_cliente_servicio(:p_id)',
            {
                replacements: { p_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );

        finalRes.personal = clientService;
        const [clientService1, metadata1] = await sequelize.query(
            'SELECT * FROM fn_get_info3meses(:p_id)',
            {
                replacements: { p_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );
        
        finalRes.info3meses_id = clientService1;
        
        const [clientService2, metadata2] = await sequelize.query(
            'SELECT * FROM fn_get_contacto(:p_id)',
            {
                replacements: { p_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );
        if(clientService2 !== undefined && clientService2 !== null){
            finalRes.contacto= clientService2;
        }else{
            finalRes.contacto = null;
        }
        

        const [clientService3, metadata3] = await sequelize.query(
            'SELECT * FROM fn_get_informacion_inamu(:p_id)',
            {
                replacements: { p_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );



        if(clientService3 !== undefined && clientService3 !== null){
            finalRes.inamu= clientService3;

            const clientService4 = await sequelize.query(
                'SELECT * FROM fn_get_tipos_ayuda(:p_id)',
                {
                  replacements: { p_id },
                  type: sequelize.QueryTypes.SELECT,
                }
              );
            console.log("Resultados de clientService4:", clientService4);
            finalRes.tipos_ayuda = clientService4;

            const clientService5 = await sequelize.query(
                'SELECT * FROM fn_get_tipo_violencia(:p_id)',
                {
                    replacements: { p_id},
                    type: sequelize.QueryTypes.SELECT, 
                }
            );
            finalRes.tipos_violencia = clientService5;

            const clientService6 = await sequelize.query(
                'SELECT * FROM fn_get_instituciones_violencia(:p_id)',
                {
                    replacements: { p_id},
                    type: sequelize.QueryTypes.SELECT, 
                }
            );
            finalRes.instituciones_violencia = clientService6;

        }else{
            finalRes.inamu = null;
            finalRes.tipos_ayuda = [];
            finalRes.tipos_violencia = [];
            finalRes.instituciones_violencia = [];
        }

        const clientService7 = await sequelize.query(
            'SELECT * FROM fn_get_grado_academico(:p_id)',
            {
                replacements: { p_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );
        finalRes.gradosacademicos= clientService7;

        const clientService8 = await sequelize.query(
            'SELECT * FROM fn_get_droga(:p_id)',
            {
                replacements: { p_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );
        finalRes.drogas= clientService8;
        const clientService9 = await sequelize.query(
            'SELECT * FROM fn_get_tipo_pension(:p_id)',
            {
                replacements: { p_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );
        finalRes.pensiones= clientService9;

        const clientService10 = await sequelize.query(
            'SELECT * FROM fn_get_razon_servicio(:p_id)',
            {
                replacements: { p_id},
                type: sequelize.QueryTypes.SELECT, 
            }
        );
        finalRes.razon_servicio= clientService10;

        

        res.status(200).json(finalRes);
        

    } catch (error) {
        console.error('Error al obtener el cliente y servicio:', error);
        res.status(500).json({ message: 'Error al obtener el cliente y servicio', error: error.message });
    }
}


clienteCtr.getClientService = async (req, res) => {
    const p_id = req.query.p_id || ""; 
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;


    try {
        const sequelize = dbConnection.getInstance().Sequelize;

        const clientService = await sequelize.query(
            'SELECT * FROM buscar_clientes(:p_id, :p_limit, :p_offset)',
            {
                replacements: { p_id, p_limit: limit, p_offset: offset },
                type: sequelize.QueryTypes.SELECT,
            }
        );


        res.status(200).json(clientService);
    } catch (error) {
        console.error('Error al obtener el cliente y servicio:', error);
        res.status(500).json({ message: 'Error al obtener el cliente y servicio', error: error.message });
    }
};

clienteCtr.updateCliente = async (req,res)=> {
    try{
        const db = dbConnection.getInstance();
        const sequelize = db.Sequelize;

        const clienteServicio = defineClienteServicio(db.Sequelize,db.dataType);

        const data = req.body;

        const updatedRows = await clienteServicio.update(data.personal, {
            where: { id: data.personal.id }
        });

        const info3MesesAdd = defineInfo3Meses(db.Sequelize,db.dataType);

        const updatedRows1 = await info3MesesAdd.update(data.info3meses_id, {
            where: { id: data.info3meses_id.id }
        });
        
        
        const contactoAdd = defineContacto(db.Sequelize,db.dataType);
        const updatedRows2 = await contactoAdd.update(data.contacto, {
            where: { id: data.contacto.id }
        });


        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        const academicoxcliente = defineAcademicoXCliente(db.Sequelize, db.dataType);

        const academicoBase = await academicoxcliente.findAll({
            atributes:['grado_academico_id'],
            where: { cliente_servicio_id: data.personal.id }
        });

        const gradosAcademicosViejos = academicoBase.map((grado) => {
            return grado.dataValues.grado_academico_id ;
        });
        


        const resulGrados = compararListas(gradosAcademicosViejos,data.catalogos.gradosacademicos);

        if(resulGrados.agregados.length > 0){
            for( let i = 0; i < resulGrados.agregados.length;i++){
                let dataAcademico ={
                    grado_academico_id: resulGrados.agregados[i],
                    cliente_servicio_id: data.personal.id
                }
                await academicoxcliente.create(dataAcademico);
            }

        }

        if(resulGrados.removidos.length > 0){
            for( let i = 0; i < resulGrados.removidos.length;i++){
                await academicoxcliente.destroy({
                    where: {
                        cliente_servicio_id: data.personal.id,
                        grado_academico_id: resulGrados.removidos[i]
                    }
                });
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        const drogaxcliente = defineDrogaXCliente(db.Sequelize, db.dataType);

        const drogaBase = await drogaxcliente.findAll({
            atributes:['droga_id'],
            where: { cliente_servicio_id: data.personal.id }
        });

        const drogaViejo = drogaBase.map((droga) => {
            return droga.dataValues.droga_id ;
        });
        


        const resuldroga = compararListas(drogaViejo,data.catalogos.drogas);

        if(resuldroga.agregados.length > 0){
            for( let i = 0; i < resuldroga.agregados.length;i++){
                let dataDroga ={
                    importante: false,
                    droga_id: resuldroga.agregados[i],
                    cliente_servicio_id: data.personal.id
                }
                await drogaxcliente.create(dataDroga);
            }

        }

        if(resuldroga.removidos.length > 0){
            for( let i = 0; i < resuldroga.removidos.length;i++){
                await drogaxcliente.destroy({
                    where: {
                        cliente_servicio_id:data.personal.id,
                        droga_id: resuldroga.removidos[i]
                        
                    }
                });
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////

        const pensionxcliente = definePensionXCliente(db.Sequelize, db.dataType);

        const pensionBase = await pensionxcliente.findAll({
            atributes:['tipo_pension_id'],
            where: { cliente_servicio_id: data.personal.id }
        });

        const pensionViejos = pensionBase.map((pension) => {
            return pension.dataValues.tipo_pension_id ;
        });
        


        const resulPension = compararListas(pensionViejos,data.catalogos.pensiones);



        if(resulPension.agregados.length > 0){
            for( let i = 0; i < resulPension.agregados.length;i++){
                let dataPension ={
                    tipo_pension_id: resulPension.agregados[i],
                    cliente_servicio_id: data.personal.id
                }
                await pensionxcliente.create(dataPension);
            }

        }

        if(resulPension.removidos.length > 0){
            for( let i = 0; i < resulPension.removidos.length;i++){
                await pensionxcliente.destroy({
                    where: {
                        cliente_servicio_id: data.personal.id,
                        tipo_pension_id: resulPension.removidos[i]
                    }
                });
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////// 

         ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////

        const razonxcliente = defineRazonSerXCliente(db.Sequelize, db.dataType);

        const razonBase = await razonxcliente.findAll({
            atributes:['razon_servicio_id'],
            where: { cliente_servicio_id: data.personal.id }
        });

        const razonViejo = razonBase.map((razon) => {
            return razon.dataValues.razon_servicio_id ;
        });
        


        const resulRazon = compararListas(razonViejo,data.catalogos.razon_servicio);



        if(resulRazon.agregados.length > 0){
            for( let i = 0; i < resulRazon.agregados.length;i++){
                let dataResul ={
                    razon_servicio_id: resulRazon.agregados[i],
                    cliente_servicio_id: data.personal.id
                }
                await razonxcliente.create(dataResul);
            }

        }

        if(resulRazon.removidos.length > 0){
            for( let i = 0; i < resulRazon.removidos.length;i++){
                await razonxcliente.destroy({
                    where: {
                        cliente_servicio_id: data.personal.id,
                        razon_servicio_id: resulRazon.removidos[i]
                    }
                });
            }
        }

        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////////////////////////////////////////////////////////////// 
        
        if(data.inamu !== undefined && data.inamu !== null){

            const informacionInamu = defineInformacionInamu(db.Sequelize,db.dataType);
            const updatedRows3 = await informacionInamu.update(data.inamu, {
                where: { id: data.inamu.id }
            });

            //Relaciones de inamu 

        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////

            const ayudaxcliente = defineAyudaXInamu(db.Sequelize, db.dataType);

            const ayudaBase = await ayudaxcliente.findAll({
                atributes:['tipos_ayuda_id'],
                where: { informacion_inamu_id: data.inamu.id }
            });

            const ayudaViejo = ayudaBase.map((ayuda) => {
                return ayuda.dataValues.tipos_ayuda_id ;
            });
            


            const resulAyuda = compararListas(ayudaViejo,data.catalogos.tipos_ayuda);



            if(resulAyuda.agregados.length > 0){
                for( let i = 0; i < resulAyuda.agregados.length;i++){
                    let dataAyuda ={
                        tipos_ayuda_id: resulAyuda.agregados[i],
                        informacion_inamu_id: data.inamu.id
                    }
                    await ayudaxcliente.create(dataAyuda);
                }

            }

            if(resulAyuda.removidos.length > 0){
                for( let i = 0; i < resulAyuda.removidos.length;i++){
                    await ayudaxcliente.destroy({
                        where: {
                            informacion_inamu_id: data.inamu.id,
                            tipos_ayuda_id: resulAyuda.removidos[i]
                        }
                    });
                }
            }

            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////// 
            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////

            const violenciaxcliente = defineViolenciaXInamu(db.Sequelize, db.dataType);

            const violenBase = await violenciaxcliente.findAll({
                atributes:['tipo_violencia_id'],
                where: { informacion_inamu_id: data.inamu.id }
            });

            const violenViejo = violenBase.map((violen) => {
                return violen.dataValues.tipo_violencia_id ;
            });
            


            const resulVio = compararListas(violenViejo,data.catalogos.tipos_violencia);



            if(resulVio.agregados.length > 0){
                for( let i = 0; i < resulVio.agregados.length;i++){
                    let dataVio ={
                        tipo_violencia_id: resulVio.agregados[i],
                        informacion_inamu_id: data.inamu.id
                    }
                    await violenciaxcliente.create(dataVio);
                }

            }

            if(resulVio.removidos.length > 0){
                for( let i = 0; i < resulVio.removidos.length;i++){
                    await violenciaxcliente.destroy({
                        where: {
                            informacion_inamu_id: data.inamu.id,
                            tipo_violencia_id: resulVio.removidos[i]
                        }
                    });
                }
            }

            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////// 

            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////// 
            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////

            const instituxviolen = defineInstituxViolen(db.Sequelize, db.dataType);

            const instituVioBase = await instituxviolen.findAll({
                atributes:['instituciones_violencia_id'],
                where: { informacion_inamu_id: data.inamu.id }
            });

            const instituVioViejo = instituVioBase.map((violen) => {
                return violen.dataValues.instituciones_violencia_id ;
            });
            


            const resulInstitutoVio = compararListas(instituVioViejo,data.catalogos.instituciones_violencia);



            if(resulInstitutoVio.agregados.length > 0){
                for( let i = 0; i < resulInstitutoVio.agregados.length;i++){
                    let dataVio ={
                        instituciones_violencia_id: resulInstitutoVio.agregados[i],
                        informacion_inamu_id: data.inamu.id
                    }
                    await instituxviolen.create(dataVio);
                }

            }

            if(resulInstitutoVio.removidos.length > 0){
                for( let i = 0; i < resulInstitutoVio.removidos.length;i++){
                    await instituxviolen.destroy({
                        where: {
                            informacion_inamu_id: data.inamu.id,
                            instituciones_violencia_id: resulInstitutoVio.removidos[i]
                        }
                    });
                }
            }

            ///////////////////////////////////////////////////////////////////////////////////////
            ///////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////// 
                
        }



        if (updatedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado o sin cambios" });
        }

        res.status(200).json({ message: "Cliente actualizado correctamente", updatedRows,status:200 });

    }catch(error){
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ message: "Error al eliminar cliente", error,status:500 });
    }
}


clienteCtr.deleteCliente = async (req,res)=> {
    try{
        const db = dbConnection.getInstance();
        const sequelize = db.Sequelize;
        const data = req.body;


        const result = await sequelize.query('CALL deletecliente_servicio(:p_id, :p_inamu_id)', { 
            replacements: { p_id: data.cliente_servicio_id, p_inamu_id: data.informacion_inamu_id },
            type: sequelize.QueryTypes.RAW
        });
         


        res.status(200).json({ message: "Usuario correctamente eliminado",
            cliente: result,status: 200});

    }catch(error){
        console.error("Error al eliminar cliente:", error);
        res.status(500).json({ message: "Error al eliminar cliente", error,status:500 });
    }
}


export default clienteCtr;


