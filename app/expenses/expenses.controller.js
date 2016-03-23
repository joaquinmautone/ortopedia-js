(function () {
    'use strict';
    angular.module('app')
        .controller('expensesController', expensesController);
		
	expensesController.$inject = ['$scope', '$location'];
    
    function expensesController($scope, $location) {
        var vm = this;

        vm.api = {
            getExpenses: 'http://localhost:3000/expenses/getExpenses'
        };

        vm.cntrl = 'expensesController';
        
        $scope.edit = function () {
            $location.path("/expenses/" + $scope.data.id);
        };

    }

})();