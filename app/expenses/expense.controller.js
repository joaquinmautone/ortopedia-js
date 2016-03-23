 
(function () {
    'use strict';
    angular.module('app')
        .controller('expenseController', expenseController);
		
	expenseController.$inject = ['expenseService', '$q', '$mdDialog', '$stateParams'];
    
    function expenseController(expenseService, $q, $mdDialog, $stateParams) {
        var vm = this;
        
        vm.cancelEdit = cancelEdit;
        vm.createExpense = createExpense;
        vm.deleteExpense = deleteExpense;
        vm.getExpense = getExpense;
        vm.saveExpense = saveExpense;
		vm.selected = null;   
        
        if($stateParams.id) {
            vm.getExpense();
        }
        
        //----------------------
        // Internal functions 
        //----------------------
        
        function cancelEdit() {
            vm.selected = null;   
        }
        
        function createExpense($event) {
            expenseService.create(vm.selected).then(function (affectedRows) {
                $mdDialog.show(
                    $mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Agregar Gasto')
                        .content('El gasto se ha agregado con exito!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
            vm.cancelEdit();
        }

        function deleteExpense($event) {
            var confirm = $mdDialog.confirm()
                                   .title('Eliminar gasto')
                                   .content('Estas seguro/a de eliminar el gasto?')
                                   .ok('Si')
                                   .cancel('No')
                                   .targetEvent($event);           
            
            $mdDialog.show(confirm).then(function () {
                expenseService.destroy(vm.selected.id).then(function (affectedRows) {
                    vm.cancelEdit();
                });
            }, function () { }); 
        }

        function getExpense() {
            expenseService.getExpenseById($stateParams.id).then(function (expenses) {
                vm.selected = expenses[0];
            });
        }
        
        function saveExpense($event) {
            if (vm.selected != null && vm.selected.id != null) {
                expenseService.update(vm.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Modificar gasto')
                            .content('El gasto se ha modificado con exito!')
                            .ok('Ok')
                            .targetEvent($event)
                    );                    
                });
            }
        }
                
    }

})();
