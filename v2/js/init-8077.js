var PATH_BASE = 'http://192.168.1.195:8077/v2';
//var PATH_BASE = '';
var PATH_JQUI_JS = 'lib/jquery-ui/js';
var PATH_JQUI_CSS = PATH_BASE + '/lib/jquery-ui/css';
var PATH_JQUI_EFFECT = PATH_JQUI_JS + '/effects';
var PATH_JQUI_WIDGET = PATH_JQUI_JS + '/widgets';
	
requirejs.config({
	baseUrl: PATH_BASE,
	paths: {
		// Vendor
		'avalon': 'js/avalon/avalon-1.5.6.shim.min',
		'text': 'js/require/text',
		'css': 'js/require/css',
		
		// Bootstrap
		'bs': 'lib/bootstrap/js',
		
		// jQuery UI
		'jq/accordion': PATH_JQUI_WIDGET + '/accordion',
		'jq/autocomplete': PATH_JQUI_WIDGET + '/autocomplete',
		'jq/button': PATH_JQUI_WIDGET + '/button',
		'jq/checkboxradio': PATH_JQUI_WIDGET + '/checkboxradio',
		'jq/controlgroup': PATH_JQUI_WIDGET + '/controlgroup',
		'jq/datepicker_core': PATH_JQUI_WIDGET + '/datepicker',
		'jq/datepicker': PATH_JQUI_JS + '/i18n/datepicker-zh-CN',
		'jq/dialog': PATH_JQUI_WIDGET + '/dialog',
		'jq/draggable': PATH_JQUI_WIDGET + '/draggable',
		'jq/droppable': PATH_JQUI_WIDGET + '/droppable',
		'jq/menu': PATH_JQUI_WIDGET + '/menu',
		'jq/mouse': PATH_JQUI_WIDGET + '/mouse',
		'jq/progressbar': PATH_JQUI_WIDGET + '/progressbar',
		'jq/resizable': PATH_JQUI_WIDGET + '/resizable',
		'jq/selectmenu': PATH_JQUI_WIDGET + '/selectmenu',
		'jq/slider': PATH_JQUI_WIDGET + '/slider',
		'jq/spinner': PATH_JQUI_WIDGET + '/spinner',		
		'jq/selectable': PATH_JQUI_WIDGET + '/selectable',
		'jq/sortable': PATH_JQUI_WIDGET + '/sortable',
		'jq/tabs': PATH_JQUI_WIDGET + '/tabs',
		'jq/tooltip': PATH_JQUI_WIDGET + '/tooltip',
		'form-reset-mixin': PATH_JQUI_JS + '/form-reset-mixin',
		'escape-selector': PATH_JQUI_JS + '/escape-selector',
		'data': PATH_JQUI_JS + '/data',
		'disable-selection': PATH_JQUI_JS + '/disable-selection',
		'focusable': PATH_JQUI_JS + '/focusable',
		'form': PATH_JQUI_JS + '/form',
		'ie': PATH_JQUI_JS + '/ie',
		'labels': PATH_JQUI_JS + '/labels',
		'plugin': PATH_JQUI_JS + '/plugin',
		'position': PATH_JQUI_JS + '/position',
		'safe-active-element': PATH_JQUI_JS + '/safe-active-element',
		'safe-blur': PATH_JQUI_JS + '/safe-blur',
		'scroll-parent': PATH_JQUI_JS + '/scroll-parent',
		'tabbable': PATH_JQUI_JS + '/tabbable',
		'version': PATH_JQUI_JS + '/version',
		'keycode': PATH_JQUI_JS + '/keycode',
		'unique-id': PATH_JQUI_JS + '/unique-id',
		'widget': PATH_JQUI_JS + '/widget',
		
		// Other plugin
		'ff/dialog': 'lib/artdialog/js/dialog-plus',
		'frontEngineDialog': 'lib/artdialog/js/dialogUtils',
		'ff/select2': 'lib/select2/js/select2.full.min',
		
		// jQuery Validation
		'ff/validate_core': 'lib/validation/jquery.validate.min',
		'ff/messages_zh': 'lib/validation/localization/messages_zh',
		'ff/validationSetDefaults': 'lib/validation/validationSetDefaults',
		'ff/additionalMethods': 'lib/validation/additionalMethods',
		'ff/validate': 'lib/validation/validationUtils',
		
		'ff/treetable': 'lib/treetable/js/jquery.treeTable',
		'ff/ztree': 'lib/ztree/js/jquery.ztree.all.min'
	},
	priority: ['css', 'text'],
	shim: {
		'avalon': {exports: 'avalon'},
		
		// Bootstrap
		'bs/affix': {exports: '$.fn.bsAffix'},
		'bs/alert': {deps:['bs/transition'], exports: '$.fn.bsAlert'},
		'bs/button': {exports: '$.fn.bsButton'},
		'bs/carousel': {deps:['bs/transition'], exports: '$.fn.bsCarousel'},
		'bs/collapse': {deps:['bs/transition'], exports: '$.fn.bsCollapse'},
		'bs/dropdown': {exports: '$.fn.bsDropdown' },
		'bs/modal': {exports: '$.fn.bsModal'},
		'bs/popover': {deps:['bs/tooltip'], exports: '$.fn.bsPopover'},
		'bs/scrollspy': {exports: '$.fn.bsScrollspy'},
		'bs/tab': {deps:['bs/transition'], exports: '$.fn.bsTab'},
		'bs/tooltip': {deps:['bs/transition'], exports: '$.fn.bsTooltip'},
		'bs/transition': {exports: '$.support.bsTransition'},
		
		// jQuery UI
		'jq/accordion': {deps: ['css!'+ PATH_JQUI_CSS +'/accordion.css']},
		'jq/autocomplete': {deps: ['css!'+ PATH_JQUI_CSS +'/autocomplete.css']},
		'jq/checkboxradio': {deps: ['css!'+ PATH_JQUI_CSS +'/checkboxradio.css']},
		'jq/controlgroup': {deps: ['css!'+ PATH_JQUI_CSS +'/controlgroup.css']},
		'jq/button': {deps: ['css!'+ PATH_JQUI_CSS +'/button.css']},
		'jq/datepicker': {deps: ['css!'+ PATH_JQUI_CSS +'/datepicker.css']},
		'jq/dialog': {deps: ['css!'+ PATH_JQUI_CSS +'/dialog.css']},
		'jq/draggable': {deps: ['css!'+ PATH_JQUI_CSS +'/draggable.css']},
		'jq/menu': {deps: ['css!'+ PATH_JQUI_CSS +'/menu.css']},
		'jq/progressbar': {deps: ['css!'+ PATH_JQUI_CSS +'/progressbar.css']},
		'jq/selectable': {deps: ['css!'+ PATH_JQUI_CSS +'/selectable.css']},
		'jq/selectmenu': {deps: ['css!'+ PATH_JQUI_CSS +'/selectmenu.css']},
		'jq/slider': {deps: ['css!'+ PATH_JQUI_CSS +'/slider.css']},
		'jq/sortable': {deps: ['css!'+ PATH_JQUI_CSS +'/sortable.css']},
		'jq/spinner': {deps: ['css!'+ PATH_JQUI_CSS +'/spinner.css']},
		'jq/resizable': {deps: ['css!'+ PATH_JQUI_CSS +'/resizable.css']},
		'jq/tabs': {deps: ['css!'+ PATH_JQUI_CSS +'/tabs.css']},
		'jq/tooltip': {deps: ['css!'+ PATH_JQUI_CSS +'/tooltip.css']},
		
		// Other
		'ff/dialog': {deps: ['css!' + PATH_BASE + '/lib/artdialog/css/ui-dialog.css'],exports:'dialog'},
		'frontEngineDialog': {deps: ['ff/dialog']},
		'ff/select2': {deps: ['css!' + PATH_BASE + '/lib/select2/css/select2.css']},
		'ff/validate': {deps: ['css!' + PATH_BASE + '/lib/validation/css/validation.css']},
		'ff/treetable': {deps: ['css!' + PATH_BASE + '/lib/treetable/css/jquery.treeTable.css'], exports:'$.fn.treeTable'},
		'ff/ztree': {deps: ['css!' + PATH_BASE + '/lib/ztree/css/metro/metro.css'], exports:'$.fn.zTree'}
	},
	enforceDefine: true,
	
	// Avoid cache by RequireJS
	urlArgs: "bust=" +  (new Date()).getTime()
});	
// END: requirejs.config