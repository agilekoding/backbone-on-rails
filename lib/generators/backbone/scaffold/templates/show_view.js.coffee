class <%= view_namespace %> extends OpalExtensions.View

  # This function retrieves a template from a namespaced collection, the default format favor the use of templating engines like JST or Handlebars but you can replace this with any other implementation.
  template: (context) -> HandlebarsTemplates['<%= file_name.pluralize %>/show'](context)

  initialize: () ->
    super(arguments...)
    @modelBinder = new Backbone.ModelBinder()

  bindings: () ->
    id: [
      {selector: '', elAttribute: 'id'}
      {selector: 'a.edit', elAttribute: 'href', converter: @editPath}
    ]
<% attributes.each do |a| -%>
    <%= a.name %>: '[data-name=<%= a.name %>]'
<% end -%>

  # Backbone allows a simple and declarative way of declaring events, this is where you should specify them
  events:
    _.extend(_.clone(@__super__.events), {
      # Write DOM events here in the following format:
      # "<event> <cssSelector>" : "<methodName>"
      #
      # The method gets an event argument, from which the currentTarget is accessible.
      "click .destroy" : "destroy"
    })

  # The render method is responsible of calling and implementing any and all of the rendering logic. The default behavior is to render the show template and bind the fields to the @model instance.
  render: () ->
    @renderResource(@template, @model)

  # Default handler for the destroy event, it destroys the model and removes the view from the DOM.
  destroy: (e) ->
    e.preventDefault()
    super()
