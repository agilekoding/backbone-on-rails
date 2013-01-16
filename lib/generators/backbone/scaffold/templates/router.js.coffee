class <%= router_namespace %> extends OpalExtensions.Router

  routes:
    "<%= file_name.pluralize %>/index" : "index"
    "<%= file_name.pluralize %>" : "index"
    "<%= file_name.pluralize %>/new" : "newModel"
    "<%= file_name.pluralize %>/:id/edit" : "edit"
    "<%= file_name.pluralize %>/:id" : "show"

  initialize: () ->
    super(arguments...)
    @collection = new <%= collection_namespace %>()

  loadData: () ->
    @collection.fetch()

  index: () ->
    @appMain(<%= app_name %>.Views.<%= file_name.pluralize.camelize %>IndexView, {collection: @collection})

  newModel: () ->
    @appMain(<%= app_name %>.Views.<%= file_name.pluralize.camelize %>NewView, {collection: @collection, model: new @collection.model()})

  edit: (id) ->
    @appMain(<%= app_name %>.Views.<%= file_name.pluralize.camelize %>EditView, {collection: @collection, model: @getResource(id)})

  show: (id) ->
    @appMain(<%= app_name %>.Views.<%= file_name.pluralize.camelize %>ShowView, {model: @getResource(id)})
