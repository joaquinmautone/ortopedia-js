(function () {
    'use strict';
    angular.module('app')
        .controller('customersController', customersController);
		
	customersController.$inject = ['$scope', '$location'];
    
    function customersController($scope, $location) {
        var vm = this;

        vm.api = {
            getCustomers: 'http://localhost:3000/customers/getCustomers'
        };

        vm.cntrl = 'customersController';
        
        $scope.edit = function () {
            $location.path("/customer/" + $scope.data.id);
        };

    }

})();