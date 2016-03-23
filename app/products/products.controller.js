(function () {
    'use strict';
    angular.module('app')
        .controller('productsController', productsController);
		
	productsController.$inject = ['$scope', '$location'];
    
    function productsController($scope, $location) {
        var vm = this;

        vm.api = {
            getProducts: 'http://localhost:3000/products/getProducts'
        };

        vm.cntrl = 'productsController';
        
        $scope.edit = function () {
            $location.path("/product/" + $scope.data.id);
        };

    }

})();