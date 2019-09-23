Iabbr namespace      namespace :<{}> do
Iabbr res            resources :<{}>, only: [:<{}>]
Iabbr get            get '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Iabbr post           post '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Iabbr put            put '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Iabbr delete         delete '<{}>', to: 'controller#action', as: 'prefix', on: :member, on: :collection
Iabbr def            def <{}> end
Iabbr each           <{}>.each do |<{}>|
Iabbr map            <{}>.map do |<{}>|
Iabbr params.require params.require(<{}>).permit(:<{}>)
Iabbr before_action  before_action :set_<{}>_instance_variable , only: [:<{}>]
Iabbr bq             `<{}>`<{}>
Iabbr dq             "<{}>"<{}>
Iabbr sq             '<{}>'<{}>
