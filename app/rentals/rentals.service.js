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
        .service('rentalService', rentalService);
    
	rentalService.$injector = ['$q'];
	
    function rentalService($q) {
		var rental = {
            getRentalById: getRentalById,
            create: createRental
        };
		return rental;
        
        function createRental(rental) {
            var deferred = $q.defer();
            var query = "INSERT INTO rentals SET ?";
            connection.query(query, rental, function (err, res) { 
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        
        function getRentalById(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM rentals WHERE id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }       
                
    }
})();
