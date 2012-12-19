class <%= router_namespace %> extends Backbone.Router

  initialize: () ->
    @collection = new <%= collection_namespace %>()
