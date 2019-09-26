Snippet route         <{verb}> '<{name}>', to: '<{controller}>#<{action}>', as: '<{action}>', on: :member, on: :collection
Snippet namespace     namespace :<{}> do<CR><{}><CR>end
Snippet res           resources :<{}>, only: [:<{}>]
Snippet delete        delete '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Snippet get           get '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Snippet post          post '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Snippet put           put '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection

Snippet controller    class <{}>sController < ApplicationController<CR><{}>
Snippet def           def <{}><CR><{}><CR>end
Snippet defupdate     def update<CR>@<{var}> = <{var}>.find(params[:id])<CR>@<{var}>.update(<{var}>_params)<CR>end
Snippet defparams     def <{var}>_params<CR>params.require(:<{var}>).permit(:<{}>)<CR>end
Snippet params        params[:<{id}>]
Snippet ba            before_action :set_<{}>_instance_variable , only: [:<{}>]
Snippet rt            redirect_to <{}>_path<{}>
Snippet cu            current_user
Snippet find          @<{var}> = <{var:substitute(@z,'.?','\u&','g')}>.find(params[:id])
Snippet all           @<{var}> = <{var:substitute(@z,'.?','\u&','g')}>.all
Snippet new           @<{var}> = <{var:substitute(@z,'.?','\u&','g')}>.new
Snippet update        @<{var}>.update(<{var}>_params)<CR><{}>

Snippet model         class <{name}> < ApplicationRecord<CR>end
Snippet addcol        add_column :<{table}>, :<{var}>, :<{type}>
Snippet addcolumn     add_column :<{table}>, :<{var}>, :<{type}>
Snippet addref        add_reference :<{table}>, :<{var}>, foreign_key: true
Snippet bt            belongs_to :<{}><CR><{}>
Snippet hm            has_many :<{}>s<CR><{}>
Snippet hmt           has_many :<{}>s, through: :<{}><CR><{}>

Snippet rspec         require 'rails_helper'<CR><CR>RSpec.describe "" do<CR>  let(:<{instance}>) { create(:<{instance}>) }<CR><CR>  before { <{}> }<CR><CR>  it "<{}>" do<CR><{}><CR>end<CR>end
Snippet it            it "<{}>" do<CR><{}><CR>end<CR>

Snippet ?             <{}>? <{}> : <{}>
Snippet each          each { |<{}>| <{}> }
Snippet eacho         each do |<{}>|<CR><{}><CR>end
Snippet map           map { |<{element}>| <{element}>.<{}> }<CR>
Snippet mapo          map do |<{element}>|<CR><{element}>.<{}><CR>end<CR>
Snippet if            if <{}><CR><{}><CR>else<CR><{}><CR>end
Snippet bq            `<{}>`<{}>
Snippet dq            "<{}>"<{}>
Snippet sq            '<{}>'<{}>
Snippet hash          {<CR><{}>: <{}>,<CR>"<{}>" => <{}>,<CR>}
Snippet debug         p "*"*30<CR>