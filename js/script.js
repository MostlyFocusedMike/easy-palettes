/*jslint plusplus: true*/
/*jslint white: true*/


(function () {
  "use strict";
  var $button = $("#button");

    function showColor() {
      var $color1 = $("#colorOneValue");
      window.alert($color1.val());
    }
  
  $button.on("click", function(){
    showColor()
});
  
}());