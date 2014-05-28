angular.module('quillFabric')
	.factory('FabricToQuill', ['defaultStyles',
			function(defaultStyles) {
		var FabricToQuill = {};

		var fontSize = function(style) {
			if(style && style.fontSize)
				return style.fontSize + 'px';
			else
				return defaultStyles.fontSize + 'px';
		};

		var fontFamily = function(style) {
			if(style && style.fontFamily) {
				return style.fontFamily;
			} else return defaultStyle.fontFamily;
		};

		var isItalic = function(style) {
			if(style && style.fontStyle) {
				return style.fontStyle.indexOf('italic') > -1;
			} else return false;
		};

		var isBold = function(style) {
			if(style && style.fontWeight) {
				return style.fontWeight.indexOf('bold') > -1;
			} else return false;
		};

		var isUnderline = function(style) {
			if(style && style.textDecoration) {
				return style.textDecoration.indexOf('underline') > -1;
			} else return false;
		};

		var isStrike = function(style) {
			if(style && style.textDecoration) {
				return style.textDecoration.indexOf('line-through') > -1;
			} else return false;
		};

		var trimStyles = function(itextStyles) {
			var styles = [];

			for(var lineNum in itextStyles) {
				if(Object.keys(itextStyles[lineNum]).length > 0) {
					styles.push({
						'line': parseInt(lineNum),
						'styles': itextStyles[lineNum]
					});
				}
			}

			return styles;
		};

		var trimText = function(itextText) {
			return itextText.split('\n')
				.filter(function(line) {
					return line.length > 0;
				});
		};

		var prepLines = function(itextStyles, itextText) {
			var textLines = trimText(itextText),
			    styles = trimStyles(itextStyles);
			if(textLines.length === styles.length) {
				for(var i = 0; i < styles.length; i++) {
					styles[i].text = textLines[i];
				}
			}
			return styles;
		};

		/**
		 * Method that expects fabric.IText object and returns
		 * QuillJS delta object preserving content and formatting.
		 */
		FabricToQuill.getQuillDelta = function(itext) {
			if(itext && itext.text && itext.styles) {
				var delta = [];

				var previousLineNo = -1;
				// prepare the line objects first, and iterate
				// over the lines
				_.each(prepLines(itext.styles, itext.text), function(line) {
					// the information about new lines is stored
					// as a difference between current and the previous
					// line.line property. So we're insering another
					// delta object, containing only 'value' with
					// new line character repeated appropriate number of times.
					if(previousLineNo >= 0) {
						delta.push({
							'value': new Array(line.line - previousLineNo + 1).join('\n')
						});
					}

					// update previous line
					previousLineNo = line.line;

					// iterating over characters given in line,
					// for each character, appropiate delta object
					// is being composed
					for(var i = 0; i < line.text.length; i++) {
						var style = line.styles[i];
						delta.push({
							'value': line.text[i],
							'attributes': {
								'size': fontSize(style),
								'font': fontFamily(style),
								'italic': isItalic(style),
								'bold': isBold(style),
								'underline': isUnderline(style),
								'strike': isStrike(style),
								'color': style.fill,
								'background': style.textBackgroundColor
							}
						});
					}
				});

				return delta;
			}
		};

		return FabricToQuill;
	}]);