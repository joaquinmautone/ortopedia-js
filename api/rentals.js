var mysql = require('mysql');

// Creates MySql database connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin!",
    database: "ortopedia-DB"
});

var rentalModel = {};

rentalModel.getRentals = function(req, callback) {
    if (connection) {
        var id = -1, dateFrom = '1900-01-01', dateTo = '1900-01-01', customer = '';

        if(req.id)
            id = req.id;

        if(req.dateFrom) {
            var dateSrting = req.dateFrom.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$3-$2-$1");
            dateFrom = new Date(dateSrting);
        }            

        if(req.dateTo) {
            dateSrting = req.dateTo.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$3-$2-$1");
            dateTo = new Date(dateSrting);
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

        var params = [pageSize, pageIndex, orderBy, descending, id, customer, dateFrom, dateTo]; 

        connection.query('CALL SP_getRentals(?, ?, ?, ?, ?, ?, ?, ?)', params, function(error, rows) {
            if(error)
                throw error;
            else {
                callback(null, rows);
            }                
        });
    }
}

module.exports = rentalModel;
