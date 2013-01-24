// Generated by CoffeeScript 1.3.3
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.OpalExtensions = {
    Version: '0.0.1'
  };

  if (String.prototype.trim == null) {
    String.prototype.trim = function() {
      return this.replace(/^\s+|\s+$/g, "");
    };
  }

  if (String.prototype.ltrim == null) {
    String.prototype.ltrim = function() {
      return this.replace(/^\s+/g, "");
    };
  }

  if (String.prototype.rtrim == null) {
    String.prototype.rtrim = function() {
      return this.replace(/\s+$/g, "");
    };
  }

  if (String.prototype.unslash == null) {
    String.prototype.unslash = function() {
      return this.replace(/^\/+|\/+$/g, "");
    };
  }

  if (String.prototype.capitalize == null) {
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
  }

  if (String.prototype.camelize == null) {
    String.prototype.camelize = function() {
      return _.map(this.split(/\s|_|-/), function(str) {
        return str.capitalize();
      }).join('');
    };
  }

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
      return this.renderOn(this.getDesktop().layout().main(), view, viewData);
    };

    ViewManager.prototype.appDetail = function(view, viewData) {
      return this.renderOn(this.getDesktop().layout().detail(), view, viewData);
    };

    ViewManager.prototype.appForm = function(view, viewData) {
      return this.renderOn(this.getDesktop().layout().forms.primary(), view, viewData);
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
        main: function() {
          return $("#app_container #main");
        },
        detail: function() {
          return $("#app_container #detail");
        },
        menu: function() {
          return $("#app_container #main_menu");
        },
        forms: {
          primary: function() {
            return $("#app_container #primary_form");
          }
        }
      },
      login: {
        main: function() {
          return $("#login_container #main");
        }
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

    if (Backbone.Paginator.requestPager != null) {
      Collection.prototype.DefaultPagesInRange = 4;
      Collection.prototype.paginator_core = {
        dataType: 'json',
        url: function() {
          return this.url;
        }
      };
      Collection.prototype.paginator_ui = {
        firstPage: 1,
        currentPage: 1,
        perPage: 20,
        totalPages: 10,
        pageLinks: {
          defaultClass: 'btn',
          disabledClass: 'disabled',
          numberedPageOptions: {
            "class": 'page-marker',
            selectedClass: 'btn-primary',
            unselectedClass: ''
          },
          first: {
            label: '<<',
            "class": 'first-page',
            disabledClass: 'no-page',
            isEnabled: function() {
              return this.currentPage > this.firstPage;
            }
          },
          prev: {
            label: '<',
            "class": 'prev-page',
            disabledClass: 'no-page',
            isEnabled: function() {
              return this.currentPage > this.firstPage;
            }
          },
          next: {
            label: '>',
            "class": 'next-page',
            disabledClass: 'no-page',
            isEnabled: function() {
              return this.currentPage < this.lastPage;
            }
          },
          last: {
            label: '>>',
            "class": 'last-page',
            disabledClass: 'no-page',
            isEnabled: function() {
              return this.currentPage < this.lastPage;
            }
          }
        }
      };
      Collection.prototype.server_api = {
        page: function() {
          return this.currentPage;
        },
        per_page: function() {
          return this.perPage;
        }
      };
      Collection.prototype.isCurrentPage = function(n) {
        return this.currentPage === n;
      };
      Collection.prototype.getMinPage = function() {
        this._minPage = this.currentPage - (this.pagesInRange || this.DefaultPagesInRange);
        if (this._minPage < this.firstPage) {
          this._minPage = this.firstPage;
        }
        return this._minPage;
      };
      Collection.prototype.getMaxPage = function() {
        this._maxPage = this.currentPage + (this.pagesInRange || this.DefaultPagesInRange);
        if (this._maxPage > this.lastPage) {
          this._maxPage = this.lastPage;
        }
        return this._maxPage;
      };
      Collection.prototype.getDisplayPages = function() {
        var _i, _ref, _ref1, _results;
        return (function() {
          _results = [];
          for (var _i = _ref = this.getMinPage(), _ref1 = this.getMaxPage(); _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this);
      };
      Collection.prototype.getPageNumberLink = function(n) {
        return "<a href=\"#\" class=\"" + (this.getPageNumberLinkClass(n)) + "\" data-value=\"" + n + "\">" + n + "</a>";
      };
      Collection.prototype.getPageNumberLinkClass = function(n) {
        return "" + this.pageLinks.defaultClass + " " + this.pageLinks.numberedPageOptions["class"] + " " + (this.getExtraClassFor(n));
      };
      Collection.prototype.getExtraClassFor = function(n) {
        if (this.isCurrentPage(n)) {
          return this.pageLinks.numberedPageOptions.selectedClass;
        } else {
          return this.pageLinks.numberedPageOptions.unselectedClass;
        }
      };
      Collection.prototype.getPageControl = function(control) {
        return "<a href=\"#\" class=\"" + (this.getPageControlClass(control)) + "\">" + this.pageLinks[control].label + "</a>";
      };
      Collection.prototype.getPageControlClass = function(control) {
        if (this.pageLinks[control].isEnabled.apply(this)) {
          return this.getEnabledPageControlClass(control);
        } else {
          return this.getDisabledPageControlClass(control);
        }
      };
      Collection.prototype.getEnabledPageControlClass = function(control) {
        return "" + this.pageLinks.defaultClass + " " + this.pageLinks[control]["class"];
      };
      Collection.prototype.getDisabledPageControlClass = function(control) {
        return "" + this.pageLinks.defaultClass + " " + this.pageLinks.disabledClass + " " + this.pageLinks[control].disabledClass;
      };
      Collection.prototype.parse = function(response) {
        this.paginator_ui.count = response.count;
        this.lastPage = this.availablePages = Math.ceil(response.count / this.perPage);
        return response.results;
      };
      Collection.prototype.getPager = function() {
        if (this.lastPage <= 1) {
          return '';
        }
        return this.getPageControl('first') + this.getPageControl('prev') + _.map(this.getDisplayPages(), this.getPageNumberLink, this).join('') + this.getPageControl('next') + this.getPageControl('last');
      };
    }

    return Collection;

  })(Backbone.Paginator.requestPager || Backbone.Collection);

  OpalExtensions.Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.prototype.initialize = function() {
      Model.__super__.initialize.apply(this, arguments);
      return this.setupRelations();
    };

    Model.prototype.setupRelations = function() {
      var _this = this;
      if (Backbone.RelationalModel != null) {
        if (this.relations != null) {
          return _.each(this.relations, function(rel) {
            var collectionUrl;
            collectionUrl = _this.get(rel.key).url.unslash();
            return _this.get(rel.key).url = "" + (_this.urlRoot.unslash()) + "/" + (_this.get('id')) + "/" + collectionUrl;
          });
        }
      }
    };

    if (Backbone.RelationalModel != null) {
      Model.prototype.save = function() {
        var _this = this;
        _.each(this.relations, function(rel) {
          if (_this.get(rel.key).length === 0) {
            return rel.includeInJSON = false;
          }
        });
        return Model.__super__.save.apply(this, arguments);
      };
    }

    return Model;

  })(Backbone.RelationalModel || Backbone.Model);

  OpalExtensions.View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    _.extend(View, OpalExtensions.Mixin);

    View.include(OpalExtensions.ViewManager);

    View.prototype.paginatorClass = 'paginator';

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
      "click .close-self": "close",
      "click .first-page": "goToFirst",
      "click .prev-page": "requestPreviousPage",
      "click .next-page": "requestNextPage",
      "click .last-page": "goToLast",
      "click .page-marker": "goToPage",
      "click .no-page": "noPage"
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

    View.prototype.render = function() {
      this.$el.html('');
      return this;
    };

    View.prototype.renderData = function(template, context) {
      this.$el.append(template(context));
      return this;
    };

    View.prototype.renderResource = function(template, model) {
      this.$el.append(template());
      this.modelBinder.bind(model, this.el, this.bindings());
      return this;
    };

    View.prototype.renderCollection = function(template, collection, containerSelector) {
      this.$el.append(template());
      this.collectionBinder.bind(collection, this.$(containerSelector));
      return this;
    };

    View.prototype.renderPagination = function() {
      $("." + this.paginatorClass).html(this.collection.getPager());
      return this;
    };

    View.prototype.requestPreviousPage = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return this.collection.goTo(this.collection.paginator_ui.currentPage -= 1);
    };

    View.prototype.requestNextPage = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return this.collection.goTo(this.collection.paginator_ui.currentPage += 1);
    };

    View.prototype.goToPage = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return this.collection.goTo(this.collection.paginator_ui.currentPage = parseInt($(e.currentTarget).attr('data-value')));
    };

    View.prototype.goToFirst = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return this.collection.goTo(this.collection.paginator_ui.currentPage = this.collection.firstPage);
    };

    View.prototype.goToLast = function(e) {
      e.preventDefault();
      e.stopPropagation();
      return this.collection.goTo(this.collection.paginator_ui.currentPage = this.collection.lastPage);
    };

    View.prototype.noPage = function(e) {
      e.preventDefault();
      return e.stopPropagation();
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
