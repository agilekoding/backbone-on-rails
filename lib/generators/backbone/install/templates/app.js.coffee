window.<%= app_name %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  initialize: ->
    window.routers = []
    _.each(_.keys(@Routers), (routerName) => window.routers.push(new @Routers[routerName]()))
    Backbone.history.start()

$(document).ready ->
  <%= app_name %>.initialize()
