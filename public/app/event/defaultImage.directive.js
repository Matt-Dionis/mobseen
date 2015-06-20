'use strict';

angular
  .module('app')
  .directive('defaultImage', defaultImage);

  function defaultImage() {
    var directive = {
      link: link,
      restrict: 'A'
    };
    return directive

    function link(scope, element, attrs) {
      element.bind('error', function() {
        element.attr('src', attrs.defaultImage);
      });
    }
  }
