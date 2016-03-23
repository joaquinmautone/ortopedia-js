(function () {
    'use strict';
    angular.module('app')
        .controller('rentalController', rentalController);
		
	rentalController.$inject = ['rentalService', 'customerService', 'productService', '$q', '$mdDialog', '$stateParams', '$location', '$scope'];
    
    function rentalController(rentalService, customerService, productService, $q, $mdDialog, $stateParams, $location, $scope) {
        var vm = this;
        
        vm.cancelEdit = cancelEdit;
        vm.createRental = createRental;
        vm.customers = [];
		vm.deleteRental = deleteRental;
        vm.getCustomersByName = getCustomersByName;
        vm.getProductsByRentalId = getProductsByRentalId;
        vm.getRental = getRental;
        vm.grids = {
            productsRental: {
                caption: 'Productos',
                pageSize: 10
            },            
            cntrl: 'rentalController'
        };
        vm.saveRental = saveRental;
		vm.selected = {
            products: {
                total: 0,
                page: 1,
                records: 0,
                rows: [] 
            }    
        };        
        vm.showProducts = showProducts;
        
        if($stateParams.id) {
            vm.getRental();
        }
        
        //----------------------
        // Internal functions 
        //----------------------

        function cancelEdit() {
            vm.selected = {
            products: {
                    total: 0,
                    page: 0,
                    records: 0,
                    rows: []
                }    
            };
        }
        
        function createRental($event) {
            rentalService.create(vm.selected).then(function (affectedRows) {
                $mdDialog.show(
                    $mdDialog
                        .alert()
                        .clickOutsideToClose(true)
                        .title('Agregar Alquiler')
                        .content('El alquiler se ha agregado con exito!')
                        .ok('Ok')
                        .targetEvent($event)
                );
            });
            vm.cancelEdit();
        }
        
        function deleteRental($event) {
            var confirm = $mdDialog.confirm()
                                   .title('Eliminar alquiler')
                                   .content('Estas seguro/a de eliminar este alquiler?')
                                   .ok('Si')
                                   .cancel('No')
                                   .targetEvent($event);           
            
            $mdDialog.show(confirm).then(function () {
                rentalService.destroy(vm.selected.id).then(function (affectedRows) {
                    vm.cancelEdit();
                });
            }, function () { }); 
        }

        function getCustomersByName() {
            if(vm.searchCustomer !== "" || vm.searchCustomer !== "") {
                customerService.getCustomersByName(vm.searchCustomer).then(function(customers){
                    vm.customers = [].concat(customers);
                });            
            }            
        };

        function getProductsByRentalId() {
            productService.getProductsByRentalId(vm.selected.id).then(function (products) {
                vm.selected.products = {
                    total: products.length / vm.grids.productsRental.pageSize,
                    page: 1,
                    records: products.length,
                    rows: []
                };
            });
        };

        function getRental() {
            rentalService.getRentalById($stateParams.id).then(function (rentals) {
                vm.selected = rentals[0];
                vm.getProductsByRentalId();
            });
        };
        
        function saveRental($event) {
            if (vm.selected != null && vm.selected.id != null) {
                rentalService.update(vm.selected).then(function (affectedRows) {
                    $mdDialog.show(
                        $mdDialog
                            .alert()
                            .clickOutsideToClose(true)
                            .title('Modificar Alquiler')
                            .content('El alquiler se ha modificado con exito!')
                            .ok('Ok')
                            .targetEvent($event)
                    );                    
                });
            }
        }; 

        function showProducts(ev) {
            $mdDialog.show({
              controller: ProductsController,  
              templateUrl: './app/rentals/dialogProducts.template.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose: true,
              fullscreen: true
            });        
        };

        $scope.$watch(function (scope) { return vm.selected.products.rows },
        function (newValue) {
            if (newValue.length > 0) {
                vm.selected.products = {
                    total: newValue.length / vm.grids.productsRental.pageSize,
                    page: 1,
                    records: newValue.length,
                    rows: newValue
                };     
            }
        });

        function ProductsController($mdDialog, $scope, productService) {
            $scope.addProduct = addProduct;
            $scope.getProductsByName = getProductsByName;        
            $scope.cancelDialog = function() {
                $mdDialog.cancel();
            };
            $scope.products =  [];
            $scope.selectedProduct = {
                quantity: 1
            };

            getProductsRental();

            function addProduct() {
                if(!$scope.selectedProduct.product || !$scope.selectedProduct.quantity) {
                    return;
                }
                $scope.selectedProduct.product.quantity = $scope.selectedProduct.quantity;                
                var products = vm.selected.products.rows;
                products.push($scope.selectedProduct.product);

                vm.selected.products = {
                    total: products.length / vm.grids.productsRental.pageSize,
                    page: 1,
                    records: products.length,
                    rows: products
                };

                $scope.cancelDialog();
            };

            function filterProduct(query) {
                var lowercaseQuery = angular.lowercase(query);
                return function filter(product) {
                    return (product.name.toLowerCase().indexOf(lowercaseQuery) === 0);
                };                
            };

            function getProductsByName(query) {                
                var result = $scope.searchProduct ? $scope.products.filter(filterProduct(query)) : $scope.products;
                return result;
            };

            function getProductsRental() {
                productService.getProductsRental().then(function (products) {
                    $scope.products = products;
                });  
            };
        };
                
    }

})();
