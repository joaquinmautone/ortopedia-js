(function () {
    'use strict';
    angular.module('app')
        .controller('productController', productController);
		
	productController.$inject = ['productService', '$q', '$mdDialog', '$stateParams'];
    
    function productController(productService, $q, $mdDialog, $stateParams) {
        var vm = this;
        
        vm.cancelEdit = cancelEdit;
        vm.createProduct = createProduct;
		vm.deleteProduct = deleteProduct;
        vm.getProduct = getProduct;
		vm.saveProduct = saveProduct;
		vm.selected = null;   
        
        if($stateParams.id) {
            vm.getProduct();
        }
        
        //----------------------
        // Internal functions 
        //----------------------
        
        function cancelEdit() {
            vm.selected = null;
        }
        
        function createProduct($event) {
            productService.create(vm.selected).then(function (affectedRows) {
                $mdDialog.show(
                    $mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Agregar Producto')
                        .content('El producto se ha agregado con exito!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
            vm.cancelEdit();
        }
        
        function deleteProduct($event) {
            var confirm = $mdDialog.confirm()
                                   .title('Eliminar producto')
                                   .content('Estas seguro/a de eliminar este producto?')
                                   .ok('Si')
                                   .cancel('No')
                                   .targetEvent($event);           
            
            $mdDialog.show(confirm).then(function () {
                productService.destroy(vm.selected.id).then(function (affectedRows) {
                    vm.cancelEdit();
                });
            }, function () { }); 
        }

        function getProduct() {
            productService.getProductById($stateParams.id).then(function (products) {
                vm.selected = products[0];
            });
        }
        
        function saveProduct($event) {
            if (vm.selected != null && vm.selected.id != null) {
                productService.update(vm.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Modificar Producto')
                            .content('El producto se ha modificado con exito!')
                            .ok('Ok')
                            .targetEvent($event)
                    );                    
                });
            }
        }               
                
    }

})();
