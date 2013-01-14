class <%= view_namespace %> extends Backbone.View

  # This function retrieves a template from a namespaced collection, the default format favor the use of templating engines like JST or Handlebars but you can replace this with any other implementation.
  template: (context) -> HandlebarsTemplates['<%= file_name.pluralize %>/show'](context)

  initialize: () ->
    @modelBinder = new Backbone.ModelBinder()
    super(arguments...)

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
      "click .close-self" : "close"
    }

  # The render method is responsible of calling and implementing any and all of the rendering logic. The default behavior is to render the show template and bind the fields to the @model instance.
  render: () ->
    $(@el).html(@template({}))
    @modelBinder.bind(@model, @el, @bindings())
    @

  # Default handler for the destroy event, it destroys the model and removes the view from the DOM.
  destroy: (e) ->
    e.preventDefault()
    @model.destroy()
    @remove()

  close: (e) ->
    e.preventDefault()
    @remove()

  remove: () ->
    @modelBinder.unbind()
    $(@el).remove()

  # Route helper
  editPath: (direction, value, attribute, model) ->
    "##{model.urlRoot}/#{value}/edit"

  # Route helper
  indexPath: (direction, value, attribute, model) ->
    "##{model.urlRoot}"
