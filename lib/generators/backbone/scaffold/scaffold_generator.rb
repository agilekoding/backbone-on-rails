require 'generators/backbone/helpers'

module Backbone
  module Generators
    class ScaffoldGenerator < Rails::Generators::NamedBase
      include Backbone::Generators::Helpers

      source_root File.expand_path("../templates", __FILE__)

      desc "Generates a Backbone.js resource scaffold"

      argument :attributes, type: :array, default: [], banner: "field:type field:type"

      class_option :javascript,
                    type: :boolean,
                    aliases: "-j",
                    default: false,
                    desc: "Generate JavaScript"

      attr_accessor :model_attrs

      def parse_options
        js = options.javascript
        @ext  = js ? ".js" : ".js.coffee"
        @tmpl = ".hamlbars"
        @templates_namespace = "HandlebarsTemplates"
      end

      def create_backbone_model
        file = File.join(model_path, singular_file_name)
        template "model#{@ext}", file
      end

      def create_backbone_collection
        file = File.join(collection_path, plural_file_name)
        template "collection#{@ext}", file
      end

      def create_backbone_router
        file = File.join(router_path, router_file_name)
        template "router#{@ext}", file
      end

      def create_backbone_view
        empty_directory File.join(view_path, file_name.pluralize)
        sample_templates.each do |sample|
          current_view = sample.to_s
          file = File.join(view_path, file_name.pluralize, view_file_name(sample))
          #template "#{sample}_view#{@ext}", file
          template "view#{@ext}", file
        end
      end

      def create_backbone_template
        empty_directory File.join(template_path, file_name.pluralize)
        sample_templates.each do |sample|
          file = File.join(template_path, file_name.pluralize, "#{sample}#{@tmpl}")
          template "#{sample}_template#{@tmpl}", file
        end
      end

    end
  end
end
