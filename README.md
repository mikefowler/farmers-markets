A (better) implementation of the USDA National Farmers' Market Directory.

## Project Status

Just getting going.

## Changelog

**07/01/14**

* Been working on this here and there, mostly fooling with UI
* Switched to Angular because I wanted more experience with it
* Working on designing basic search + search results

**05/22/14**

* Setup project structure
* Write initial bits of README
* Write barebones Marionette app
* Implement a model and collection for querying the USDA API 
* Stayed up far too late. Going to be tired at work tomorrow.

## Development

To set up your environment, perform the following magic tricks:

1. Clone this repository to your favorite directory
1. Make sure you have Node & NPM installed
1. In the repository directory, run `npm install` to install package dependencies
1. Run `bower install` to install component dependencies
1. Run `grunt` for great good.

The app should now (hopefully) be running at http://localhost:4500

## Deploying

Nothing in place just yet. Will be implemented using Grunt.

## Data Sources

* Search: http://search.ams.usda.gov/farmersmarkets/default.aspx
* API: http://search.ams.usda.gov/farmersmarkets/v1/svcdesc.html