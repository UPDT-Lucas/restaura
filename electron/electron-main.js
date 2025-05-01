const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { fork } = require('child_process')

let mainWindow
let backendProcess

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
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