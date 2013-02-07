class <%= model_namespace %> extends Sharkbone.Model
  urlRoot: '<%= plural_name %>'

  defaults:
<% attributes.each do |a| -%>
    <%= a.name %>: null
<% end -%>

  initialize: () ->
    super(arguments...)
