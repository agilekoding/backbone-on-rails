window.<%= app_name %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  Desktop: {
    app: $("#app_container")
    main: $("#app_container #main")
    forms:
      primary: $("#app_container #primary_form")
  }

  options:
    pushState: false

  initialize: ->
    @initializeRouters()
    Backbone.history.start()

  initializeRouters: (options) ->
    opts = options || @options
    window.routers = []
    _.each(_.keys(<%= app_name %>.Routers), (routerName) => window.routers.push(new <%= app_name %>.Routers[routerName](opts)))

$(document).ready ->
  <%= app_name %>.initialize()
