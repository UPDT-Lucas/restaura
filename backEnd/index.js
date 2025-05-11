import server from "./server.js";
import config from "./config.js";
import dbConnection from "./DB/dbConnection.js";


(async () => {
    try {
        
        const db = dbConnection.getInstance();
        const sequelize = db.Sequelize;

        // Autenticar la conexión una sola vez
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        // Iniciar el servidor
        server.listen(config.PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${config.PORT}`);

            if(process.send){
                process.send('backend-started')
            }
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();