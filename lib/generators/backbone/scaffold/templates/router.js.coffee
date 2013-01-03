class <%= router_namespace %> extends Backbone.Router

  routes:
    "<%= file_name.pluralize %>/index" : "index"
    "<%= file_name.pluralize %>" : "index"

  initialize: () ->
    @collection = new <%= collection_namespace %>()
    @loadData()

  loadData: () ->
    @collection.fetch()

  index: () ->
    $("#app_container #main").html(new <%= custom_view_namespace('Index') %>(backbone_data: @collection).render())
