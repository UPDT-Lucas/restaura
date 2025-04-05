import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import server from "./server.js";
import config from "./config.js";

const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: config.DB_NAME,
    user: config.DB_USER, // Changed 'user' to 'username' for Sequelize
    password: config.DB_PASS,
    host: config.DB,
    port: config.DB_PORT,
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        const [tables] = await sequelize.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public';
        `);
        console.log("Tables in the database:", tables);
        server.listen(config.PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${config.PORT}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})();