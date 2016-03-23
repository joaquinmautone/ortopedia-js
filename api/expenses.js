var mysql = require('mysql');

// Creates MySql database connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin!",
    database: "ortopedia-DB"
});

var expenseModel = {};

expenseModel.getExpenses = function(req, callback) {
    if (connection) {
        var id = -1, date = '1900-01-01', description = '';

        if(req.id)
            id = req.id;

        if(req.date) {
            dateSrting = req.date.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, "$3-$2-$1");
            date = new Date(dateSrting);
        }         

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

        var params = [pageSize, pageIndex, orderBy, descending, id, date, description]; 

        connection.query('CALL SP_getExpenses(?, ?, ?, ?, ?, ?, ?)', params, function(error, rows) {
            if(error)
                throw error;
            else {
                callback(null, rows);
            }                
        });
    }
}

module.exports = expenseModel;
