
angular.module("quillToFabricTest", ['quillToFabric'])
	.run(['QuillToFabric',
			function(QuillToFabric) {
		var editor = new Quill('#quill-editor');
		editor.addModule('toolbar', {
			container: '#quill-toolbar'
		});

		var bigDelta = {};

		editor.on('text-change', function(delta, source) {
			if(bigDelta.compose) bigDelta = bigDelta.compose(delta);
			else bigDelta = delta;

			var group = fabricCanvas.item(0),
				left, top, angle, scaleX, scaleY;
			if(group) {
				left = group.getLeft();
				top = group.getTop();
				angle = group.getAngle();
				scaleX = group.getScaleX();
				scaleY = group.getScaleY();
			} else {
				left = 0;
				top = 0;
				angle = 0;
				scaleX = 1;
				scaleY = 1;
			}

			fabricCanvas.clear();

			group = QuillToFabric.getIText(bigDelta);
			group.setLeft(left);
			group.setTop(top);
			group.setAngle(angle);
			group.setScaleX(scaleX);
			group.setScaleY(scaleY);

			fabricCanvas.add(group);
		});

		var fabricCanvas = new fabric.Canvas('fabric-itext');
		fabricCanvas.setWidth(800);
		fabricCanvas.setHeight(300);
	}]);