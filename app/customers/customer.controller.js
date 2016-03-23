(function () {
    'use strict';
    angular.module('app')
        .controller('customerController', customerController);
		
	customerController.$inject = ['customerService', '$q', '$mdDialog', '$stateParams'];
    
    function customerController(customerService, $q, $mdDialog, $stateParams) {
        var vm = this;
        
        vm.cancelEdit = cancelEdit;
        vm.createCustomer = createCustomer;
		vm.deleteCustomer = deleteCustomer;
        vm.getCustomer = getCustomer;
		vm.saveCustomer = saveCustomer;
		vm.selected = null;   

        if($stateParams.id) {
            vm.getCustomer();
        }    
        
        //----------------------
        // Internal functions 
        //----------------------
        
        function cancelEdit() {
            vm.selected = null;    
        }
        
        function createCustomer($event) {
            customerService.create(vm.selected).then(function (affectedRows) {
                $mdDialog.show(
                    $mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Agregar cliente')
                        .content('El cliente se ha agregado con exito!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
            vm.cancelEdit();
        }
        
        function deleteCustomer($event) {
            var confirm = $mdDialog.confirm()
                                   .title('Eliminar cliente')
                                   .content('Estas seguro/a de eliminar este cliente?')
                                   .ok('Si')
                                   .cancel('No')
                                   .targetEvent($event);           
            
            $mdDialog.show(confirm).then(function () {
                customerService.destroy(vm.selected.id).then(function (affectedRows) {
                    vm.cancelEdit();
                });
            }, function () { });                        
        }
        
        function getCustomer() {
            customerService.getCustomerById($stateParams.id).then(function (customers) {
                vm.selected = customers[0];
            });
        }
        
        function saveCustomer($event) {
            if (vm.selected != null && vm.selected.id != null) {
                customerService.update(vm.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Modificar cliente')
                            .content('El cliente se ha modificado con exito!')
                            .ok('Ok')
                            .targetEvent($event)
                    );                    
                });
            }
        }        
        
    }

})();
