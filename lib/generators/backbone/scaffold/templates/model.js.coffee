class <%= model_namespace %> extends Backbone.Model

  defaults:
    <% model_attrs.each do |key, type| %>
    <%= key %>: null
    <% end %>
