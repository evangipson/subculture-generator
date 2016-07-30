// Enclose our program in a SUBCULTURE
// module, which contains an immediately
// executed function enclosure that will
// return an init() function.
var SUBCULTURE = (function () {
  // Module variable
  var subcultureModule = {};
  // Every function within the SUBCULTURE
  // module should have access to the subculture
  // object, so let's declare it outside of
  // any functions.
  var subculture = {
    "prefix": "",
    "adj": [],
    "type": ""
  };
  // Random number function with optional lowNum + highNum variable.
  // If no lwo or high number is specified, the function will default
  // to ranging from 1-100.
  function randomNum(lowNum, highNum) {
    // If lowNum wasn't defined, set it to 1 to get the 1-100 range
    if (lowNum === undefined || isNaN(lowNum) || lowNum === null || typeof lowNum !== "number") {
      // If lowNum ISN'T a number, it's safe to set it to 1.
      lowNum = 1;
      // And also highNum to 100.
      highNum = 100;
    }
    // If highNum wasn't defined, set it to the first value and lowNum to 1 to get the 1-lowNum range
    if (highNum === undefined || isNaN(highNum) || highNum === null || typeof highNum !== "number") {
      // If highNum ISN'T a number, it's safe to set it the range to 1-100.
      highNum = lowNum;
      lowNum = 1;
    }
    // Take the floor of random calculation
    return Math.floor(Math.random() * (highNum - lowNum) + lowNum);
  };
  // This function will return an object representing the
  // subculture generated by the program.
  function determineSubculture() {
    // Set up the arrays containing the
    // subculture information.
    var subPrefix = [
      "neo",
      "post",
      "proto"
    ];
    var subAdj = [
      "pizza",
      "marxist",
      "leninist",
      "antebellum",
      "tropical",
      "open carry",
      "steampunk",
      "victorian",
      "industrialist",
      "anarchist",
      "zoot suit",
      "grunge",
      "cosplay",
      "BDSM",
      "southern",
      "cosplay"
    ];
    var subType = [
      "goth",
      "bohemian",
      "juggalo",
      "goth",
      "mom",
      "furry",
      "frat dad",
      "k-popper",
      "yogi",
      "trekkie",
      "evangelist",
      "couponer",
      "lolita"
    ];
    // We have a low percentage chance
    // to take on a prefix.
    if(randomNum(100) < 15) {
      subculture.prefix = subPrefix[randomNum(0, subPrefix.length - 1)];
    }
    // Get our index for the adjective array.
    var adjectiveIndex = randomNum(0, subAdj.length - 1);
    // Now we have to have at least 1
    // adjective describing the type, and
    // go ahead and push the result to subculture.adj
    subculture.adj.push(subAdj[adjectiveIndex]);
    // And a very low chance we'll have
    // two adjectives.
    if(randomNum(100) < 10) {
      // If the selected adjective is the same as the
      // adjective already in the subculture object, generate
      // a new index!
      while(subculture.adj[0] === subAdj[adjectiveIndex]) {
        adjectiveIndex = randomNum(0, subAdj.length - 1);
      }
      subculture.adj.push(subAdj[adjectiveIndex]);
    }
    // Now generate the type for the subculture.
    subculture.type = subType[randomNum(0, subType.length - 1)];
  };
  // This function will update the front end to let the user
  // know a new subculture has been generated.
  function updateHTML() {
    // Fill up our HTML with the subculture.
    var subPara = document.getElementsByClassName("subculture")[0];
    // Set up some variables for conditional output.
    var prefixString = "";
    var adjString = "";
    var typeString = "";
    // Initialize the prefix string based on
    // if we have a prefix or not (also add a
    // dash before the prefix if there is one).
    prefixString = subculture.prefix ? "You are a(n) <b>" + subculture.prefix + "-</b>" : "You are a(n) ";
    // Set up the adjective string
    // based on how many adjectives we have.
    for(var adjectives in subculture.adj) {
      if(subculture.adj.hasOwnProperty(adjectives)) {
        adjString += "<b>" + subculture.adj[adjectives] + "</b> ";
      }
    }
    // Initialize the type string.
    typeString = " <b>" + subculture.type + "</b>.";
    // Fill up the subculture <p> with
    // all the strings we've created.
    subPara.innerHTML = prefixString + adjString + typeString;
  };
  // Our initialization function for SUBCULTURE.
  subcultureModule.init = function() {
    // Run our function and get our subculture object.
    determineSubculture();
    // Update the HTML
    updateHTML();
  };
  // Give back our subculture module!
  return subcultureModule;
})(); // Execute our SUBCULTURE function enclosure.

// And now let's fire off the init function as
// soon as the document gives us the signal
// that it's ready state has either changed to
// "interactive" or "complete".
// Further reading here: 
// https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState
document.onreadystatechange = SUBCULTURE.init();