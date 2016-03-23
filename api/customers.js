var mysql = require('mysql');

// Creates MySql database connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin!",
    database: "ortopedia-DB"
});

var customerModel = {};

customerModel.getCustomers = function(req, callback) {
    if (connection) {
        var id = -1, firstname = '', lastname = '', ci = '';

        if(req.id)
            id = req.id;

        if(req.firstname)
            firstname = req.firstname;

        if(req.lastname)
            lastname = req.lastname;

        if(req.ci)
            ci = req.ci;

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

        var params = [pageSize, pageIndex, orderBy, descending, id, firstname, lastname, ci]; 

        connection.query('CALL SP_getCustomers(?, ?, ?, ?, ?, ?, ?, ?)', params, function(error, rows) {
            if(error)
                throw error;
            else {
                callback(null, rows);
            }                
        });
    }
}

module.exports = customerModel;
