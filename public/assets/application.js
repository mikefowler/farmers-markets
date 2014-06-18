System.register("../../app/assets/javascripts/entities", [], function() {
  "use strict";
  var __moduleName = "../../app/assets/javascripts/entities";
  var Market = function Market() {
    $traceurRuntime.defaultSuperCall(this, $Market.prototype, arguments);
  };
  var $Market = Market;
  ($traceurRuntime.createClass)(Market, {}, {}, Backbone.Model);
  var Markets = function Markets(options) {
    $traceurRuntime.superCall(this, $Markets.prototype, "constructor", [options]);
    this.url = 'api/search';
    this.model = Market;
    this.comparator = 'distance';
  };
  var $Markets = Markets;
  ($traceurRuntime.createClass)(Markets, {}, {}, Backbone.Collection);
  ;
  return {
    get Market() {
      return Market;
    },
    get Markets() {
      return Markets;
    }
  };
});
System.register("../../app/assets/javascripts/views", [], function() {
  "use strict";
  var __moduleName = "../../app/assets/javascripts/views";
  var $__2 = $traceurRuntime.assertObject(System.get("../../app/assets/javascripts/entities")),
      Market = $__2.Market,
      Markets = $__2.Markets;
  var SearchView = function SearchView(options) {
    this.template = JST['search'];
    this.className = 'search';
    this.markets = new Markets();
    this.events = {'keyup input': 'search'};
    $traceurRuntime.superCall(this, $SearchView.prototype, "constructor", [options]);
  };
  var $SearchView = SearchView;
  ($traceurRuntime.createClass)(SearchView, {
    render: function() {
      this.$el.html(this.template());
      this.ui = {
        input: this.$('.js-input'),
        results: this.$('.js-results')
      };
      this.resultsView = new SearchResultsView({collection: this.markets});
      this.ui.results.html(this.resultsView.render().$el);
      return this;
    },
    search: function() {
      var self = this;
      var promise;
      var zip = self.ui.input.val();
      if (zip.length !== 5) {
        self.resultsView.$el.css({opacity: 0.5});
        return;
      }
      promise = self.markets.fetch({
        data: {zip: zip},
        reset: true
      });
      promise.then(function() {
        self.resultsView.$el.css({opacity: 1}).show();
      });
    }
  }, {}, Backbone.View);
  var SearchResultView = function SearchResultView(options) {
    $traceurRuntime.superCall(this, $SearchResultView.prototype, "constructor", [options]);
    this.tagName = 'li';
    this.className = 'search-result';
    this.template = JST['search-result'];
  };
  var $SearchResultView = SearchResultView;
  ($traceurRuntime.createClass)(SearchResultView, {render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }}, {}, Backbone.View);
  var SearchResultsView = function SearchResultsView(options) {
    $traceurRuntime.superCall(this, $SearchResultsView.prototype, "constructor", [options]);
    this.tagName = 'ul';
    this.className = 'search-results';
    this.itemView = SearchResultView;
    this.listenTo(this.collection, 'reset', this.render);
  };
  var $SearchResultsView = SearchResultsView;
  ($traceurRuntime.createClass)(SearchResultsView, {
    addItem: function(model) {
      var itemView = new this.itemView({model: model});
      this.$el.append(itemView.render().$el);
    },
    render: function() {
      this.$el.empty();
      this.collection.forEach(this.addItem, this);
      return this;
    }
  }, {}, Backbone.View);
  ;
  return {
    get SearchView() {
      return SearchView;
    },
    get SearchResultView() {
      return SearchResultView;
    },
    get SearchResultsView() {
      return SearchResultsView;
    }
  };
});
System.register("../../app/assets/javascripts/router", [], function() {
  "use strict";
  var __moduleName = "../../app/assets/javascripts/router";
  var SearchView = $traceurRuntime.assertObject(System.get("../../app/assets/javascripts/views")).SearchView;
  var Router = function Router(options) {
    this.routes = {'': 'index'};
    $traceurRuntime.superCall(this, $Router.prototype, "constructor", [options]);
  };
  var $Router = Router;
  ($traceurRuntime.createClass)(Router, {index: function() {
      console.debug('@ index');
      var view = new SearchView();
      $('#main').html(view.render().$el);
    }}, {}, Backbone.Router);
  var $__default = Router;
  return {get default() {
      return $__default;
    }};
});
System.register("../../app/assets/javascripts/application", [], function() {
  "use strict";
  var __moduleName = "../../app/assets/javascripts/application";
  var Router = $traceurRuntime.assertObject(System.get("../../app/assets/javascripts/router")).default;
  var Application = function Application() {
    console.debug('✓ Application starting');
    this.$el = $('#main');
    this.router = new Router();
    Backbone.history.start();
  };
  ($traceurRuntime.createClass)(Application, {}, {});
  $(function() {
    console.debug('✓ The DOM is ready');
    new Application();
  });
  return {};
});
System.get("../../app/assets/javascripts/application" + '');
