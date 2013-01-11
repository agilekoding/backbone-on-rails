class <%= view_namespace %> extends Backbone.View

  # This function retrieves a template from a namespaced collection, the default format favor the use of templating engines like JST or Handlebars but you can replace this with any other implementation.
  template: (context) -> <%= templates_namespace %>['<%= template_namespace %>'](context)

  # Place all the view's initialization logic here.
  initialize: () ->
    @modelBinder = new Backbone.ModelBinder()
    super(arguments...)

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
      "submit #<%= file_name.pluralize %>_form" : "save"
    }

  # The render method is responsible of inserting a rendered template inside the @el property. This is a good place to bind your model with your view. Note that it does not render anything to the screen, that is to be handled on the router.
  render: () ->
    $(@el).html(@template(data: {}))
    @modelBinder.bind(@model, @el)
    @

  # This method handles the submit event on the form.
  save: (e) ->
    e.preventDefault()
    @model.save()
    @remove()

  # You should call this method when you want the view's @el removed from the DOM, as this will automatically unbind the view from the model, killing references to each other.
  remove: () ->
    $(@el).remove()
    @modelBinder.unbind()
    @
