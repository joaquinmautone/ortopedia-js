(function () {
    'use strict';
    angular.module('app')
        .controller('salesController', salesController);
		
	salesController.$inject = ['$scope', '$location'];
    
    function salesController($scope, $location) {
        var vm = this;

        vm.api = {
            getSales: 'http://localhost:3000/sales/getSales'
        };

        vm.cntrl = 'salesController';
        
        $scope.edit = function () {
            $location.path("/sale/" + $scope.data.id);
        };

    }

})();