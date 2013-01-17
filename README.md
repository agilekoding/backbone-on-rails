# Go!Backbone

This fork of the popular backbone-on-rails gem extends the install and scaffold generators provided by the original gem. It aims to provide tools to create the skeleton of an OPA (One Page Application) in a wink.

  http://git.io/backbone-on-rails


## Features

### From the original backbone-on-rails gem

1. Vendors the latest Backbone.js + Underscore.js in the asset pipeline[1]

2. Provides an install generator to create a skeleton directory structure and manifest

3. Provides a scaffold generator to create files and boilerplate

4. Uses the naming conventions from thoughtbot's 'Backbone.js on Rails' http://bit.ly/pLsmzr

5. Generates CoffeeScript (default) or JavaScript[2]

### New features

1. Vendors the following libraries in the asset pipeline:
  - Backbone.ModelBinder
  - Backbone.CollectionBinder
  - Backbone.RelationalModel
  - OpalExtensions[3]

2. Extends the install generator to include the additional vendored assets

3. Extends the scaffold generator to create some default code

## Intallation

You will need to include the following line inside your Gemfile

  `gem 'backbone-on-rails', :git => 'git@github.com:e-serge/backbone-on-rails'`

Then you can run the usual commands:

`bundle install`

`rails generate backbone:install`

`rails generate backbone:scaffold NAME`

Note: This Gem is still in development and it might take a while to make it to a stable version, until then, github will be hosting it.

## Usage

It is possible to use the scaffold generator much like you would use a rails scaffold generator:

  `rails generate backbone:scaffold ModelName attr_one:integer attr_two:string attr_three:date`

This will create the following:
1. A router for ModelName with default routes (`index`, `show`, `new`, `edit`)

2. A collection (`ModelNamesCollection`)

3. A model with it's default attributes set to null, using the provided attribute keys (Eg. `attr_one`, `attr_two` and `attr_three`)

4. Views to handle the four default routes.

5. View templates, for a basic instant CRUD.

[1] json2.js is not included

[2] Javascript generation is not curently supported. It's supposed to work but it will only generate the default files and directories, you will miss out on the generated code if you choose to use this option.

[3] The OpalExtensions project is experimental, periodical updates get merged on the master branch. Use at your own risk.
