window.<%= app_name %> =
  Models: {}
  Collections: {}
  Views: {}
  Routers: {}
  Desktop: {
    app:
      main: $("#app_container #main")
      detail: $("#app_container #detail")
      forms:
        primary: $("#app_container #primary_form")

    clear: (target) ->
      workSpace = if target? then <%= app_name %>.Desktop.app[target] else <%= app_name %>.Desktop.app
      _.each(_.values(workSpace), (container) ->
        container.html('') if container.html?
      )
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
