Snippet route         <{verb}> <{name}>, to: '<{controller}>#<{action}>', as: '<{action}>', on: :member, on: :collection
Snippet namespace     namespace :<{}> do<CR>end
Snippet res           resources :<{}>, only: [:<{}>]<{}>
Snippet ress          resources :<{}>, only: [:<{}>]<{}>


Snippet controller    class <{path}><{}>sController < <{path}>ApplicationController<CR><{}>end
Snippet newmet        def new<CR>@<{var}> = <{var:substitute(@z,'.*','\u&','g')}>.new<CR>end
Snippet createmet     def create<CR>@<{var}> = <{var:substitute(@z,'.*','\u&','g')}>.new(<{var}>_params)<{}><CR>end
Snippet updatemet     def update<CR>@<{var}> = <{var:substitute(@z,'.*','\u&','g')}>.find(params[:id])<CR>@<{var}>.update(<{var}>_params)<CR>end
Snippet paramsmet     def <{var}>_params<CR>params.require(:<{var}>).permit(:<{}>)<CR>end
Snippet params        params[:<{id}>]
Snippet ba            before_action :set_<{}>_instance_variable , only: [:<{}>]
Snippet rt            redirect_to <{}>_path<{}>
Snippet cu            current_user
Snippet find          @<{var}> = <{var:substitute(@z,'.*','\u&','g')}>.find(params[:id])<{}>
Snippet all           @<{var}> = <{var:substitute(@z,'.*','\u&','g')}>.all<{}>
Snippet nw            @<{var}> = <{var:substitute(@z,'.*','\u&','g')}>.new<{}>
Snippet update        @<{var}>.update(<{var}>_params)<{}>


Snippet model         class <{name}> < ApplicationRecord<CR><{}>end
Snippet bt            belongs_to :<{}>
Snippet hm            has_many :<{}>s<{}>
Snippet hmt           has_many :<{}>s, through: :<{}>


Snippet migration     class <{}> < ActiveRecord::Migration[5.1]<{}><CR>end
Snippet addcol        add_column :<{table}>, :<{var}>, :<{type}>
Snippet addcolumn     add_column :<{table}>, :<{var}>, :<{type}>
Snippet addref        add_reference :<{table}>, :<{var}>, foreign_key: true<{}>
Snippet removecol     remove_column :<{table}>, :<{var}>
Snippet changecol     rename_column :<{table}>, :<{old_column}>, :<{new_column}>


Snippet rspec         require 'rails_helper'<CR><CR>RSpec.describe "<{}>" do<CR><CR>before { <{}> }<CR><CR>it "<{}>" do<{}><CR>end<CR>end
Snippet it            it "<{}>" do<{}><CR>end
Snippet context       context "<{}>" do<{}><CR>end
Snippet fillin        fill_in "<{field}>", with: "<{text}>"<{}>
Snippet expect        expect(<{}>).to <{to_or_have}>(<{something}>)<{}>


Snippet def           def <{}><CR>end
Snippet ternary       <{}> ? <{}> : <{}>
Snippet each          each { |<{}>| <{}> }
Snippet eachdo        each do |<{}>|<CR>end
Snippet map           map { |<{element}>| <{element}>.<{}> }
Snippet mapdo         map do |<{element}>|<CR><{element}>.<{}><CR>end<CR>
Snippet block         do<CR><{}><CR>end
Snippet blockargs     do |<{args}>|<CR><{}><CR>end
Snippet if            if <{}><CR>end
Snippet ife           if <{}><CR>else<CR>end
Snippet bt            `<{}>`<{}>
Snippet dq            "<{}>"<{}>
Snippet sq            '<{}>'<{}>
Snippet hash          {<CR><{}>: <{}>,<CR>"<{}>" => <{}>,<CR>}
Snippet debug         puts "*"*30<{}>
