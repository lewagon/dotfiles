"use strict";
var core = module.exports = require("../level1/core");

// These (because of how they were written) directly include level1/core and modify it.
// ORDER IS IMPORTANT
require("../level2/core");
require("../level2/events");
require("../level2/html");
require("../level2/style");
require("../level3/core");
require("../level3/ls");
require("../level3/xpath");

require("./document-type")(core);
require("./character-data")(core);
require("./processing-instruction")(core);
require("./comment")(core);
require("./text")(core);
require("./dom-implementation")(core);
require("./document")(core);
require("./node-filter")(core);
require("./node")(core);
require("./selectors")(core);
