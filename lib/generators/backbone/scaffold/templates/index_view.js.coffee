class <%= view_namespace %> extends Backbone.View

  # This function retrieves a template from a namespaced collection, the default format favor the use of templating engines like JST or Handlebars but you can replace this with any other implementation.
  template: (context) -> HandlebarsTemplates['<%= file_name.pluralize %>/index'](context)
  lineItem: (context) -> HandlebarsTemplates['<%= file_name.pluralize %>/line_item'](context)

  initialize: () ->
    @elManagerFactory = new Backbone.CollectionBinder.ElManagerFactory(@lineItem(), @bindings())
    @collectionBinder = new Backbone.CollectionBinder(@elManagerFactory)
    super(arguments...)

  bindings: () ->
    id: [
      {selector: '', elAttribute: 'id'}
      {selector: 'a.show_detail', elAttribute: 'href', converter: @showPath}
      {selector: 'a.edit', elAttribute: 'href', converter: @editPath}
    ]
<% attributes.each do |a| -%>
    <%= a.name %>: '[data-name=<%= a.name %>]'
<% end -%>

  # Backbone allows a simple and declarative way of declaring events, this is where you should specify them
  events:
    {
      # Write DOM events here in the following format:
      # "<event> <cssSelector>" : "<methodName>"
      #
      # Examples:
      # "click #veryImportantButton" : "veryImportantAction"
      # "change .someComonInput" : "someCommonAction"
      #
      # The method gets an event argument, from which the currentTarget is accessible, this is an example of how you could define your event handler:
      # veryImportantAction: (event) ->
      #   domElementThatTriggeredTheEvent = event.currentTarget
      #   console.log(domElementThatTriggeredTheEvent)
      "click .destroy" : "destroy"
    }

  # The render method is responsible of calling and implementing any and all of the rendering logic. You should call the 'template' method here and return whatever markup it returns, but you can optionally handle any other rendering logic here.
  render: () ->
    # The following line invokes the template engine and sends a backbone model's atributes in JSON format as the data.
    # You can either uncomment it or use the data-less call to 'template' below, just make sure you return the proper one.
    @collection.fetch(
      success: () =>
        $(@el).html(@template({}))
        @collectionBinder.bind(@collection, @$('tbody'))
    )
    @

  # Default handler for the destroy event
  destroy: (e) ->
    e.preventDefault()
    id = $(e.currentTarget).closest('tr').prop('id')
    @collection.get(id).destroy()
    @collection.remove(@collection.get(id))

  # Route helper
  showPath: (direction, value, attribute, model) ->
    "##{model.urlRoot}/#{value}"

  # Route helper
  editPath: (direction, value, attribute, model) ->
    "##{model.urlRoot}/#{value}/edit"
