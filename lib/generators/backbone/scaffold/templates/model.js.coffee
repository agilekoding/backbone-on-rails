class <%= model_namespace %> extends Backbone.Model
  urlRoot: '<%= plural_name %>'

  defaults:
<% attributes.each do |a| -%>
    <%= a.name %>: null
<% end -%>
