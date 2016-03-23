(function () {
    'use strict';
    var mysql = require('mysql');
    
    // Creates MySql database connection
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Admin!",
        database: "ortopedia-DB"
    });
    
    angular.module('app')		
        .service('saleService', saleService);
    
	saleService.$injector = ['$q'];
	
    function saleService($q) {
		var sale = {
            getSaleById: getSaleById,
            create: createSale
        };
		return sale;
        
        function createSale(sale) {
            var deferred = $q.defer();
            var query = "INSERT INTO sales SET ?";
            connection.query(query, sale, function (err, res) { 
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        
        function getSaleById(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM sales WHERE id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }       
                
    }
})();
