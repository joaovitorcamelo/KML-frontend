const electron = require('electron');
const isDev = require('electron-is-dev');
// Módulo para controlar a vida a aplicação.
const app = electron.app;
// Módulo para criar uma janela de browser nativa.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Mantém uma referência global do objeto da janela. Caso não o faças, a janela
// fechará automaticamente assim que o objeto JavaScript for recolhido para o lixo.
let mainWindow;

function createWindow() {
    // Criar a janela do browser.
    mainWindow = new BrowserWindow({
        width: 350, 
        height: 670, 
        icon: __dirname + '../public/OIG.ico',
        resizable: false,
        autoHideMenuBar: true,
    });
    

    // e carregar o index.html da aplicação.
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

    // Emitido quando a janela é fechada.
    mainWindow.on('closed', function () {
        // Desreferenciar o objeto da janela, geralmente irás armazenar as janelas
        // em um array caso a tua aplicação suporte várias janelas, esta é a altura
        // em que deves apagar o elemento correspondente.
        mainWindow = null
    })
}

// Este método será chamado quando o Electron tiver terminado
// a inicialização e estiver pronto para criar janelas de browser.
// Algumas APIs podem ser utilizadas apenas após este evento ocorrer.
app.on('ready', createWindow);

// Saír assim que todas as janelas estejam fechadas.
app.on('window-all-closed', function () {
    // No Sistema Operativo X é comum que as aplicações e a sua barra de menu
    // fiquem ativas até que o utilizador saia explicitamente com o Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // No Sistema Operativo X é comum recriar uma janela na aplicação quando o
    // icon do dock é clicado e não existem outras janelas abertas.
    if (mainWindow === null) {
        createWindow()
    }
});

// Podes incluir neste ficheiro o restante código específico do processo principal da tua
// aplicação. Também podes colocá-los em ficheiros diferentes e pedi-los aqui.