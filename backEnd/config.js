import dotenv from "dotenv";

dotenv.config();
const config = {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3100,
    DB: process.env.DB || "localhost",
    DB_NAME: process.env.DB_NAME || "centroDormitorio",
    DB_PASS: process.env.DB_PASS ||  "Restaura1314",
    DB_USER: process.env.DB_USER || "postgres",
    DB_PORT: process.env.DB_PORT || 5432
}
export default config;