class <%= view_namespace %> extends Backbone.View

  # This function retrieves a template from a namespaced collection, the default format favor the use of templating engines like JST or Handlebars but you can replace this with any other implementation.
  template: (context) -> <%= templates_namespace %>['<%= template_namespace %>'](context)

  # Backbone allows a simple and declarative way of declaring events, this is where you should specify them
  events:
    _.extend(_.clone(@__super__.events), {
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
    })

  # The render method is responsible of calling and implementing any and all of the rendering logic. You should call the 'template' method here and return whatever markup it returns, but you can optionally handle any other rendering logic here.
  render: () ->
    # The following line invokes the template engine and sends a backbone model's atributes in JSON format as the data.
    # You can either uncomment it or use the data-less call to 'template' below, just make sure you return the proper one.
    # @template(data: @options.backbone_data.toJSON(true, true))
    @template(data: {})
