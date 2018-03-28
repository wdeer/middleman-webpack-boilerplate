###
# Site settings
###
set :url_root, 'domain.com'
set :url, "http://" + config[:url_root]
set :google_analytics, nil
set :site_author, 'Jahn Doh'

set :google_font, 'https://fonts.googleapis.com/css?family=Titillium+Web:300,400,600,700|Playfair+Display:400,700,900'

set :css_dir, 'css'
set :js_dir, 'js'
set :images_dir, 'images'

set :stylesheets_base_path, 'css'
set :javascripts_base_path, 'js'
set :images_base_path, 'images'


###
# Page options, layouts, aliases and proxies
###

# disable layout
page '403*',          :layout => false
page '404*',          :layout => false

[ :xml, :json, :txt, :htaccess, :apache ].each do |extension|
  page "/*.#{extension}", layout: false
end


# For campaigns that utilize the same layout throughout proxy pages come in really handy..
data.main.pages.each do |page|
    proxy "/#{page.slug}.html", "/templates/page.html", :locals => { :page => page }, :ignore => true
end

###
# Helpers and extensions
###

helpers do

  def component(path, locals={})
    partial "components/#{path}", locals
  end

end



# Markdown and syntax highlighting
activate :syntax
set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true

# Use relative URLs
activate :relative_assets

# Turn on Pretty URLs
activate :directory_indexes

###
# Environment settings
###
# Development-specific configuration
configure :development do
  set :url, ''
  activate :livereload do |livereload|
    livereload.host = Socket.ip_address_list.detect{|intf| intf.ipv4_private?}.ip_address
  end
end

# rename file after build
after_build do
  File.rename 'build/.htaccess.apache', 'build/.htaccess'
end


activate :webpack

# activate :s3_sync do |s3_sync|
#  s3_sync.bucket                     = ENV['AWS_BUCKET']
#  s3_sync.region                     = ENV['AWS_REGION']
#  s3_sync.aws_access_key_id          = ENV['AWS_ACCESS_KEY_ID']
#  s3_sync.aws_secret_access_key      = ENV['AWS_SECRET_ACCESS_KEY']
#  s3_sync.prefix                     = ENV['AWS_PATH']
#  s3_sync.delete                     = false
#  s3_sync.after_build                = true
# end

ready do
   sitemap.ensure_resource_list_updated!
end
