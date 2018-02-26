/* global d3 */

var vis = vis || {};

vis.slideIdToFunctions = {
  'movie-titles': {
    'init': function() {
      vis.movieTitles.init();
    }
  },
  'movie-languages': {
    'init': function() {
      vis.movieLanguages.init();
    }
  },
  'releases-per-day-of-the-week': {
    'init': function() {
      vis.releasesPerDayOfTheWeek.init();
    }
  },
  'releases-per-decade': {
    'init': function() {
      vis.releasesPerDecade.init();
    }
  }
};

function removeSVGs() {
  d3.select('#movie-titles movieTitles svg').remove();
  d3.select('#movie-languages movieLanguages svg').remove();
  d3.select('#releases-per-day-of-the-week releasesPerDayOfTheWeek svg').remove(); 
  d3.select('#releases-per-decade releasesPerDecade svg').remove(); 

}