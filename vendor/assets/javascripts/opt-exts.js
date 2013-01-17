// Generated by CoffeeScript 1.3.3
(function() {
  var baseModel,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.OpalExtensions = {
    Version: '0.0.1'
  };

  OpalExtensions.Mixin = (function() {

    function Mixin() {}

    Mixin.mixinCallbacks = ['beforeInclude', 'beforeExtend', 'included', 'extended'];

    Mixin.extend = function(obj) {
      var proto, _ref, _ref1,
        _this = this;
      proto = typeof obj === 'object' ? obj : obj.prototype;
      if ((_ref = proto.beforeExtend) != null) {
        _ref.apply(this, proto);
      }
      _.each(Object.keys(proto), function(key) {
        if (__indexOf.call(_this.mixinCallbacks, key) < 0) {
          return _this[key] = proto[key];
        }
      });
      if ((_ref1 = proto.extended) != null) {
        _ref1.apply(this, proto);
      }
      return this;
    };

    Mixin.include = function(obj) {
      var proto, _ref, _ref1,
        _this = this;
      proto = typeof obj === 'object' ? obj : obj.prototype;
      if ((_ref = proto.beforeInclude) != null) {
        _ref.apply(this, proto);
      }
      _.each(Object.keys(proto), function(key) {
        if (__indexOf.call(_this.mixinCallbacks, key) < 0) {
          return _this.prototype[key] = proto[key];
        }
      });
      if ((_ref1 = proto.included) != null) {
        _ref1.apply(this, proto);
      }
      return this;
    };

    return Mixin;

  })();

  OpalExtensions.ViewManager = (function() {

    function ViewManager() {}

    ViewManager.prototype.getDesktop = function() {
      return this.desktop || (this.desktop = new OpalExtensions.Desktop());
    };

    ViewManager.prototype.clearWorkSpace = function(workSpace) {
      return this.getDesktop().clear(workSpace);
    };

    ViewManager.prototype.appMain = function(view, viewData) {
      this.clearWorkSpace();
      return this.renderOn(this.getDesktop().layout().main, view, viewData);
    };

    ViewManager.prototype.appDetail = function(view, viewData) {
      return this.renderOn(this.getDesktop().layout().detail, view, viewData);
    };

    ViewManager.prototype.appForm = function(view, viewData) {
      return this.renderOn(this.getDesktop().layout().forms.primary, view, viewData);
    };

    ViewManager.prototype.renderOn = function(container, view, viewData) {
      return $(container).html(new view(viewData).render().el);
    };

    ViewManager.prototype.goToIndex = function() {
      return Backbone.history.location.assign(this.indexPath());
    };

    ViewManager.prototype.goToShow = function() {
      return Backbone.history.location.assign(this.showPath());
    };

    ViewManager.prototype.getRootPath = function(model) {
      var _ref, _ref1;
      return (model != null ? model.urlRoot : void 0) || ((_ref = this.model) != null ? _ref.urlRoot : void 0) || ((_ref1 = this.collection) != null ? _ref1.url : void 0);
    };

    ViewManager.prototype.getResourceId = function(model) {
      var _ref;
      return (model != null ? model.id : void 0) || ((_ref = this.model) != null ? _ref.id : void 0);
    };

    ViewManager.prototype.indexPath = function(model) {
      var urlRoot;
      urlRoot = this.getRootPath(model);
      return "#" + urlRoot;
    };

    ViewManager.prototype.showPath = function(direction, value, attribute, model) {
      var id, urlRoot;
      urlRoot = this.getRootPath(model);
      id = this.getResourceId(model);
      return "#" + urlRoot + "/" + id;
    };

    ViewManager.prototype.editPath = function(direction, value, attribute, model) {
      return "" + (this.showPath.apply(this, arguments)) + "/edit";
    };

    return ViewManager;

  })();

  OpalExtensions.Desktop = (function() {

    function Desktop() {}

    _.extend(Desktop, OpalExtensions.Mixin);

    Desktop.prototype.layouts = {
      "default": {
        main: $("#app_container #main"),
        detail: $("#app_container #detail"),
        menu: $("#app_container #main_menu"),
        forms: {
          primary: $("#app_container #primary_form")
        }
      },
      login: {
        main: $("#login_container #main")
      }
    };

    Desktop.prototype.activeLayoutName = 'default';

    Desktop.prototype.layout = function() {
      return this.layouts[this.activeLayoutName];
    };

    Desktop.prototype.getLayout = function() {
      return this.layouts[this.activeLayoutName];
    };

    Desktop.prototype.clear = function(target) {
      var workSpace;
      workSpace = target != null ? this.getLayout()[target] : this.getLayout();
      if (workSpace.html != null) {
        workSpace.html('');
      } else {
        _.each(_.values(workSpace), function(container) {
          if (container.html != null) {
            return container.html('');
          }
        });
      }
      return this.afterClear(workSpace, target);
    };

    Desktop.prototype.afterClear = function(workSpace, target) {
      var _this = this;
      return _.each(this._afterClear, function(callback, key) {
        return callback != null ? callback.call(_this, workSpace, target) : void 0;
      });
    };

    return Desktop;

  })();

  OpalExtensions.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    _.extend(Router, OpalExtensions.Mixin);

    Router.include(OpalExtensions.ViewManager);

    Router.prototype.initialize = function() {
      return Router.__super__.initialize.apply(this, arguments);
    };

    Router.prototype.loadData = function() {
      return this.collection.fetch();
    };

    Router.prototype.getResource = function(id) {
      this.model = this.collection.get(id) || new this.collection.model({
        id: id
      });
      this.model.fetch();
      return this.model;
    };

    return Router;

  })(Backbone.Router);

  OpalExtensions.Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.initialize = function() {
      return Collection.__super__.initialize.apply(this, arguments);
    };

    return Collection;

  })(Backbone.Collection);

  baseModel = Backbone.RelationalModel || Backbone.Model;

  OpalExtensions.Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.initialize = function() {
      return Model.__super__.initialize.apply(this, arguments);
    };

    return Model;

  })(baseModel);

  if (Backbone.RelationalModel != null) {
    OpalExtensions.Model.setup();
  }

  OpalExtensions.View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    _.extend(View, OpalExtensions.Mixin);

    View.include(OpalExtensions.ViewManager);

    View.prototype.initialize = function() {
      View.__super__.initialize.apply(this, arguments);
      _.bindAll(this);
      this._afterCreate = this._afterUpdate = this._afterDestroy = [];
      return this.initializeDefaultCallbacks();
    };

    View.prototype.initializeDefaultCallbacks = function() {
      this.afterCreate(this.goToShow);
      this.afterUpdate(this.goToShow);
      return this.afterDestroy(this.goToIndex);
    };

    View.prototype.bindings = function() {
      throw new Error('You must define the bindings method in your view!');
    };

    View.prototype.events = {
      "click .close-self": "close"
    };

    View.prototype.create = function(options) {
      this.collection.create(this.model);
      this.remove();
      return this.callbacksFor(this._afterCreate, [this.model]);
    };

    View.prototype.update = function(options) {
      this.model.save();
      this.remove();
      return this.callbacksFor(this._afterUpdate, [this.model]);
    };

    View.prototype.destroy = function(id, options) {
      if ((id != null) && (this.collection != null)) {
        this.collection.get(id).destroy();
        this.collection.remove(this.collection.get(id));
      } else if (this.model != null) {
        this.model.destroy();
        this.remove();
      } else {
        throw new Error('Missing reference for destroying an object, forgot to supply an ID?');
      }
      return this.callbacksFor(this._afterDestroy, [this.model]);
    };

    View.prototype.callbacksFor = function(callbacksCollection, args) {
      _.each(callbacksCollection, function(func) {
        return func.apply(this, args);
      });
      return this;
    };

    View.prototype.afterCreate = function(func) {
      return this._afterCreate.push(func);
    };

    View.prototype.afterUpdate = function(func) {
      return this._afterUpdate.push(func);
    };

    View.prototype.afterDestroy = function(func) {
      return this._afterDestroy.push(func);
    };

    View.prototype.renderData = function(template, context) {
      this.$el.html(template(context));
      return this;
    };

    View.prototype.renderResource = function(template, model) {
      this.$el.html(template());
      this.modelBinder.bind(model, this.el, this.bindings());
      return this;
    };

    View.prototype.renderCollection = function(template, collection, containerSelector) {
      var _this = this;
      collection.fetch({
        success: function() {
          _this.$el.html(template());
          return _this.collectionBinder.bind(collection, _this.$(containerSelector));
        }
      });
      return this;
    };

    View.prototype.close = function(e) {
      e.preventDefault();
      this.remove();
      return this.goToIndex();
    };

    View.prototype.remove = function() {
      if (this.modelBinder != null) {
        this.modelBinder.unbind();
      }
      if (this.collectionBinder != null) {
        this.collectionBinder.unbind();
      }
      return this.$el.remove();
    };

    return View;

  })(Backbone.View);

}).call(this);
