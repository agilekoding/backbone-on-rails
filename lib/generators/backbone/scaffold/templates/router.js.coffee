class <%= router_namespace %> extends Backbone.Router

  routes:
    "<%= file_name.pluralize %>/index" : "index"
    "<%= file_name.pluralize %>" : "index"
    "<%= file_name.pluralize %>/new" : "newModel"
    "<%= file_name.pluralize %>/:id/edit" : "edit"
    "<%= file_name.pluralize %>/:id" : "show"

  initialize: () ->
    @collection = new <%= collection_namespace %>()

  loadData: () ->
    @collection.fetch()

  index: () ->
    @appMain('<%= file_name.pluralize.camelize %>Index', {collection: @collection})

  newModel: () ->
    @appForm('<%= file_name.pluralize.camelize %>New', {collection: @collection, model: new @collection.model()})

  edit: (id) ->
    @appForm('<%= file_name.pluralize.camelize %>Edit', {collection: @collection, model: @getResource(id)})

  show: (id) ->
    @appMain('<%= file_name.pluralize.camelize %>Show', {model: @getResource(id)})

  #TODO Move the following code to another class, and make all the routers extend that class

  getResource: (id) ->
    @model = @collection.get(id) || new @collection.model(id: id)
    responseText = @model.fetch().responseText
    @resourceNotFound = true if responseText is null
    @model

  appMain: (rawViewName, viewData) ->
    @renderOn(<%= app_name %>.Desktop.main, rawViewName, viewData)

  appForm: (rawViewName, viewData) ->
    @renderOn(<%= app_name %>.Desktop.forms.primary, rawViewName, viewData)

  renderOn: (container, rawViewName, viewData) ->
    $(container).html(new <%= app_name %>.Views["#{rawViewName}View"](viewData).render().el)
