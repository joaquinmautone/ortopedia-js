function ci() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.ci = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) return true;
        var ci = modelValue;
        var digit = ci[ci.length - 1];
        ci = ci.replace(/\D/g, '');
        return (digit == validation_digit(ci));
      };
    }
  };
    
  function validation_digit(ci) {
    var a = 0;
    var i = 0;
    if (ci.length <= 6) {
      for (i = ci.length; i < 7; i++) {
        ci = '0' + ci;
      }
    }
    for (i = 0; i < 7; i++) {
      a += (parseInt("2987634"[i]) * parseInt(ci[i])) % 10;
    }
    if (a % 10 === 0) return 0;
    else return 10 - a % 10;
  }
  
}
angular.module('app').directive('ci', ci);