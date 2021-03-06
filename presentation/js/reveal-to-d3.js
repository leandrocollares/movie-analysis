/* global Reveal */

var vis = vis || {};

vis.handleEvent = function(isSlideEvent) {
  'use strict';

  var currentSlideId = Reveal.getCurrentSlide().id;
  var currentFragment = Reveal.getIndices().f;

  // Don't go any further if the slide has no ID (i.e. the string is empty).
  if (!currentSlideId) {
    return;
  }

  //First remove any SVGs still present when changing a slide
  if (isSlideEvent) {
    removeSVGs();
  }

  // If there is no entry corresponding to the current slide in the map, don't go further.
  var functions = vis.slideIdToFunctions[currentSlideId];
  if (functions == null) {
    return;
  }

  // Call the init function when arriving on a slide for the first time.
  if (isSlideEvent) {
    var initFunction = functions.init;
    if (initFunction != null) {
      initFunction();
      // Make sure we don't call the init function again.
      //functions.init = null;
    }//if
  }//if

  var fragmentFunction = functions[currentFragment];
  if (fragmentFunction != null) {
    fragmentFunction();
  }
};

vis.handleSlideEvent = function() {
  'use strict';
  //Remove all the svg's drawn
  //vis.selectAll("svg").remove();
  vis.handleEvent(true);
};

vis.handleFragmentEvent = function() {
  'use strict';
  vis.handleEvent(false);
};

Reveal.addEventListener('slidechanged', vis.handleSlideEvent);

Reveal.addEventListener('fragmentshown', vis.handleFragmentEvent);

Reveal.addEventListener('fragmenthidden', vis.handleFragmentEvent);
