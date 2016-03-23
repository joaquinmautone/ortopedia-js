 
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
        .service('productService', productService);
    
	productService.$injector = ['$q'];
	
    function productService($q) {
		var service = {
            getProductById: getProductById,
            getProductsByRentalId: getProductsByRentalId,
            getProductsRental: getProductsRental,
            create: createProduct,
            destroy: deleteProduct,
            update: updateProduct
        };
		return service;
        
        function createProduct(product) {
            var deferred = $q.defer();
            var query = "INSERT INTO products SET ?";
            connection.query(query, product, function (err, res) { 
                if (err) deferred.reject(err);
                deferred.resolve(res.insertId);
            });
            return deferred.promise;
        }
        
        function deleteProduct(id) {
            var deferred = $q.defer();
            var query = "DELETE FROM products WHERE id = ?";
            connection.query(query, [id], function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res.affectedRows);
            });
            return deferred.promise;
        }
                
        function getProductById(id) {
            var deferred = $q.defer();
            var query = "SELECT * FROM products WHERE id = ?";
            connection.query(query, [id], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;
        }
           
        function getProductsByRentalId(idRental) {
            var deferred = $q.defer();
            var query = "SELECT p.*, r.idRental, r.quantity " +
                        "FROM products p INNER JOIN rentals_products r ON p.id = r.idProduct " +
                        "WHERE r.idRental = ?";
            connection.query(query, [idRental], function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;    
        }

        function getProductsRental() {
            var deferred = $q.defer();
            var query = "SELECT * " +
                        "FROM products " +
                        "WHERE priceRent > 0";
            connection.query(query, function (err, rows) {
                if (err) deferred.reject(err);
                deferred.resolve(rows);
            });
            return deferred.promise;    
        }

        function updateProduct(product) {
            var deferred = $q.defer();
            var query = "UPDATE products " +
                        "SET name = ?, description = ?, priceSale = ?, priceRent = ?, stock = ? " + 
                        "WHERE id = ?";
            var params = [product.name, product.description, product.priceSale, product.priceRent, product.stock, product.id]; 
            connection.query(query, params, function (err, res) {
                if (err) deferred.reject(err);
                deferred.resolve(res);
            });
            return deferred.promise;
        }
    }
})();
