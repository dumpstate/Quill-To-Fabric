angular.module('quillFabric')
	.factory('FabricToQuill', ['defaultStyles',
			function(defaultStyles) {
		var FabricToQuill = {};

		FabricToQuill.getQuillDelta = function(itext) {
			console.log('getQuillDelta: ', itext);
			if(itext && itext.text && itext.styles) {
				var text = itext.text;
				var delta = {};
				_.each(itext.styles, function(line) {
					//TODO
				});
				return delta;
			}
		};

		return FabricToQuill;
	}]);