/*jslint plusplus: true*/
/*jslint white: true*/


(function () {
  "use strict";
  var $button = $(".show");

    function showColor(e) {
      var value = e.target.id,
        colorValue = "colorValue" + value,
        $color1 = $("#" + colorValue);
        
      window.alert($color1.val());
    }
  
  $button.on("click", function(e){
    showColor(e);
});
  
}());