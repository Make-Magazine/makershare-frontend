/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
	config.allowedContent = true;
	config.extraPlugins = 'videoembed,wordcount';

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard', groups: ['clipboard', 'undo'] },
		{ name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
		{ name: 'links', groups: ['links'] },
		{ name: 'insert', groups: ['insert'] },
		{ name: 'forms', groups: ['forms'] },
		{ name: 'document', groups: ['document', 'doctools'] },
		{ name: 'tools', groups: ['tools'] },
		{ name: 'others', groups: ['others'] },
		'/',
		{ name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
		{ name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
		{ name: 'styles', groups: ['styles'] },
		{ name: 'colors', groups: ['colors'] },
		{ name: 'about', groups: ['about'] }
	];

	config.removeButtons = 'Image,Cut,Copy,Paste,PasteText,PasteFromWord,Anchor,Table,SpecialChar,Styles,About';

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	// config.removeButtons = 'Underline,Subscript,Superscript';

	// // Set the most common block elements.
	// config.format_tags = 'p;h1;h2;h3;pre';

	// // Simplify the dialog windows.
	// config.removeDialogTabs = 'image:advanced;link:advanced';

	config.wordcount = {

		// Whether or not you want to show the Paragraphs Count
		showParagraphs: false,

		// Whether or not you want to show the Word Count
		showWordCount: false,

		// Whether or not you want to show the Char Count
		showCharCount: true,

		// Whether or not you want to count Spaces as Chars
		countSpacesAsChars: true,

		// Whether or not to include Html chars in the Char Count
		countHTML: false,

		// Maximum allowed Word Count, -1 is default for unlimited
		maxWordCount: -1,

		// Maximum allowed Char Count, -1 is default for unlimited
		maxCharCount: -1,

		// Add filter to add or remove element before counting (see CKEDITOR.htmlParser.filter), Default value : null (no filter)
		filter: new CKEDITOR.htmlParser.filter({
			elements: {
				div: function (element) {
					if (element.attributes.class == 'mediaembed') {
						return false;
					}
				}
			}
		})
	};
};

/* Here we are latching on an event ... in this case, the dialog open event */

CKEDITOR.on('dialogDefinition', function (ev) {

	try {

		/* this just gets the name of the dialog */

		var dialogName = ev.data.name;

		/* this just gets the contents of the opened dialog */

		var dialogDefinition = ev.data.definition;



		/* Make sure that the dialog opened is the link plugin ... otherwise do nothing */

		if (dialogName == 'link') {

			/* Getting the contents of the Target tab */

			var informationTab = dialogDefinition.getContents('target');

			/* Getting the contents of the dropdown field "Target" so we can set it */

			var targetField = informationTab.get('linkTargetType');

			/* Now that we have the field, we just set the default to _blank
		
			A good modification would be to check the value of the URL field
		
			and if the field does not start with "mailto:" or a relative path,
		
			then set the value to "_blank" */

			targetField['default'] = '_blank';

		}

	} catch (exception) {

		alert('Error ' + ev.message);

	}

});