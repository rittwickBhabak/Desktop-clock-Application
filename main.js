const { app, BrowserWindow, ipcMain, globalShortcut, Tray, Menu } = require('electron');

process.env.NODE_ENV = 'development'
process.env.NODE_ENV = 'production'

const isDev = process.env.NODE_ENV !== 'production' ? true : false
const isMac = process.platform === 'darwin' ? true : false

let mainWindow, tray;
const menu = [
  {
    role: 'fileMenu',
  },
  ...(isDev ? [
    {
      label: 'Developer',
      submenu: [
        {
          role: 'reload'
        },
        {
          role: 'forcereload'
        },
        {
          type: 'separator'
        },
        {
          role: 'toggledevtools'
        }
      ]
    }
  ] : [])
]
let mainMenu = Menu.buildFromTemplate([])




// BUSINESS LOGIC GLOBAL VARIABLES START

// STOPWATCH RELATED LOGIC STARTS

// STOPWATCH RELATED LOGIC ENDS


// TIMER RELATED LOGIC STARTS

// TIMER RELATED LOGIC ENDS


// BUSINESS LOGIC GLOBAL VARIABLES END



function createMainWindow() {

  mainWindow = new BrowserWindow({
    width: isDev ? 550 : 250,
    height: isDev ? 550 : 300,
    resizable: false,
    alwaysOnTop: true,
    icon: __dirname + './assets/icons/Icon_1024x1024.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false 
    }
  })

  mainWindow.loadFile('./app/index.html');

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(mainMenu)


}


app.on('ready', () => {
  createMainWindow();
});

app.on('window-all-closed', () => {
  app.quit();
})
app.on('activate', () => {
  if (mainWindow === null) createMainWindow()
})
