(function () {
    'use strict';
    angular.module('app')
        .controller('rentalsController', rentalsController);
		
	rentalsController.$inject = ['$scope', '$location'];
    
    function rentalsController($scope, $location) {
        var vm = this;

        vm.api = {
            getRentals: 'http://localhost:3000/rentals/getRentals'
        };

        vm.cntrl = 'rentalsController';
        
        $scope.edit = function () {
            $location.path("/rental/" + $scope.data.id);
        };

    }

})();