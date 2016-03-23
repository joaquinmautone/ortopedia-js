function rut() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.rut = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) return true;
        var rut = modelValue;
        rut = rut.replace(/\D/g, '');
        return validation_rut(rut);
      };
    }
  };
    
  function validation_rut(rut) {
	if (rut.length != 12) return false;
	var dc = rut[rut.length - 1];
	rut = rut.substr(0, 11);	
	var total = 0;
	var factor = 2;
	
	for (var i = 10; i >= 0; i--) {
		total += (factor * rut[i]);
		factor = (factor == 9) ? 2 : ++factor;
	} 

	var dv = 11 - (total % 11); 

	if (dv == 11) dv = 0;
	else if (dv == 10) dv = 1;

	if(dv == dc) return true;

	return false;
  }
  
}
angular.module('app').directive('rut', rut);