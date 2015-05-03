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
			element.parent().parent().css({'display': 'none'});
		})
	}
}