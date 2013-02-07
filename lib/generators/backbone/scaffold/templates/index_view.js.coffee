class <%= view_namespace %> extends Sharkbone.View

  # This function retrieves a template from a namespaced collection, the default format favor
  # the use of templating engines like JST or Handlebars but you can replace this with any other
  # implementation.
  template: (context) -> HandlebarsTemplates['<%= file_name.pluralize %>/index'](context)
  lineItem: (context) -> HandlebarsTemplates['<%= file_name.pluralize %>/line_item'](context)
  detailed: (context) -> HandlebarsTemplates['<%= file_name.pluralize %>/show'](context)

  initialize: () ->
    super(arguments...)
    @collectionBinder = @buildCollectionBinder(@lineItem, @bindings)

  bindings: () ->
    id: [
      {selector: '', elAttribute: 'id'}
      {selector: 'a.show_detail', elAttribute: 'href', converter: @showPath}
      {selector: 'a.edit', elAttribute: 'href', converter: @editPath}
    ]
<% attributes.each do |a| -%>
    <%= a.name %>: '[data-name=<%= a.name %>]'
<% end -%>

  # Backbone allows a simple and declarative way of declaring events, this is where you should
  # specify them.
  events:
    _.extend(_.clone(@__super__.events), {
      # Write DOM events here in the following format:
      # "<event> <cssSelector>" : "<methodName>"
      #
      # The method gets an event argument, from which the currentTarget is accessible.
      "click .destroy" : "destroy"
      "click .detail" : "detail"
    })

  # The render method is responsible of calling and implementing any and all of the rendering
  # logic. By default, the render method will fetch data from the server, and bind the collection
  # to the 'tbody' element of the index template. This means that any member of the Backbone
  # Collection inside the @collection attribute will be rendered inside the 'tbody' tag inside of
  # the index template.
  render: () ->
    super(arguments...)
    @collection.fetch()
    @renderCollection(@template, @collection, 'tbody').renderPagination()

  # Default handler for the "detail" event. This event is intended to show a mini preview of an
  # item, showing more data than the general list but not the full information related to it. By
  # default it renders the ShowView but that behavior can be easily changed.
  detail: (e) ->
    e.stopPropagation()
    @detailed = @collectionBinder.getManagerForEl(e.target).getModel()
    @appDetail(<%= app_namespace %>.Views.<%= file_name.pluralize.capitalize %>Show, model: @detailed)

  # Default handler for the destroy event
  destroy: (e) ->
    e.preventDefault()
    e.stopPropagation()
    target = @collectionBinder.getManagerForEl(e.target).getModel()
    super(target.get('id'))
