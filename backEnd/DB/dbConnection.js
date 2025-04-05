
import { Sequelize,DataTypes } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import config from "../config.js";
class dbConnection {

    static db_connection = null;

    static getInstance() {
        if (!this.db_connection) {
            
            this.db_connection = {
                Sequelize: new Sequelize({
                    dialect: PostgresDialect,
                    database: config.DB_NAME,
                    user: config.DB_USER,
                    password: config.DB_PASS,
                    host: config.DB,
                    port: config.DB_PORT,
                }),
                dataType: DataTypes
            };
        }
        return this.db_connection;
    }
    
    static async closeConnection() {
        if (this.db_connection) {
            try {
                await this.db_connection.Sequelize.close();
                console.log("Database connection closed successfully.");
                this.db_connection = null; // Reset the connection
            } catch (error) {
                console.error("Error closing the database connection:", error);
            }
        }
    }
}
export default dbConnection;