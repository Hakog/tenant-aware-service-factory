'use strict';

var Factory = require('./lib/Factory'),
    TenantAwareService = require('./lib/Factory');

// export single instance of the factory
module.exports = new Factory();