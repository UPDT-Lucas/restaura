import dotenv from "dotenv";

dotenv.config();
const config = {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 3100,
    DB: process.env.DB || "aws-0-us-east-1.pooler.supabase.com",
    DB_NAME: process.env.DB_NAME || "postgres",
    DB_PASS: process.env.DB_PASS ||  "Gabonator1314",
    DB_USER: process.env.DB_USER || "postgres.vwqewolwvryzamagkxef",
    DB_PORT: process.env.DB_PORT || 5432
}
export default config;