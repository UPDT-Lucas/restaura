const { app, BrowserWindow, ipcMain, screen } = require('electron') // Agrega 'screen'
const path = require('path')
const { fork } = require('child_process')

let mainWindow
let backendProcess

function createWindow() {
  // Obtiene el tamaño del monitor principal
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize

  // Calcula el 80% del tamaño de la pantalla
  const winWidth = Math.floor(screenWidth * 0.8)
  const winHeight = Math.floor(screenHeight * 0.8)

  // Calcula la posición para centrar la ventana
  const winX = Math.floor((screenWidth - winWidth) / 2)
  const winY = Math.floor((screenHeight - winHeight) / 2)
  console.log(path.join(__dirname,'icon/restaura.ico'));
  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    x: winX,
    y: winY,
    icon: path.join(__dirname, 'icon/restaura.ico'), // Asegúrate de que la ruta al icono sea correcta
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