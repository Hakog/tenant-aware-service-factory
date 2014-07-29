'use strict';

var Factory = require('./lib/Factory'),
    TenantAwareService = require('./lib/TenantAwareService');

// export single instance of the factory
module.exports.Factory = new Factory();

// export the function from which all services should extend
module.exports.TenantAwareService = TenantAwareService;