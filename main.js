const {BrowserWindow } = require("electron");
const path = require("path");  // Corregido
const url = require("url"); 

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        },
    });
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'frontEnd','dist', 'restaura-app', 'browser', 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );


    mainWindow.webContents.on('did-fail-load', () => { 
      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, 'frontEnd','dist', 'restaura-app', 'browser', 'index.html'),
          protocol: 'file:',
          slashes: true
        })
      );
    });
    
    mainWindow.on("closed", () => (mainWindow = null));
    
}

module.exports = {
  createWindow
}