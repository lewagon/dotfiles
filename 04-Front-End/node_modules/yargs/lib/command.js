const path = require('path')
const inspect = require('util').inspect
const camelCase = require('camelcase')

// handles parsing positional arguments,
// and populating argv with said positional
// arguments.
module.exports = function (yargs, usage, validation) {
  const self = {}

  var handlers = {}
  var aliasMap = {}
  self.addHandler = function (cmd, description, builder, handler) {
    var aliases = []
    if (Array.isArray(cmd)) {
      aliases = cmd.slice(1)
      cmd = cmd[0]
    } else if (typeof cmd === 'object') {
      var command = (Array.isArray(cmd.command) || typeof cmd.command === 'string') ? cmd.command : moduleName(cmd)
      if (cmd.aliases) command = [].concat(command).concat(cmd.aliases)
      self.addHandler(command, extractDesc(cmd), cmd.builder, cmd.handler)
      return
    }

    // allow a module to be provided instead of separate builder and handler
    if (typeof builder === 'object' && builder.builder && typeof builder.handler === 'function') {
      self.addHandler([cmd].concat(aliases), description, builder.builder, builder.handler)
      return
    }

    var parsedCommand = parseCommand(cmd)
    aliases = aliases.map(function (alias) {
      alias = parseCommand(alias).cmd // remove positional args
      aliasMap[alias] = parsedCommand.cmd
      return alias
    })

    if (description !== false) {
      usage.command(cmd, description, aliases)
    }

    handlers[parsedCommand.cmd] = {
      original: cmd,
      handler: handler,
      builder: builder || {},
      demanded: parsedCommand.demanded,
      optional: parsedCommand.optional
    }
  }

  self.addDirectory = function (dir, context, req, callerFile, opts) {
    opts = opts || {}
    // disable recursion to support nested directories of subcommands
    if (typeof opts.recurse !== 'boolean') opts.recurse = false
    // exclude 'json', 'coffee' from require-directory defaults
    if (!Array.isArray(opts.extensions)) opts.extensions = ['js']
    // allow consumer to define their own visitor function
    const parentVisit = typeof opts.visit === 'function' ? opts.visit : function (o) { return o }
    // call addHandler via visitor function
    opts.visit = function (obj, joined, filename) {
      const visited = parentVisit(obj, joined, filename)
      // allow consumer to skip modules with their own visitor
      if (visited) {
        // check for cyclic reference
        // each command file path should only be seen once per execution
        if (~context.files.indexOf(joined)) return visited
        // keep track of visited files in context.files
        context.files.push(joined)
        self.addHandler(visited)
      }
      return visited
    }
    require('require-directory')({ require: req, filename: callerFile }, dir, opts)
  }

  // lookup module object from require()d command and derive name
  // if module was not require()d and no name given, throw error
  function moduleName (obj) {
    const mod = require('which-module')(obj)
    if (!mod) throw new Error('No command name given for module: ' + inspect(obj))
    return commandFromFilename(mod.filename)
  }

  // derive command name from filename
  function commandFromFilename (filename) {
    return path.basename(filename, path.extname(filename))
  }

  function extractDesc (obj) {
    for (var keys = ['describe', 'description', 'desc'], i = 0, l = keys.length, test; i < l; i++) {
      test = obj[keys[i]]
      if (typeof test === 'string' || typeof test === 'boolean') return test
    }
    return false
  }

  function parseCommand (cmd) {
    var extraSpacesStrippedCommand = cmd.replace(/\s{2,}/g, ' ')
    var splitCommand = extraSpacesStrippedCommand.split(/\s+(?![^[]*]|[^<]*>)/)
    var bregex = /\.*[\][<>]/g
    var parsedCommand = {
      cmd: (splitCommand.shift()).replace(bregex, ''),
      demanded: [],
      optional: []
    }
    splitCommand.forEach(function (cmd, i) {
      var variadic = false
      cmd = cmd.replace(/\s/g, '')
      if (/\.+[\]>]/.test(cmd) && i === splitCommand.length - 1) variadic = true
      if (/^\[/.test(cmd)) {
        parsedCommand.optional.push({
          cmd: cmd.replace(bregex, '').split('|'),
          variadic: variadic
        })
      } else {
        parsedCommand.demanded.push({
          cmd: cmd.replace(bregex, '').split('|'),
          variadic: variadic
        })
      }
    })
    return parsedCommand
  }

  self.getCommands = function () {
    return Object.keys(handlers).concat(Object.keys(aliasMap))
  }

  self.getCommandHandlers = function () {
    return handlers
  }

  self.runCommand = function (command, yargs, parsed) {
    var argv = parsed.argv
    var commandHandler = handlers[command] || handlers[aliasMap[command]]
    var innerArgv = argv
    var currentContext = yargs.getContext()
    var numFiles = currentContext.files.length
    var parentCommands = currentContext.commands.slice()
    currentContext.commands.push(command)
    if (typeof commandHandler.builder === 'function') {
      // a function can be provided, which builds
      // up a yargs chain and possibly returns it.
      innerArgv = commandHandler.builder(yargs.reset(parsed.aliases))
      // if the builder function did not yet parse argv with reset yargs
      // and did not explicitly set a usage() string, then apply the
      // original command string as usage() for consistent behavior with
      // options object below
      if (yargs.parsed === false) {
        if (typeof yargs.getUsageInstance().getUsage() === 'undefined') {
          yargs.usage('$0 ' + (parentCommands.length ? parentCommands.join(' ') + ' ' : '') + commandHandler.original)
        }
        innerArgv = innerArgv ? innerArgv.argv : yargs.argv
      } else {
        innerArgv = yargs.parsed.argv
      }
    } else if (typeof commandHandler.builder === 'object') {
      // as a short hand, an object can instead be provided, specifying
      // the options that a command takes.
      innerArgv = yargs.reset(parsed.aliases)
      innerArgv.usage('$0 ' + (parentCommands.length ? parentCommands.join(' ') + ' ' : '') + commandHandler.original)
      Object.keys(commandHandler.builder).forEach(function (key) {
        innerArgv.option(key, commandHandler.builder[key])
      })
      innerArgv = innerArgv.argv
    }
    if (!yargs._hasOutput()) populatePositionals(commandHandler, innerArgv, currentContext, yargs)

    if (commandHandler.handler && !yargs._hasOutput()) {
      commandHandler.handler(innerArgv)
    }
    currentContext.commands.pop()
    numFiles = currentContext.files.length - numFiles
    if (numFiles > 0) currentContext.files.splice(numFiles * -1, numFiles)
    return innerArgv
  }

  // transcribe all positional arguments "command <foo> <bar> [apple]"
  // onto argv.
  function populatePositionals (commandHandler, argv, context, yargs) {
    argv._ = argv._.slice(context.commands.length) // nuke the current commands
    var demanded = commandHandler.demanded.slice(0)
    var optional = commandHandler.optional.slice(0)

    validation.positionalCount(demanded.length, argv._.length)

    while (demanded.length) {
      var demand = demanded.shift()
      populatePositional(demand, argv, yargs)
    }

    while (optional.length) {
      var maybe = optional.shift()
      populatePositional(maybe, argv, yargs)
    }

    argv._ = context.commands.concat(argv._)
  }

  // populate a single positional argument and its
  // aliases onto argv.
  function populatePositional (positional, argv, yargs) {
    // "positional" consists of the positional.cmd, an array representing
    // the positional's name and aliases, and positional.variadic
    // indicating whether or not it is a variadic array.
    var variadics = null
    var value = null
    for (var i = 0, cmd; (cmd = positional.cmd[i]) !== undefined; i++) {
      if (positional.variadic) {
        if (variadics) argv[cmd] = variadics.slice(0)
        else argv[cmd] = variadics = argv._.splice(0)
      } else {
        if (!value && !argv._.length) continue
        if (value) argv[cmd] = value
        else argv[cmd] = value = argv._.shift()
      }
      postProcessPositional(yargs, argv, cmd)
      addCamelCaseExpansions(argv, cmd)
    }
  }

  // TODO move positional arg logic to yargs-parser and remove this duplication
  function postProcessPositional (yargs, argv, key) {
    var coerce = yargs.getOptions().coerce[key]
    if (typeof coerce === 'function') {
      try {
        argv[key] = coerce(argv[key])
      } catch (err) {
        yargs.getUsageInstance().fail(err.message, err)
      }
    }
  }

  function addCamelCaseExpansions (argv, option) {
    if (/-/.test(option)) {
      const cc = camelCase(option)
      if (typeof argv[option] === 'object') argv[cc] = argv[option].slice(0)
      else argv[cc] = argv[option]
    }
  }

  self.reset = function () {
    handlers = {}
    aliasMap = {}
    return self
  }

  // used by yargs.parse() to freeze
  // the state of commands such that
  // we can apply .parse() multiple times
  // with the same yargs instance.
  var frozen
  self.freeze = function () {
    frozen = {}
    frozen.handlers = handlers
    frozen.aliasMap = aliasMap
  }
  self.unfreeze = function () {
    handlers = frozen.handlers
    aliasMap = frozen.aliasMap
    frozen = undefined
  }

  return self
}
