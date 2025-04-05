import dotenv from "dotenv";

dotenv.config();
const config = {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3000,
    DB: process.env.DB,
    DB_NAME: process.env.DB_NAME,
    DB_PASS: process.env.DB_PASS,
    DB_USER: process.env.DB_USER,
    DB_PORT: process.env.DB_PORT || 5432
}
export default config;