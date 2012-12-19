window.<%= app_name %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  initialize: ->
    window.routers = []
    _.each(_.keys(<%= app_name %>.Routers), (routerName) -> window.routers.push(new <%= app_name %>.Routers[routerName]()))
    Backbone.history.start()

$(document).ready ->
  <%= app_name %>.initialize()
