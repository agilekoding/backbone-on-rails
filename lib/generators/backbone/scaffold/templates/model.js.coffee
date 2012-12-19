class <%= model_namespace %> extends Backbone.Model
  urlRoot: '<%= plural_name %>'

  defaults:
    <% model_attrs.each do |key, type| -%>
    <%= key %>: null
    <% end -%>
