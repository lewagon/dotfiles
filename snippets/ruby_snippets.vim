Iabbr params.require params.require(<{}>).permit(:<{}>)
Iabbr params         params[:<{id}>]
Iabbr before_action  before_action :set_<{}>_instance_variable , only: [:<{}>]
Iabbr namespace      namespace :<{}> do <CR>end
Iabbr res            resources :<{}>, only: [:<{}>]
Iabbr delete         delete '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Iabbr get            get '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Iabbr post           post '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Iabbr put            put '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Snippet route        <{verb}> '<{name}>', to: '<{controller}>#<{action}>', as: '<{action}>', on: :member, on: :collection
Iabbr def            def <{}> <CR>end
Iabbr each           <{}>.each do |<{}>| <CR>end
Iabbr bq             `<{}>`<{}>
Iabbr dq             "<{}>"<{}>
Iabbr sq             '<{}>'<{}>
Iabbr @              @<{var}> = <{var:substitute(@z,'.?','\u&','g')}>.find(params[:id])
Snippet map          map { |<{element}>| <{element}>.<{}> }<CR>
Snippet mapo         map do |<{element}>|<CR><{element}>.<{}><CR>end<CR>
Snippet it           it "<{}>" do<CR><{}><CR>end<CR>
