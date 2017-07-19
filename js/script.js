/*jslint plusplus: true*/
/*jslint white: true*/


(function () {
  "use strict";
  

  function showColor(e) {
    var value = e.target.id,
      colorValue = "colorValue" + value,
      $color1 = $("#" + colorValue);

    window.alert($color1.val());
  }
    
  function findCurrentValues() {
    var $colorValues = $(".colorValNum"),
      $msg = " ";
    
    $colorValues.each(function() {
      $msg += " " + $(this).val();
      
    });
    window.alert($msg);
    
  }
  


  function clipBoard(e) {
//    var copyTextarea = document.querySelector("#colorValueOne");
    var targetValue = e.target.id,
      $copyTextarea = $('#color' + targetValue),
      successful, msg;

    $copyTextarea.select(); //this selects the text inside the input field for copying
    
    try { //it's good practice to put execCommands in try catch blocks
      successful = document.execCommand('copy'); //no need to check for malicious code, color.js does
    } catch (err) {
      window.alert('Oops, unable to copy');
    }
  }


  
  ////////////////////////////////////////////////////////////////
  var $button = $(".show"),
    $copyButton = $(".copyButton");
  
  $(findCurrentValues);
  
  $button.on("click", function(e){
    showColor(e);
  });
  $copyButton.on("click", function(e) {
    clipBoard(e);
  });
  
}());