/**
 * @file clienteController.js
 * @description Controlador que contiene la lógica de negocio de los clientes.
 */
import dbConnection from "../DB/dbConnection.js";

import defineClienteXBitacora from "../models/clientexbitacora.js";

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

/**
 * @description Guarda un usuario del servicio.
 * @route  PUT /cliente
 * @returns {Object} 200 - informacion del cliente guardado
 * @returns {Error} 400 - Error al guardar el cliente
 * @returns {Error} 500 - Error al obtener los catalagos
 */

clienteCtr.saveCliente = async (req,res)=> {
    try {
        const db = dbConnection.getInstance();
        const data = req.body;
        console.log("data",data);

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
            console.log("dataInfo3Meses",dataInfo3Meses);
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

export default clienteCtr;


