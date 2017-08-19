/*jslint plusplus: true*/
/*jslint white: true*/
/*globals $:false */

(function () {
  "use strict";
  
  function showColor(e) {
  //When you click the show button, it sends an alert with the color of that section
    var value = e.target.id,
      colorValue = "colorValue" + value,
      $color1 = $("#" + colorValue);

    window.alert($color1.val());
  }
  

  function findCurrentValues() {
  //Proves that the program can read all values currently selected
    var $colorValues = $(".colorValNum"),  
      $msg = " ";
    
    $colorValues.each(function() {
      $msg += " " + $(this).val();
      
    });
    window.alert($msg);
  }
  

  function clipBoard(e) {
  //function that copies each specific value
    var targetValue = e.target.id, //each copy button's id corresponds to the color value 
      $copyTextarea = $('#color' + targetValue), //this created the id for the color element
      successful, msg;

    $copyTextarea.select(); //this selects the text inside the input field for copying
    
    try { //it's good practice to put execCommands in try catch blocks
      successful = document.execCommand('copy'); //no need to check for malicious code, color.js does
    } catch (err) {
      window.alert('Oops, unable to copy');
    }
  }


  function addPalette(palettes) {
  //Add the colors you have to the palette localStorage variable
      var $name = $("#palette-name").val(),
        $colorBackground = $("#colorValueBackground").val(),
        $color1 = $("#colorValueOne").val(),
        $color2 = $("#colorValueTwo").val(),
        $color3 = $("#colorValueThree").val(),
        $color4 = $("#colorValueFour").val(),
        palette = [$colorBackground, $color1, $color2, $color3, $color4, $name];

      //background goes first for iterating purposes  
      palettes.push(palette);
      localStorage.palettes = JSON.stringify(palettes);
       window.alert(palettes.length);
  }

  function createSwatches() {
  //Create the divs that make up the swatches of the palettes
      var palettes = JSON.parse(localStorage.palettes),
        palettesLength = palettes.length,
        i, k, $background, $swatches, $swatch, paletteName, divId, $newBackground, divClass, $newColor;
      $("#swatches").html(""); 
      for (i = 0; i < palettesLength; i++) {
          $swatches = $("#swatches");
          $swatch = $("<div class='swatch'></div>");
          paletteName = palettes[i][5];
          divId = paletteName  + "-col-" + palettes[i][0];
          $newBackground = $("<div class='colorBlock color0' id='" + divId + "'></div>");
          for (k = 1; k < 5; k++) {
              divClass = "color" + k;
              divId = palettes[i][5]+ "-col-" + palettes[i][k]; //[5] is the name and [k] is the hex color
              $newColor = $("<div class='colorBlock " + divClass + "' id='" + divId + "' ></div>");    
              $newBackground.append($newColor);
          }
          $swatch.append($newBackground);
          $swatch.append("<h3 class='palette-name'>" + paletteName + "</h3>");
          $swatch.append("<button class='delete-swatch'>Delete Palette</button>");
          $swatches.append($swatch); 
      }
  }

  function colorFillSwatches() {
      $(".colorBlock").each(function () {
          var $color = "#" + $(this).attr("id").toString().slice(-6);
          //window.alert($color); 
          $(this).css("background-color", $color);
      })
  }



  function checkStorage() {
      var palettes = [];

      if (localStorage.palettes) {
          palettes = JSON.parse(localStorage.palettes);
      } else {
          localStorage.palettes = JSON.stringify(palettes);
      }
      return palettes
  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //MAIN PROGRAM BELOW////////////////////////////////////////////////////////////
 
  var $button = $(".show"),
    $copyButton = $(".copyButton"),
    $saveButton = $("#save-palette"),
    $clearButton = $("#clear-palettes"),
    palettes = checkStorage();
    
  $(createSwatches());
  $(colorFillSwatches());

  $button.on("click", function(e){
      showColor(e);
  });
  $copyButton.on("click", function(e) {
      clipBoard(e);
  });
  $clearButton.on("click", function() {
      palettes.length = 0;
      localStorage.palettes = JSON.stringify(palettes);
      $("#swatches").html("");
  });
  $saveButton.on("click", function() {
      addPalette(palettes);
      createSwatches();
      colorFillSwatches();
  }); 
}());
