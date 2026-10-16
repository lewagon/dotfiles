# https://github.com/pry/pry/tree/master/lib/pry

if defined?(Rails)
  short_env_name_options = {
    'development' => 'dev',
    'production'  => 'prod'
  } 
  app_name = Rails.application.class.module_parent_name.underscore.dasherize
  env_name = short_env_name_options.fetch(Rails.env) { Rails.env }
  description = 'Prompt has to match the rails app name'
else
  current_directory = Dir.pwd.split('/').last.to_s
  description = 'Prompt has to match the current directory name'
end

# https://github.com/pry/pry/blob/master/lib/pry/prompt.rb
Pry::Prompt.add(:current_app) do |context, nesting, pry_instance, sep|
  format(
    '[%<in_count>s] %<current_app>s(%<context>s)%<nesting>s%<separator>s ',
    in_count: pry_instance.input_ring.count,
    current_app: app_name || current_directory,
    context: env_name || Pry.view_clip(context),
    nesting: (nesting > 0 ? ":#{nesting}" : ''),
    separator: sep
  )
end

prompt = Pry::Prompt[:current_app]
procs = [
  proc { |*args| prompt.wait_proc.call(*args).to_s },
  proc { |*args| prompt.incomplete_proc.call(*args).to_s }
]

Pry.config.prompt = Pry::Prompt.new(
  'custom_app_prompt', description, procs
)
