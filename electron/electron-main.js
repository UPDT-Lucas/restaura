const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { fork } = require('child_process')
const dotenv = require('dotenv');
// Carga el archivo .env
dotenv.config({ path: path.join(__dirname, '.env') });

// Verifica la carga


// Pasa las variables al backend de forma explícita
if (!process.env.ELECTRON_ENV_FLAG) {
  process.env.ELECTRON_ENV_FLAG = 'true';
  
  // Para procesos hijos (si usas child_process)
  process.env.BACKEND_ENV = JSON.stringify({
    ...process.env,
    ELECTRON_ENV_FLAG: 'true'  // Evita bucles infinitos
  });
  
  // Para el proceso actual (backend)
  Object.assign(globalThis, { electronEnv: process.env });
}
let mainWindow
let backendProcess

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    show: false, // Oculta la ventana inicialmente
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js') // Archivo preload
    }
  })

  startBackend()

  // Solo mostrar cuando el backend esté listo
  ipcMain.on('backend-ready', () => {
    mainWindow.loadFile(path.join(__dirname, '../dist/frontEnd/dist/restaura-app/browser/index.html'))
    mainWindow.once('ready-to-show', () => {
      mainWindow.show()
    })
  })
  mainWindow.webContents.on('did-fail-load', () => { 
    mainWindow.loadFile(path.join(__dirname, '../dist/frontEnd/dist/restaura-app/browser/index.html'))
  });

  mainWindow.on('closed', () => {
    mainWindow = null
    backendProcess?.kill()
  })
}

function startBackend() {
  const backendPath = path.join(__dirname, '../backEnd/index.js')
  
  backendProcess = fork(backendPath, [], {
    env: {
      NODE_ENV: 'production',
      ELECTRON_MODE: 'true'
    }
  })

  // Escuchar mensajes del backend
  backendProcess.on('message', (message) => {
    if (message === 'backend-started') {
      ipcMain.emit('backend-ready')
    }
  })

  backendProcess.on('error', (err) => {
    console.error('Backend error:', err)
  })

  backendProcess.on('exit', (code) => {
    console.log(`Backend exited with code ${code}`)
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
  backendProcess?.kill()
})