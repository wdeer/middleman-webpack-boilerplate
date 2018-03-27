## In Brief
This site is developed with Middleman, a static site generator, and therefore requires no relational database. Middleman (combined with Webpack) watches and compiles all files and assets. Use NPM (preferred) or Bower to manage vendor packages.

**Features/Packages:** BrowserSync, Webpack, Breakpoint-sass, and so much more!

**Requirements:** Ruby and Node/NPM *(using rbenv and nodenv to manage is recommended)*

## Installation

first run `bundle` and then run `yarn` (or `npm install`) in terminal within the project's root directory

note: This project has only been tested with **ruby v2.4.2** and **node v8.9.4** / **npm v6.9.4**

## Getting Started
Webpack is integrated into the middleman build workflow so only middleman commands should be used in the command line.

`middleman serve` will start the local dev environment and trigger webpack. Webpack will watch all assets then recompile and livereload the changes. Visit http://localhost:4567 to see the site in browser.

`middleman build` will compile the full static site into a **/build/** directory (See additional caveats at bottom of this page)

##Project Files
**ASSETS:** All **SCSS** and **Javascript** assets are located within their respective directorys within **./source/**

**HTML:** All **html files** are located within the **./source/** directory within the root of the project. Since middleman is ruby, all html files must be appended with **.erb** and can run erb templating and digest any yaml front matter, or yaml/json within the **./data/** directory

* **Proxy Pages (aka Dynamic Pages):**
**./source/templates/page.html.erb** is a template file that grabs subpage data within the  "page" array in **./data/main.yml** The configuration for this is within **./config.rb**:

* ~~~~
data.main.pages.each do |page|
    proxy "/#{page.slug}.html", "/templates/page.html", :locals => { :page => page }, :ignore => true
end
~~~~