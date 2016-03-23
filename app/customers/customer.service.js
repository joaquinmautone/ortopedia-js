 
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
        .service('customerService', customerService);
    
	customerService.$injector = ['$q'];
	
    function customerService($q) {
		var service = {
            getCustomerById: getCustomerById,
            getCustomersByName: getCustomersByName,
            create: createCustomer,
            destroy: deleteCustomer,
            update: updateCustomer
        };
		return service;
        
        function createCustomer(customer) {
            var deferred = $q.defer();
            var query = "INSERT INTO customers SET ?";
            connection.query(query, customer, function (err, res) { 
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        
        function deleteCustomer(id) {
            var deferred = $q.defer();
            var query = "DELETE FROM customers WHERE id = ?";
            connection.query(query, [id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        }
        
        function getCustomerById(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM customers WHERE id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }

        function getCustomersByName(name) {
            var deferred = $q.defer();
            var query = "SELECT id, firstname, lastname " +
                "FROM customers " +
                "WHERE firstname LIKE CONCAT('%', ?, '%') " +
                "OR lastname LIKE CONCAT('%', ?, '%')";
            connection.query(query, [name, name], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
        
        function updateCustomer(customer) {
            var deferred = $q.defer();
            var query = "UPDATE customers " +
                        "SET firstname = ?, lastname = ?, ci = ?, phone = ?, adress = ?, ruc = ?, email = ? " + 
                        "WHERE id = ?";
            var params = [customer.firstname, customer.lastname, customer.ci, customer.phone, customer.adress, customer.ruc, customer.email, customer.id]; 
            connection.query(query, params, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();
