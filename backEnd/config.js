import dotenv from 'dotenv';

// Intenta cargar .env directamente primero
dotenv.config();

// Obtiene variables de tres fuentes posibles:
// 1. De Electron (si está disponible)
// 2. Del process.env directo
// 3. Valores por defecto (solo desarrollo)

let electronEnv = {};
try {
  // Intenta obtener de globalThis (Electron)
  electronEnv = globalThis.electronEnv || {};
  
  // Si no está, intenta parsear BACKEND_ENV
  if (!electronEnv.JWT_SECRET && process.env.BACKEND_ENV) {
    electronEnv = JSON.parse(process.env.BACKEND_ENV);
  }
} catch (e) {
  console.error('Error parsing electron env:', e);
}

const config = {
  HOST: electronEnv.HOST || process.env.HOST || "localhost",
  PORT: electronEnv.PORT || process.env.PORT || 3100,
  DB: electronEnv.DB || process.env.DB || "localhost",
  DB_NAME: electronEnv.DB_NAME || process.env.DB_NAME || "centroDormitorio",
  DB_PASS: electronEnv.DB_PASS || process.env.DB_PASS || "Restaura1314",
  DB_USER: electronEnv.DB_USER || process.env.DB_USER || "postgres",
  DB_PORT: electronEnv.DB_PORT || process.env.DB_PORT || 5432,
  JWT_SECRET: electronEnv.JWT_SECRET || process.env.JWT_SECRET || "Xj9@3*kL8s!wP#Z^2h1uR+eB"
};

export default config;