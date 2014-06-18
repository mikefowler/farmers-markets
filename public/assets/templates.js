this["JST"] = this["JST"] || {};

this["JST"]["search-result"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<h1>";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " (<a href=\"";
  if (helper = helpers.map) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.map); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">map</a>)</h1>";
  return buffer;
  });

this["JST"]["search"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1 class=\"search__heading\">Farmers' Markets</h1>\n\n<form>\n	<label class=\"search__label\" for=\"zipcode\">Zip Code</label>\n	<span class=\"search__prefix\">in</span>\n	<input id=\"zipcode\" type=\"text\" class=\"search__input js-input\" autofocus=\"autofocus\">\n</form>\n\n<div class=\"search__results js-results\"></div>";
  });