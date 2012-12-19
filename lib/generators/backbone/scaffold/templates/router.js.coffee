class <%= router_namespace %> extends Backbone.Router

  routes:
    "<%= file_name.pluralize %>/index" : "index"

  initialize: () ->
    @collection = new <%= collection_namespace %>()

  loadData: () ->
    @collection.fetch()
