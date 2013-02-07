class <%= view_namespace %> extends Sharkbone.View

  # This function retrieves a template from a namespaced collection, the default format favor the use of templating engines like JST or Handlebars but you can replace this with any other implementation.
  template: (context) -> <%= templates_namespace %>['<%= template_namespace %>'](context)

  # Place all the view's initialization logic here.
  initialize: () ->
    super(arguments...)

  bindings: () ->
<% attributes.each do |a| -%>
    <%= a.name %>: '[name=<%= a.name %>]'
<% end -%>

  # Backbone allows a simple and declarative way of declaring events, this is where you should specify them.
  events:
    _.extend(_.clone(@__super__.events), {
      # Write DOM events here in the following format:
      # "<event> <cssSelector>" : "<methodName>"
      #
      # The method gets an event argument, from which the currentTarget is accessible
      "submit #<%= file_name.pluralize %>_form" : "create"
    })

  # The render method is responsible of inserting a rendered template inside the @el property. This is a good place to bind your model with your view.
  render: () ->
    super(arguments...)
    @renderResource(@template, @model)
