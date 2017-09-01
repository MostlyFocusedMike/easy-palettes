/*jslint plusplus: true*/
/*jslint white: true*/
/*globals $:false */

(function () {
  "use strict";


  function checkStorage() {
  //at the start of the program, it checks to see if there are any saved palettes
      var palettes = [
          ["000000","2F2E33","D5D6D2","FFFFFF","3A5199","Sleek and Modern"],
          ["600A0A","A10115","D72C16","F0EFEA","C0B2B5","Wintery Reds"],
          ["FFFBB4","FFCCBB","6EB5C0","006C84","E2E8E4","Arctic Sunrise"],
          ["E1F5C4","EDE574","F9D423","FC913A","FF4E50","Arizona Morning"],
          ["D0E2FF","8F93AE","5A4E4D","7E675E","DDA288","Cosmopolitan"],
          ["010609","04202C","304040","5B7065","C9D1C8","Misty Greens"],
          ["1B2D32","2C4A52","537072","8E9B97","F4EBDB","Hazy Grays"],
          ["61892F","86C232","222629","474B4F","6B6E70","Gorgeous Contrast"],
          ["0B0C10","1F2833","C5C6C7","66FCF1","45A29E","Striking and Simple"],
          ["1A1A1D","4E4E50","6F2232","950740","C30735","Contemporary and Bold"],
          ["0C0032","190061","240090","3500D3","282828","Deep Purple and Blues"],
          ["1B1010","50312F","CB0000","E4EA8C","3F6C45","Bold Berries"],
          ["B38867","DDBC95","FFF8F1","CDCDC0","626D71","Neutral and Versatile"],
          ["FEFEFE","EBEBEC","BCBABE","A1D6E2","1995AD","Icy Blues and Grays"],
          ["0D1C20","1E434C","8D230F","9B4F0F","C99E10","Autumn in Vermont"],
          ["D0EEFF","90AFC5","336B87","2A3132","763626","Subdued and Professional"], 
          ["000000","000B29","D70026","EDB83D","F8F5F2","Bold and Basic"],
          ["FAE500","FAAF08","FA812F","FA4032","FEF3E2","Sunny Citrus"],
          ["0E0F1D","16253D","002F5B","EFB509","CD7213","Classy and Timeless"],
          ["000000","20232A","ACBEBE","F4F4EF","A01D26","Industrial in Control"],
          ["444C5C","CE5A57","78A5A3","E1B161","FFF2D7","Warm and Cool"],
          ["335252","D4DDE1","BB3F3F","50231E","2D3033","Understated and Versatile"],
          ["4B4345","556DAC","6CAEFF","F79B77","755248","Salmon Lunch"],
          ["100F11","363237","2D4262","73605B","D09683","Sunset to Dusk"],
          ["5D535E","9A9EAB","EC96A4","DFE166","FFFEE2","Birds and Berries"],
          ["370B00","7F0629","A71208","8A3507","CDB999","Homey"],
          ["FFCC32","DA8950","FFFFFF","35AEF9","565B60","Homer"],
          ["001118","00293C","1E656D","F1F3CE","F62A00","Timeless and Nautical"],
          ["F0810F","E6DF44","FEFFE2","063852","011A27","Day and Night"],
          ["1B0B0B","F4CC70","DE7A22","20948B","6AB187","Surf and Turf"],
          ["E4FFF8","98DBC6","5BC8AC","E6D72A","F18D9E","Refreshing and Pretty"],
          ["001B20","003B46","07575B","66A5AD","C4DFE6","Cool Blues"],
          ["1C1C25","505160","68829E","AEBD38","598234","Crisp and Dramatic"],
          ["F98866","FF420E","F1FCFF","80BD9E","89DA59","Fresh and Bright"],
          ["F8B195","F67280","C06C84","6C5B7B","355C7D","Fading Sunset"],
          ["E5FCC2","9DE0AD","45ADA8","547980","594F4F","By The Pond"], 
          ["395ABD","84CEEB","5AB9EA","C1C8E4","8860D0","Clean and Energetic"],
          ["59253A","78244C","895061","0677A1","2D4159","Unique Combination"],
          ["026670","9FEDD7","FEF9C7","FCE181","EDEAE5","Lively Yet Soothing"],
          ["E27D60","E8A87C","C38D9E","85DCBB","41B3A3","Colorful and Balanced"],
          ["501F3A","CB2D6F","CCCCCC","14A098","0F292F","Eye-Catching and Sleek"],
          ["F24949","FCFF3B","36FF61","40A9FF","C74FFF","Rainbow"]
        ];

      try {
          //if the variable exists, and it's not empty, load the saved palettes
          if ((localStorage.palettes) && (localStorage.palettes.length > 2)) {
              palettes = JSON.parse(localStorage.palettes);
          } else { 
              //otherwise, load the default palettes
              localStorage.palettes = JSON.stringify(palettes);
          }
      }
      catch(err) {
          //if for some reason they are using incognito mode the program won't work, it needs
          //localStorage access to function
          window.alert("Hey, it looks like you're using private mode, or some other browser that restricts access to local storage. You wont be able to save your work if you stay in this mode, please switch to a public browser to get the full use out of this page.")
      }
    
      
      return palettes;
  }
  
  
  function clipBoard(e) {
  //function that copies the value of the hexcode with or without a # infront, or export
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
    //Mobile browsers can't reliably use the copy/paste buttons, so the only way to copy colors is by doing it 
    //manually, so clearing the inputs wont help them. However, since this is app is pretty useless on mobile 
    //anyway, It isn't worth it to find a plugin that keeps this feature. 
    //I just want to finish this project.
    if (event.target.id === "palette-name") {
        $input.focus();
        $input.val("");
    }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        return false;
    }
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
          $(this).delay(50 * i).fadeIn(250);
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
        {top: '+=50', opacity: 0.0}, 
        300,
        function() {
            $swatch.remove();
        }
    );
  }

  
  function clearSwatches(palettes) {
      palettes.length = 0;
      localStorage.palettes = JSON.stringify(palettes);
      $(".swatch").each(function() {
          $(this).animate(
              {top: '+=50', opacity: 0.0}, 
              300
          )
      });
  }
  
  
  function exportSwatches() {
  //presents all swatches for copying
      var palettes = JSON.parse(localStorage.palettes),
        palettesLength = palettes.length,
        $exportPopUp = $("#export-pop-up-colors"),
        $copyField = $("#color-copy-all"),
        i, paletteName, colors;

      $exportPopUp.html("")
      for (i=0; i < palettesLength; i++) {
          paletteName = palettes[i][5]
          $exportPopUp.append("<h3>" + paletteName + ": </h3>");
          colors = " " + palettes[i][0] + ", " + palettes[i][1] + ", " + palettes[i][2] + ", " + palettes[i][3] + ", " + palettes[i][4] + " ";
          $exportPopUp.append("<p>" + colors + "</p>");
      }
      $copyField.val($exportPopUp.text());
  }
  
  
  function menuItems(event) {
  //handles the menu bar events
      var button = event.target.id,
        $help = $("#help"),
        $export = $("#export"),
        $popUp = $("#pop-up"),
        $helpPopUp = $("#help-pop-up"),
        $exportPopUp = $("#export-pop-up"),
        $close = $("#close");

      if (button === "help") {
        $popUp.css("display", "block");
        $exportPopUp.css("display", "none");
        $helpPopUp.css("display", "block");
      } else if (button === "export") {
        $popUp.css("display", "block");
        $helpPopUp.css("display", "none");
        $exportPopUp.css("display", "block");
        exportSwatches();  
      }

  }

  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //MAIN PROGRAM BELOW////////////////////////////////////////////////////////////
  var $copyButton = $(".copy-button"),
    $wrapper = $("#wrapper"),
    $saveButton = $("#save-palette"),
    $clearButton = $("#clear-palettes"),
    $nameForm = $("#palette-name"),
    $inputs = $("input"),
    palettes = checkStorage(),
    $background = $("#background"),
    $nav = $("nav"),
    $popUp = $("#pop-up"),
    $close = $("#close"),
    key;
    
  $(createSwatches(loadSwatch, removeSwatch));
  
  $nav.on("click", function(event) {
       menuItems(event);
  });
  
  $close.on("click", function() {
      $popUp.css("display", "none");  
  })
  
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
