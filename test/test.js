
angular.module('quillToFabricTest', ['quillFabric'])
	.run(['QuillToFabric', 'FabricToQuill',
			function(QuillToFabric, FabricToQuill) {
		var quillToFabricButton = document.getElementById('quillToFabricButton');
		var fabricToQuillButton = document.getElementById('fabricToQuillButton');

		quillToFabricButton.onclick = function() {
			var itext = fabricCanvas.item(0),
				left, top, angle, scaleX, scaleY;
			if(itext) {
				left = itext.getLeft();
				top = itext.getTop();
				angle = itext.getAngle();
				scaleX = itext.getScaleX();
				scaleY = itext.getScaleY();
			} else {
				left = 0;
				top = 0;
				angle = 0;
				scaleX = 1;
				scaleY = 1;
			}

			fabricCanvas.clear();

			itext = QuillToFabric.getIText(bigDelta);
			itext.setLeft(left);
			itext.setTop(top);
			itext.setAngle(angle);
			itext.setScaleX(scaleX);
			itext.setScaleY(scaleY);

			fabricCanvas.add(itext);
		};

		fabricToQuillButton.onclick = function() {
			var itext = fabricCanvas.item(0);
			if(itext) {
				editor.setContents(
					FabricToQuill.getQuillDelta(itext));
			} else console.log('Unable to acquire IText.');
		};

		var editor = new Quill('#quill-editor');
		editor.addModule('toolbar', {
			container: '#quill-toolbar'
		});

		var bigDelta = {};

		editor.on('text-change', function(delta, source) {
			if(bigDelta.compose) bigDelta = bigDelta.compose(delta);
			else bigDelta = delta;
		});

		var fabricCanvas = new fabric.Canvas('fabric-itext');
		fabricCanvas.setWidth(800);
		fabricCanvas.setHeight(300);
	}]);