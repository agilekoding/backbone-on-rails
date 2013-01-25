window.OpalExtensions =
  AppNamespace: '<%= app_name %>'

window.<%= app_name %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}

  options:
    pushState: false

  initialize: ->
    @initializeRouters()
    @setupBackboneRelational()
    Backbone.history.start()

  initializeRouters: (options) ->
    opts = options || @options
    window.routers = []
    _.each(_.keys(<%= app_name %>.Routers), (routerName) => window.routers.push(new <%= app_name %>.Routers[routerName](opts)))

  setupBackboneRelational: () ->
    _.each(_.keys(<%= app_name %>.Models), (model) -> model.setup?()) if Backbone.RelationalModel?

$(document).ready ->
  <%= app_name %>.initialize()
