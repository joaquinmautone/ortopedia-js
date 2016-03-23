const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

// Report crashes to our server.
electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow(
    {//"auto-hide-menu-bar": true,
    fullscreen: true});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

var express = require('express');
var expressApp = express();

// Import models
var customersCntrl = require('./api/customers');
var productsCntrl = require('./api/products');
var expensesCntrl = require('./api/expenses');
var rentalsCntrl = require('./api/rentals');
var salesCntrl = require('./api/sales');

expressApp.get("/customers/getCustomers", function(req, res) {
    customersCntrl.getCustomers(req.query, function(error, data)
    {  
      var response = {
        total: 0,
        page: 0,
        records: 0,
        rows: []
      };

      if(data[0].length > 0) {
        response = {
          total: data[0][0].pageCount,
          page: data[0][0].currentPage,
          records: data[0][0].recordCount,
          rows: data[0]
        };
      }

      res.json(200, response);
    });
});

expressApp.get("/products/getProducts", function(req, res) {
    productsCntrl.getProducts(req.query, function(error, data)
    {  
      var response = {
        total: 0,
        page: 0,
        records: 0,
        rows: []
      };

      if(data[0].length > 0) {
        response = {
          total: data[0][0].pageCount,
          page: data[0][0].currentPage,
          records: data[0][0].recordCount,
          rows: data[0]
        };
      }

      res.json(200, response);
    });
});

expressApp.get("/products/getProductsRental", function(req, res) {
    productsCntrl.getProductsRental(req.query, function(error, data)
    {  
      var response = {
        total: 0,
        page: 0,
        records: 0,
        rows: []
      };

      if(data[0].length > 0) {
        response = {
          total: data[0][0].pageCount,
          page: data[0][0].currentPage,
          records: data[0][0].recordCount,
          rows: data[0]
        };
      }

      res.json(200, response);
    });
});

expressApp.get("/expenses/getExpenses", function(req, res) {
    expensesCntrl.getExpenses(req.query, function(error, data)
    {  
      var response = {
        total: 0,
        page: 0,
        records: 0,
        rows: []
      };

      if(data[0].length > 0) {
        response = {
          total: data[0][0].pageCount,
          page: data[0][0].currentPage,
          records: data[0][0].recordCount,
          rows: data[0]
        };
      }

      res.json(200, response);
    });
});

expressApp.get("/rentals/getRentals", function(req, res) {
    rentalsCntrl.getRentals(req.query, function(error, data)
    {  
      var response = {
        total: 0,
        page: 0,
        records: 0,
        rows: []
      };

      if(data[0].length > 0) {
        response = {
          total: data[0][0].pageCount,
          page: data[0][0].currentPage,
          records: data[0][0].recordCount,
          rows: data[0]
        };
      }

      res.json(200, response);
    });
});

expressApp.get("/sales/getSales", function(req, res) {
    salesCntrl.getSales(req.query, function(error, data)
    {  
      var response = {
        total: 0,
        page: 0,
        records: 0,
        rows: []
      };

      if(data[0].length > 0) {
        response = {
          total: data[0][0].pageCount,
          page: data[0][0].currentPage,
          records: data[0][0].recordCount,
          rows: data[0]
        };
      }

      res.json(200, response);
    });
});

expressApp.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

