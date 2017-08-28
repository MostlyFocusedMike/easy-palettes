/*jslint plusplus: true*/
/*jslint white: true*/
/*globals $:false */

(function () {
  "use strict";


  function checkStorage() {
  //at the start of the program, it checks to see if there are any saved palettes
      var loadedContent = JSON.parse(localStorage.palettes),
        palettes = [
          ["395ABD","84CEEB","5AB9EA","C1C8E4","8860D0","Clean and Energetic"],
          ["59253A","78244C","895061","0677A1","2D4159","Unique Combination"],
          ["026670","9FEDD7","FEF9C7","FCE181","EDEAE5","Lively Yet Soothing"],
          ["61892F","86C232","222629","474B4F","6B6E70","Gorgeous Contrast"],
          ["0B0C10","1F2833","C5C6C7","66FCF1","45A29E","Striking and Simple"],
          ["1A1A1D","4E4E50","6F2232","950740","C30735","Contemporary and Bold"],
          ["0C0032","190061","240090","3500D3","282828","Deep Purple and Blues"],
          ["E27D60","E8A87C","C38D9E","85DCBB","41B3A3","Colorful and Balanced"],
          ["501F3A","CB2D6F","CCCCCC","14A098","0F292F","Eye-Catching and Sleek"],
          ["F24949","FCFF3B","36FF61","40A9FF","C74FFF","Rainbow"]
        ];

      if ((loadedContent.length >= 1) || (loadedContent === "undefined")) {
          palettes = loadedContent;
      } else {
          localStorage.palettes = JSON.stringify(palettes);
      }
      return palettes;
  }


  function showColor(e) {
  //When you click the show button, it sends an alert with the color of that section
    var value = e.target.id,
      colorValue = "colorValue" + value,
      $color1 = $("#" + colorValue);

    //window.alert($color1.val());
  }
  

  function findCurrentValues() {
  //Proves that the program can read all values currently selected
    var $colorValues = $(".colorValNum"),  
      $msg = " ";
    
    $colorValues.each(function() {
      $msg += " " + $(this).val();
      
    });
    //window.alert($msg);
  }
  

  function clipBoard(e) {
  //function that copies each hash value
    var targetValue =  e.target.id, //each copy button's id corresponds to the color value 
      $copyTextarea = $('#color-' + targetValue), //makes the id of the hash or non-hash version
      $hashInput = $('#color-' + targetValue.slice(0, 7) + "-hex"), //selects the hash input always
      $hashValue = $('#color-' + targetValue.slice(0, 7)).val(), 
      successful;
    
    $hashInput.val("#" + $hashValue);
    $copyTextarea.select(); //this selects the text inside the input field for copying
    
    try { //it's good practice to put execCommands in try catch blocks
      document.execCommand('copy'); //no need to check for malicious code, color.js does
    } catch (err) {
      window.alert('Oops, unable to copy');
    }
  }

  function addPalette() {
  //Add the colors you have to the palette localStorage variable
      var $name = $("#palette-name").val(),
        $colorBackground = $("#color-value-0").val(),
        $color1 = $("#color-value-1").val(),
        $color2 = $("#color-value-2").val(),
        $color3 = $("#color-value-3").val(),
        $color4 = $("#color-value-4").val(),
        palettes = JSON.parse(localStorage.palettes),
        palette = [$colorBackground, $color1, $color2, $color3, $color4, $name],
        i;
      //window.alert(JSON.stringify(localStorage.palettes));
      
      if ($name === "Palette Name Here" || $name === "") {
          window.alert("Don't forget to name your palette!");
          $("#palette-name").val("").focus();
          return;
      }
      //if there's a match, it's updated instead of creating a new entry
      for (i = 0; i < palettes.length; i++) {
          if ($name === palettes[i][5]) {
              palettes[i] = palette;
              localStorage.palettes = JSON.stringify(palettes);
              return; 
          }
      } 
      palettes.unshift(palette); //unshift to add the palette to the front of the array
      localStorage.palettes = JSON.stringify(palettes);
       //window.alert(palettes.length);
      $("#palette-name").val("Palette Name Here"); 
  }


  function createSwatches(loadSwatch, removeSwatch) {
  //Create the divs that make up the swatches of the palettes
      var palettes = JSON.parse(localStorage.palettes),
        palettesLength = palettes.length,
        i, k, $background, $swatches, $swatch, paletteName, divId, $swatchColors, divClass, $newColor, $deleteButton, $loadButton, newWidth;
      $swatches = $("#swatches");
      $swatches.empty(); 
      for (i = 0; i < palettesLength; i++) { 
          $swatch = $("<div class='swatch'></div>");
          paletteName = palettes[i][5];
          divId = paletteName  + "-col-" + palettes[i][0];
          $loadButton =  $("<button class='load-swatch'>Load Palette</button>").click(loadSwatch);
          $swatchColors = $("<div class='swatch-colors' id='" + divId + "'></div>");
          $swatch.append($loadButton);
          for (k = 0; k < 5; k++) {
              divClass = "color" + k;
              divId = palettes[i][5]+ "-col-" + palettes[i][k]; //[5] is the name and [k] is the hex color
              $newColor = $("<div class='colorBlock " + divClass + "' id='" + divId + "' ></div>");    
              $swatchColors.append($newColor);
          }
          $swatch.append($swatchColors);
          $swatch.append("<div class='mid'><h3 class='palette-name'></h3></div>");
          $deleteButton = $("<button class='remove-swatch'>Delete Palette</button>").click(removeSwatch);
          $swatch.append($deleteButton);
          $swatch.hide().appendTo($swatches);
          $(".palette-name").eq(i).text(paletteName);
      }
      $(".swatch").each(function(i) {
          $(this).delay(100 * i).fadeIn(500);
      });
      
  }


  function colorFillSwatches() {
  //once the swatches are created they are colored
      $(".colorBlock").each(function () {  
          var $color = "#" + $(this).attr("id").toString().slice(-6);
          //window.alert($color); 
          $(this).css("background-color", $color);
      }); 
  }


  function loadSwatch() {
  //Load selected swatch into five main colors 
    var $button = $(event.target),
        $swatch = $button.parent(),
        $swatches = $(".swatch"),
        $index = $swatches.index($swatch),
        palettes = JSON.parse(localStorage.palettes);
    //the .focus is needed beacuse jscolor will only update the 
     //the styleElement if the value element has focus
    $("#color-value-0").val(palettes[$index][0]).focus(); 
    $("#color-value-1").val(palettes[$index][1]).focus();       
    $("#color-value-2").val(palettes[$index][2]).focus();
    $("#color-value-3").val(palettes[$index][3]).focus();
    $("#color-value-4").val(palettes[$index][4]).focus();   
    $("#palette-name").val(palettes[$index][5]).focus();
  }


  function removeSwatch(event) {
  //removes selected swatch 
    var $button = $(event.target),
        $swatch = $button.parent(),
        $swatches = $(".swatch"),
        $index = $swatches.index($swatch),
        palettes = JSON.parse(localStorage.palettes);
   
    palettes.splice($index, 1);
    //window.alert($index);
    //window.alert(JSON.stringify(palettes));
    localStorage.palettes = JSON.stringify(palettes);
    //window.alert(JSON.stringify(localStorage.palettes));
    $swatch.animate({
        top: '+=50', // increase by 50
        opacity: 0.0
        },
        300,
        function() {
            $swatch.remove();
      });
  }
  
  function clearPaletteInput(event) {
  //overcomes jscolor to clear input in case user wants to paste in number
    var $input = $(event.target);
    
    $input.focus();
    $input.val("");
  }

  
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //MAIN PROGRAM BELOW////////////////////////////////////////////////////////////
 
  var $button = $(".show"),
    $copyButton = $(".copy-button"),
    $saveButton = $("#save-palette"),
    $clearButton = $("#clear-palettes"),
    $nameForm = $("#palette-name"),
    $inputs = $("input"),
    $jsColor = $(".jscolor"),
    palettes = checkStorage();
    
  $(createSwatches(loadSwatch, removeSwatch));
  $(colorFillSwatches());

  $button.on("click", function(e){
      showColor(e);
  });
  $inputs.on("click", function() {
      clearPaletteInput(event);
  });
  $copyButton.on("click", function(e) {
      clipBoard(e);
  });
  $nameForm.keypress(function(event) {
      var key = event.which;
      if(key === 13) {
          addPalette(); //todo add true check to see if need to reload palettes when fail
          createSwatches(loadSwatch, removeSwatch);
          colorFillSwatches();
      } 
   });
  $saveButton.on("click", function() {
      addPalette();
      createSwatches(loadSwatch, removeSwatch);
      colorFillSwatches();
  });
  $clearButton.on("click", function() {
      palettes.length = 0;
      localStorage.palettes = JSON.stringify(palettes);
      $(".swatch").fadeOut(500);
  });
   
  
}());
