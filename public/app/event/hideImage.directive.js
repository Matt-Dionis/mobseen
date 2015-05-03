angular
	.module('app')
	.directive('hideImage', hideImage);

function hideImage() {
	var directive = {
		link: link,
		restrict: 'A'
	};
	return directive;

	function link(scope, element, attrs) {
		element.bind('error', function() {
			angular.element(this).parent().parent().attr('style', attrs.hideImage);
		})
	}
}