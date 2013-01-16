class <%= model_namespace %> extends OpalExtensions.Model
  urlRoot: '<%= plural_name %>'

  defaults:
<% attributes.each do |a| -%>
    <%= a.name %>: null
<% end -%>
