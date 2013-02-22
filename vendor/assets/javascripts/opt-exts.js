// Generated by CoffeeScript 1.3.3
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Sharkbone = {
    Version: '0.0.2',
    Config: {},
    App: {
      Models: {},
      Collections: {},
      Views: {},
      Routers: {},
      Initializers: {
        initializeRouters: function(opts) {
          if (opts == null) {
            opts = this.options;
          }
          return this.activeRouters = _(this.Routers).map(function(router) {
            return new router(opts);
          });
        },
        setupBackboneRelational: function() {
          if (Backbone.RelationalModel != null) {
            return _(this.Models).invoke('setup');
          }
        }
      },
      activeRouters: [],
      options: {
        pushState: false
      },
      initialize: function() {
        var _this = this;
        _(this.Initializers).each(function(init) {
          return init.call(_this, _this.options);
        });
        return Backbone.history.start();
      }
    }
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

  if (String.prototype.underscored == null) {
    String.prototype.underscored = function() {
      return this.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    };
  }

  if (String.prototype.army == null) {
    String.prototype.army = function(n) {
      var r;
      r = [];
      while (r.length < n) {
        r.push(this);
      }
      return r.join("");
    };
  }

  if (String.prototype.leftFill == null) {
    String.prototype.leftFill = function(string, resultLength) {
      return (string.army(resultLength) + this).slice(resultLength * (-1));
    };
  }

  Sharkbone.Mixin = (function() {

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

  Sharkbone.ViewManager = (function() {

    function ViewManager() {}

    ViewManager.prototype.getDesktop = function() {
      return this.desktop || (this.desktop = new Sharkbone.Desktop());
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

  Sharkbone.Desktop = (function() {

    function Desktop() {}

    _.extend(Desktop, Sharkbone.Mixin);

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
      if (typeof workSpace === 'function') {
        workSpace = workSpace();
      }
      if (workSpace.html != null) {
        workSpace.html('');
      } else {
        _.each(_.values(workSpace), function(container) {
          if (typeof container === 'function') {
            container = container();
          }
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

  Sharkbone.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    _.extend(Router, Sharkbone.Mixin);

    Router.include(Sharkbone.ViewManager);

    Router.defaultCollectionName = function() {
      return this.name.replace(/router|controller/gi, '');
    };

    Router.collectionClass = function() {
      return (typeof this.defaultCollectionName === "function" ? this.defaultCollectionName() : void 0) || this.defaultCollectionName;
    };

    Router.collectionName = function() {
      return ((typeof this.collectionClass === "function" ? this.collectionClass() : void 0) || this.collectionClass).underscored();
    };

    Router.resources = function(collectionName) {
      var _base;
      collectionName || (collectionName = (typeof this.collectionName === "function" ? this.collectionName() : void 0) || this.collectionName);
      (_base = this.prototype).routes || (_base.routes = {});
      this.prototype.routes["" + collectionName + "/index"] = 'index';
      this.prototype.routes["" + collectionName] = 'index';
      this.prototype.routes["" + collectionName + "/new"] = 'newModel';
      this.prototype.routes["" + collectionName + "/:id/edit"] = 'edit';
      return this.prototype.routes["" + collectionName + "/:id"] = 'show';
    };

    Router.prototype.initialize = function() {
      var _base, _name;
      Router.__super__.initialize.apply(this, arguments);
      return this.collection = typeof (_base = Sharkbone.App.Collections)[_name = this.constructor.collectionClass()] === "function" ? new _base[_name]() : void 0;
    };

    Router.prototype.loadDefaultData = function() {
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

  Sharkbone.Collection = (function(_super) {

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
          wrapperTag: 'ul',
          defaultClass: '',
          disabledClass: 'disabled',
          numberedPageOptions: {
            "class": 'page-marker',
            selectedClass: 'disabled',
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
        return "<li class=\"" + (this.getPageNumberLinkClass(n)) + "\" data-value=\"" + n + "\"><a href=\"#\">" + n + "</a></li>";
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
        return "<li class=\"" + (this.getPageControlClass(control)) + "\"><a href=\"#\">" + this.pageLinks[control].label + "</a></li>";
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
        return ("<" + this.pageLinks.wrapperTag + ">") + this.getPageControl('first') + this.getPageControl('prev') + _.map(this.getDisplayPages(), this.getPageNumberLink, this).join('') + this.getPageControl('next') + this.getPageControl('last') + ("</" + this.pageLinks.wrapperTag + ">");
      };
    }

    return Collection;

  })(Backbone.Paginator.requestPager || Backbone.Collection);

  Sharkbone.Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    Model.appNamespace = function() {
      return 'Sharkbone.App.';
    };

    Model.prototype.initialize = function() {
      var _this = this;
      Model.__super__.initialize.apply(this, arguments);
      if (Backbone.RelationalModel != null) {
        this.on('change:id', function() {
          return _this.setupRelations.apply(_this);
        });
      }
      if (typeof this.setupRelations === "function") {
        this.setupRelations();
      }
      return typeof this.fetchCollections === "function" ? this.fetchCollections() : void 0;
    };

    if (Backbone.RelationalModel != null) {
      Model.prototype.setupRelations = function() {
        var _this = this;
        if (this.relations != null) {
          return _.each(this.relations, function(rel) {
            return _this.get(rel.key).url = "" + (_this.urlRoot.unslash()) + "/" + (_this.get('id')) + "/" + rel.key;
          });
        }
      };
      Model.hasMany = function(key, options) {
        if (options == null) {
          options = {};
        }
        if (!key) {
          throw new Error('HasMany relations require a key');
        }
        this.prototype.relations = this.prototype.relations || [];
        _.extend(options, {
          type: Backbone.HasMany,
          key: key
        });
        _.defaults(options, {
          relatedModel: "" + (this.appNamespace()) + "Models." + (_.singularize(key).capitalize()),
          collectionType: "" + (this.appNamespace()) + "Collections." + (_.pluralize(key).capitalize())
        });
        return this.prototype.relations.push(options);
      };
      Model.hasOne = function(key, options) {
        if (options == null) {
          options = {};
        }
        if (!key) {
          throw new Error('HasOne relations require a key');
        }
        this.prototype.relations = this.prototype.relations || [];
        _.extend(options, {
          type: Backbone.HasOne,
          key: key
        });
        _.defaults(options, {
          relatedModel: "" + (this.appNamespace()) + "Models." + (_.singularize(key).capitalize())
        });
        return this.prototype.relations.push(options);
      };
      Model.prototype.fetchCollections = function() {
        var _this = this;
        if (this.isNew()) {
          return false;
        }
        return _(this.relations).chain().filter(function(rel) {
          return rel.type === Backbone.HasMany;
        }).pluck('key').each(function(key) {
          return _this.get(key).fetch();
        }).value();
      };
      Model.prototype.createDotSyntaxCollectionGetters = function() {
        var _this = this;
        return _(this.relations).chain().pluck('key').each(function(key) {
          return _this[key] = function() {
            return this.get(key);
          };
        });
      };
      Model.prototype.toJSON = function() {
        var attrs,
          _this = this;
        if ((Sharkbone.Config.ActiveRecord != null) && Sharkbone.Config.ActiveRecord) {
          attrs = _(this.attributes).clone();
          _(this.relations).each(function(relation) {
            attrs["" + relation.key + "_attributes"] = _(attrs[relation.key]).clone();
            return delete attrs[relation.key];
          });
          return attrs;
        } else {
          return Model.__super__.toJSON.apply(this, arguments);
        }
      };
    }

    return Model;

  })(Backbone.RelationalModel || Backbone.Model);

  Sharkbone.View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    _.extend(View, Sharkbone.Mixin);

    View.include(Sharkbone.ViewManager);

    View.prototype.paginatorSelector = '.pagination';

    View.prototype.initialize = function() {
      View.__super__.initialize.apply(this, arguments);
      _.bindAll(this);
      this._afterCreate = this._afterUpdate = this._afterDestroy = [];
      this.initializeDefaultCallbacks();
      this.initializePaginatedCollection();
      this.initializeModelBinding();
      return this;
    };

    View.prototype.initializeDefaultCallbacks = function() {
      this.afterCreate(this.remove);
      this.afterCreate(this.goToShow);
      this.afterUpdate(this.remove);
      this.afterUpdate(this.goToShow);
      this.afterDestroy(this.goToIndex);
      return this;
    };

    View.prototype.initializePaginatedCollection = function() {
      if ((this.collection != null) && _.isFunction(this.collection.getPager)) {
        this.listenTo(this.collection, 'reset', this.renderPagination);
      }
      return this;
    };

    View.prototype.initializeModelBinding = function() {
      if (Backbone.ModelBinder != null) {
        this.modelBinder = new Backbone.ModelBinder();
      }
      return this;
    };

    View.prototype.buildCollectionBinder = function(childTemplate, bindings) {
      return new Backbone.CollectionBinder(new Backbone.CollectionBinder.ElManagerFactory(childTemplate(), bindings()));
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
      "click .no-page": "noPage",
      "click a.show_detail": function(e) {
        return e.stopPropagation();
      },
      "click a.edit": function(e) {
        return e.stopPropagation();
      }
    };

    View.prototype.create = function(options) {
      if (typeof options.preventDefault === "function") {
        options.preventDefault();
      }
      this.collection.create(this.model);
      return this.callbacksFor(this._afterCreate, [this.model]);
    };

    View.prototype.update = function(options) {
      if (typeof options.preventDefault === "function") {
        options.preventDefault();
      }
      this.model.save();
      return this.callbacksFor(this._afterUpdate, [this.model]);
    };

    View.prototype.destroy = function(id, options) {
      if (typeof id.preventDefault === "function") {
        id.preventDefault();
      }
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
      $(this.paginatorSelector).html(this.collection.getPager());
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
