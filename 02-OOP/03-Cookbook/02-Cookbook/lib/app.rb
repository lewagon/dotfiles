require_relative 'cookbook'
require_relative 'controller'
require_relative 'router'

cookbook   = Cookbook.new
controller = Controller.new(cookbook)

router = Router.new(controller)

# Start the app
router.run
