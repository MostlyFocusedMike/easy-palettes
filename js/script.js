/*jslint plusplus: true*/
/*jslint white: true*/
/*globals $:false */

(function () {
  "use strict";


  function checkStorage() {
  //at the start of the program, it checks to see if there are any saved palettes
      var palettes = [
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

      //if the variable exists, and it's not empty, load the saved palettes
      if ((localStorage.palettes) && (localStorage.palettes.length > 2)) {
          palettes = JSON.parse(localStorage.palettes);
      } else { 
          //otherwise, load the default palettes
          localStorage.palettes = JSON.stringify(palettes);
      }
      return palettes;
  }
  
  
  function clipBoard(e) {
  //function that copies the value of the hexcode with or without a # infront
    var buttonValue =  e.target.id, //each copy button's id corresponds to the id of the # or non-# version of the input 
      $copyTextarea = $('#color-' + buttonValue), //this creates the id of the hash or non-hash version
      $hexValue = $('#color-' + buttonValue.slice(0, 7)).val(), //finds val of color hexcode input
      $hashInput = $('#color-' + buttonValue.slice(0, 7) + "-hex"); //gets the hash input element
    
    $hashInput.val("#" + $hexValue); //sets the hash version up in case it needs to be copied
    $copyTextarea.select(); //this selects the text inside the one of the fields for copying
    
    try { //it's good practice to put execCommands in try catch blocks
      document.execCommand('copy'); //no need to check for malicious code, color.js does
    } catch (err) {
      window.alert('Oops, unable to copy');
    }
  }

  
  function clearPaletteInput(event) {
  //overcomes jscolor to clear input in case user wants to paste in number
    var $input = $(event.target);
    
    $input.focus();
    $input.val("");
  }
  
  
  function addPalette() {
  //Add the colors you have to the palette localStorage variable
      var $name = $("#palette-name"),
        $nameVal = $name.val(),
        $colorBackground = $("#color-value-0").val(),
        $color1 = $("#color-value-1").val(),
        $color2 = $("#color-value-2").val(),
        $color3 = $("#color-value-3").val(),
        $color4 = $("#color-value-4").val(),
        palettes = JSON.parse(localStorage.palettes),
        palettesLength = palettes.length,
        palette = [$colorBackground, $color1, $color2, $color3, $color4, $nameVal],
        i;
    
      //checks if the user entered a name or not
      if ($nameVal === "Palette Name Here" || $nameVal === "") {
          window.alert("Don't forget to name your palette!");
          $name.val("").focus();
          return false;
      }
      //if there's a match, it's updated instead of creating a new entry
      for (i = 0; i < palettesLength; i++) {
          if ($name.val() === palettes[i][5]) {
              palettes[i] = palette;
              localStorage.palettes = JSON.stringify(palettes);
              return true; 
          }
      } 
      palettes.unshift(palette); //unshift to add the palette to the front of the array
      localStorage.palettes = JSON.stringify(palettes);
       //window.alert(palettes.length);
      $name.val("Palette Name Here"); 
      return true;
  }


  function createSwatches(loadSwatch, removeSwatch) {
  //Create the divs that make up the swatches of the palettes
      var palettes = JSON.parse(localStorage.palettes),
        palettesLength = palettes.length,
        $swatches = $("#swatches"),
        i, $swatch, paletteName, divId, $loadButton, $swatchColors,
        k, colorClass, $newColor, $deleteButton, 
        $color;
      
      $swatches.empty(); 
      for (i = 0; i < palettesLength; i++) { 
          $swatch = $("<div class='swatch'></div>");
          paletteName = palettes[i][5]; //"here's"
          divId = "swatch" + i;
          $loadButton =  $("<button class='load-swatch'>Load Palette</button>").click(loadSwatch);
          $swatch.append($loadButton);
        
          //creating the group of 5 colors 
          $swatchColors = $("<div class='swatch-colors' id='" + divId + "'></div>");
          for (k = 0; k < 5; k++) {
              colorClass = "color" + k;
              divId = i + "-col-" + k + "-" + palettes[i][k]; //[5] is the name and [k] is the hex color  palettes[i][5]
              $newColor = $("<div class='color-block " + colorClass + "' id='" + divId + "' ></div>");    
              $swatchColors.append($newColor);
          }
          $swatch.append($swatchColors);
          $swatch.append("<div class='mid'><h3 class='palette-name'></h3></div>");
          $deleteButton = $("<button class='remove-swatch'>Delete Palette</button>").click(removeSwatch);
          $swatch.append($deleteButton);
          $swatch.hide().appendTo($swatches);
          $(".palette-name").eq(i).text(paletteName); //keeps user entered HTML from causing problems
      }
      //fade in animation
      $(".swatch").each(function(i) {
          $(this).delay(100 * i).fadeIn(500);
      });
    
      //colors in each of the color blocks now that they are created
      $(".color-block").each(function () {  
          $color = "#" + $(this).attr("id").toString().slice(-6);
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
        palettes = JSON.parse(localStorage.palettes), i;
    //focus is needed since jscolor only updates the the styleElement if the valueElement focus
    for (i = 0; i < 5; i++) {
        $("#color-value-" + i).val(palettes[$index][i]).focus(); 
    }
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
    localStorage.palettes = JSON.stringify(palettes);
    $swatch.animate(
        {top: '+=50', opacity: 0.0}, 300,
        function() {
            $swatch.remove();
    });
  }

  
  function clearSwatches(palettes) {
      palettes.length = 0;
      localStorage.palettes = JSON.stringify(palettes);
      $(".swatch").fadeOut(700);
  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //MAIN PROGRAM BELOW////////////////////////////////////////////////////////////
  var $copyButton = $(".copy-button"),
    $saveButton = $("#save-palette"),
    $clearButton = $("#clear-palettes"),
    $nameForm = $("#palette-name"),
    $inputs = $("input"),
    palettes = checkStorage(),
    $background = $("#background"),
    key;
    
  $(createSwatches(loadSwatch, removeSwatch));
  
  $copyButton.on("click", function(e) {
      clipBoard(e);
  });
  
  $inputs.on("click", function(event) {
      clearPaletteInput(event);
  });
  
  $nameForm.keypress(function(event) {
      key = event.which;
      if(key === 13) {
          if (addPalette()) {
              createSwatches(loadSwatch, removeSwatch);
          }
      } 
   });
  
  $saveButton.on("click", function() {
      if (addPalette()) {
          createSwatches(loadSwatch, removeSwatch);
      }  
  });
  
  $clearButton.on("click", function() {
      clearSwatches(palettes);
  });
  
  $background.on("click", function (event) {
      $("#bkg").css("visibility", "visible");
	});
  
}());
