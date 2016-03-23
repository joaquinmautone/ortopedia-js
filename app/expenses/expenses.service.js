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
        .service('expenseService', expenseService);
    
	expenseService.$injector = ['$q'];
	
    function expenseService($q) {
		var service = {
            getExpenseById: getExpenseById,
            create: createExpense
        };
		return service;
        
        function createExpense(expense) {
            var deferred = $q.defer();
            var query = "INSERT INTO expenses SET ?";
            connection.query(query, expense, function (err, res) { 
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        
        function getExpenseById(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM expenses WHERE id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
    }
})();
