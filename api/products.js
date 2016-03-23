var mysql = require('mysql');

// Creates MySql database connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin!",
    database: "ortopedia-DB"
});

var productModel = {};

productModel.getProducts = function(req, callback) {
    if (connection) {
        var id = -1, name = '', description = '';

        if(req.id)
            id = req.id;

        if(req.name)
            name = req.name;

        if(req.description)
            description = req.description;

        var pageSize = req.rows;
        if(!pageSize)
          pageSize = 50;
              
        var pageIndex = req.page;
        if(!pageIndex)
          pageIndex = 1;

        var orderBy = req.sidx;
        if(!orderBy)
          orderBy = '';

        var descending = true;
        if(!req.sord || req.sord !== 'desc')
          descending = false;

        var params = [pageSize, pageIndex, orderBy, descending, id, name, description]; 

        connection.query('CALL SP_getProducts(?, ?, ?, ?, ?, ?, ?)', params, function(error, rows) {
            if(error)
                throw error;
            else {
                callback(null, rows);
            }                
        });
    }
}

productModel.getProductsRental = function(req, callback) {
    if (connection) {
        var id = -1, name = '', description = '';

        if(req.id)
            id = req.id;

        if(req.name)
            name = req.name;

        if(req.description)
            description = req.description;

        var pageSize = req.rows;
        if(!pageSize)
          pageSize = 50;
              
        var pageIndex = req.page;
        if(!pageIndex)
          pageIndex = 1;

        var orderBy = req.sidx;
        if(!orderBy)
          orderBy = '';

        var descending = true;
        if(!req.sord || req.sord !== 'desc')
          descending = false;

        var params = [pageSize, pageIndex, orderBy, descending, id, name, description]; 

        connection.query('CALL SP_getProductsRental(?, ?, ?, ?, ?, ?, ?)', params, function(error, rows) {
            if(error)
                throw error;
            else {
                callback(null, rows);
            }                
        });
    }
}

module.exports = productModel;
