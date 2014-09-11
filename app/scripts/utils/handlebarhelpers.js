//define(["handlebars", 'jst'], function(Handlebars, JST) {
define(function(require) {
	'use strict';
	var Handlebars = require('handlebars');

	Handlebars.registerHelper('proxyUrl', function(url) {

		//http://media3.giphy.com/media/5o4RxlUcpjGXm/200w_s.gif
		return url.split('media0.giphy.com').join('localhost/prox');

	});

	/*Handlebars.registerHelper('dynamictemplate', function (template, context, opts) {
		template = template.replace(/\//g, '_');
		var f = Handlebars.partials[template];
		if (!f) {
			return "Partial not loaded";
		}

		return new Handlebars.SafeString(f(context));
	});*/

	Handlebars.registerHelper('arrToString', function(context, options) {

		return context.toString();

	});

	Handlebars.registerHelper('pop_audit_type', function(context, options) {

		// expecting something like http://www.daon.com/ws/cloudvault/GetVaultDetails
		return context.split("/").pop();

	});

	/**
	 * Handlebars Helpers - Dan Harper (http://github.com/danharper)
	 * If Equals
	 * if_eq this compare=that
	 */
	Handlebars.registerHelper('if_eq', function(context, options) {
		if (context === options.hash.compare) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	/**
	 * Handlebars Helpers - Dan Harper (http://github.com/danharper)
	 * Unless Equals
	 * unless_eq this compare=that
	 */
	Handlebars.registerHelper('unless_eq', function(context, options) {
		if (context === options.hash.compare) {
			return options.inverse(this);
		}
		return options.fn(this);
	});

	/**
	 * Handlebars Helpers - Dan Harper (http://github.com/danharper)
	 * If Greater Than
	 * if_gt this compare=that
	 */
	Handlebars.registerHelper('if_gt', function(context, options) {
		if (context > options.hash.compare) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	Handlebars.registerHelper('if_gt_or_eq', function(context, options) {
		if (context >= options.hash.compare) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	Handlebars.registerHelper('if_lt', function(context, options) {
		if (context < options.hash.compare) {
			return options.fn(this);
		}
		return options.inverse(this);
	});

	Handlebars.registerHelper('arrLen', function(arr, options) {

		return arr.length;

	});

	Handlebars.registerHelper('selectUser', function(usrs, options) {

		var out = "";
		var totalUsers = usrs.length;

		for (var i = 0; i < totalUsers; i++) {

			var usr = usrs[i];

			if(i !== 0)	{
				out = out + '<option value="'+ usr.userId	+'">';
			}else {
				out = out + '<option value="'+ usr.userId +'" selected="selected">';
			}

			out = out + usr.alias+ " ("+usr.role+")";
			out = out + '</option>\n';

		}

		return new Handlebars.SafeString(out);

	});

	Handlebars.registerHelper('selectVaultSize', function(size, options) {

		var out = "";

		for (var i = 1; i < 6; i++) {

			if((i + " GB") !== size)	{
				out = out + '<option value="'+ i +'">';
			}else {
				out = out + '<option value="'+ i +'" selected="selected">';
			}

			out = out + i + " GB";
			out = out + '</option>\n';

		}

		return new Handlebars.SafeString(out);

	});


	Handlebars.registerHelper('addIcon', function(mediaType, id, viewable) {

		var rtnStr = "";

		if(mediaType.toLowerCase() === "flash") {
			rtnStr = "<img data-viewable='"+ viewable +"' id='"+ id +"' src='imgs/flash.png'>";
		}else if(mediaType.toLowerCase() === "html") {
			rtnStr = "<img src='imgs/HTML5.png'>";
		}else if(mediaType.toLowerCase() === "pdf") {
			rtnStr = "<img src='imgs/pdf.png'>";
		}
		return new Handlebars.SafeString(rtnStr);

	});



	Handlebars.registerHelper('mediaItemsRows', function(items, options) {
		var out = "";

		for (var i = 0, l = items.length; i < l; i++) {
			out = out + '<tr>';
			out = out + '<td>' + items[i].resource_type + '</td>';
			out = out + '<td>' + items[i].mediaType + '</td>';
			out = out + '<td>' + items[i].display_title + '</td>';
			out = out + '<td>' + items[i].language + '</td>';
			out = out + '</tr>';
		}

		return out;
	});



	//Handlebars helpers
	//https://gist.github.com/1468937
	// debug helper
	// usage: {{debug}} or {{debug someValue}}
	// from: @commondream (http://thinkvitamin.com/code/handlebars-js-part-3-tips-and-tricks/)
	Handlebars.registerHelper("debug", function(optionalValue) {
		console.log("Current Context");
		console.log("====================");
		console.log(this);

		if (optionalValue) {
			console.log("Value");
			console.log("====================");
			console.log(optionalValue);
		}
	});


	//	return the first item of a list only
	// usage: {{#first items}}{{name}}{{/first}}
	Handlebars.registerHelper('first', function(context, block) {
		return block(context[0]);
	});



	// a iterate over a specific portion of a list.
	// usage: {{#slice items offset="1" limit="5"}}{{name}}{{/slice}} : items 1 thru 6
	// usage: {{#slice items limit="10"}}{{name}}{{/slice}} : items 0 thru 9
	// usage: {{#slice items offset="3"}}{{name}}{{/slice}} : items 3 thru context.length
	// defaults are offset=0, limit=5
	// todo: combine parameters into single string like python or ruby slice ("start:length" or "start,length")
	Handlebars.registerHelper('slice', function(context, block) {
		var ret = "",
			offset = parseInt(block.hash.offset, 10) || 0,
			limit = parseInt(block.hash.limit, 10) || 5,
			i = (offset < context.length) ? offset : 0,
			j = ((limit + offset) < context.length) ? (limit + offset) : context.length;

		for (i, j; i < j; i++) {
			ret += block(context[i]);
		}

		return ret;
	});

	return "nothing to return";

});
