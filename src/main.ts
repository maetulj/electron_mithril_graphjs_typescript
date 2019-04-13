process.env.NODE_ENV = "development"

import { app, BrowserWindow, ipcMain, Menu, Accelerator } from "electron"
import * as path from "path"

let mainWindow: Electron.BrowserWindow;

/**
 * Create the browser window. 
 */
function createWindow(): void {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
    });

    mainWindow.loadFile(path.join(__dirname, "../html/index.html"));

    mainWindow.on("closed", () => {
        app.quit();
    });

    // Custom menu.
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    // Do not quit the app on MAC.
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Custom menu.
const mainMenuTemplate: object[] = [
    {
        label: "File",
        submenu: [
            {
                accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
                label: "Quit",
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// Fix menu on mac.
if (process.platform === "darwin") {
    mainMenuTemplate.unshift({});
}

// Show DevTools when not in production.
if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push({
        label: "DevTools",
        submenu: [
            {
                accelerator: process.platform === "darwin" ? "Command+I" : "Ctrl+I",
                label: "Toggle DevTools",
                click(item: any, focusedWindow: BrowserWindow) {
                    focusedWindow.webContents.toggleDevTools();
                }
            },
            {
                role: "reload"
            }
        ]
    })
}



