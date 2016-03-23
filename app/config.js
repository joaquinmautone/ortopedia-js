
(function () {
    'use strict';        
	angular.module('app').config(config);    
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider'];

    function config ($stateProvider, $urlRouterProvider, $mdThemingProvider) {     

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('grey');

        // For any unmatched url
        $urlRouterProvider.otherwise("/dashboard");
        
        // Now set up the states
        $stateProvider
          .state('dashboard', {
                url: "/dashboard",
                templateUrl: "./app/dashboard/dashboard.html",
                controller: "dashboardController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('customer', {
                url: "/customer/{id}",
                templateUrl: "./app/customers/customer.html",
                controller: "customerController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('customers', {
                url: "/customers",
                templateUrl: "./app/customers/customers.html",
                controller: "customersController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('product', {
                url: "/product/{id}",
                templateUrl: "./app/products/product.html",
                controller: "productController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('products', {
                url: "/products",
                templateUrl: "./app/products/products.html",
                controller: "productsController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('expense', {
                url: "/expense/{id}",
                templateUrl: "./app/expenses/expense.html",
                controller: "expenseController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('expenses', {
                url: "/expenses",
                templateUrl: "./app/expenses/expenses.html",
                controller: "expensesController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('rental', {
                url: "/rental/{id}",
                templateUrl: "./app/rentals/rental.html",
                controller: "rentalController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('rentals', {
                url: "/rentals",
                templateUrl: "./app/rentals/rentals.html",
                controller: "rentalsController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('sale', {
                url: "/sale/{id}",
                templateUrl: "./app/sales/sale.html",
                controller: "saleController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            })
          .state('sales', {
                url: "/sales",
                templateUrl: "./app/sales/sales.html",
                controller: "salesController",
                controllerAs: "vm",
                onEnter: function () {
                    window.scrollTo(0, 0);
                }
            });
    };
})();