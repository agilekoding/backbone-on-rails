class <%= model_namespace %> extends Backbone.Model
  urlRoot: '<%= plural_name %>'

  defaults:
<% model_attrs.each do |key| -%>
    <%= key %>: null
<% end -%>
