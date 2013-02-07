class <%= router_namespace %> extends Sharkbone.Router

  @resources()

  initialize: () ->
    super(arguments...)

  index: () ->
    @renderOn(@getDesktop().layout().main(), <%= custom_view_namespace 'index' %>, {collection: @collection})

  newModel: () ->
    @renderOn(@getDesktop().layout().main(), <%= custom_view_namespace 'new' %>, {collection: @collection, model: new @collection.model()})

  edit: (id) ->
    @renderOn(@getDesktop().layout().main(), <%= custom_view_namespace 'edit' %>, {collection: @collection, model: @getResource(id)})

  show: (id) ->
    @renderOn(@getDesktop().layout().main(), <%= custom_view_namespace 'show' %>, {model: @getResource(id)})
