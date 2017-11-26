'use strict';

const Factory = require('./lib/Factory');

//
// Make sure that there is only one instance of the service factory
//

const KEY = Symbol.for("com.ticketapply.tenant-aware-service-factory");
const globalSymbols = Object.getOwnPropertySymbols(global);
const hasFactory = (globalSymbols.indexOf(KEY) > -1);

if (!hasFactory){
  global[KEY] = new Factory();
}

module.exports = global[KEY];