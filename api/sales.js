var mysql = require('mysql');

// Creates MySql database connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin!",
    database: "ortopedia-DB"
});

var saleModel = {};

saleModel.getSales = function(req, callback) {
    if (connection) {
        var id = -1, customer = '', date = '1900-01-01';

        if(req.id)
            id = req.id;

        if(req.date) {
            dateSrting = req.dateTo.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$3-$2-$1");
            date = new Date(dateSrting);
        } 

        if(req.customer)
            customer = req.customer;

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

        var params = [pageSize, pageIndex, orderBy, descending, id, customer, date]; 

        connection.query('CALL SP_getSales(?, ?, ?, ?, ?, ?, ?)', params, function(error, rows) {
            if(error)
                throw error;
            else {
                callback(null, rows);
            }                
        });
    }
}

module.exports = saleModel;
