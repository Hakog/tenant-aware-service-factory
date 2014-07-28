'use strict';

var NodeCache = require('node-cache');

function Factory() {
  this.cache = new NodeCache();
}

Factory.prototype.EVENT_SERVICE = 1;

Factory.prototype.getInstance = function(serviceName, tenant) {
  if (!serviceName || !tenant || tenant._id) {
    return null;
  }

  //TODO: Check if tenant is instance of Tenant ?
  var key = tenant._id + '_' + serviceName,
      cachedService = tenantCache.get(key)[key];

  // Return from cache if possible
  if (cachedService) {
    return cachedService;
  }

  // TODO: Create a new instance of the service, extend it from TenantAwareService

  // TODO: How do we determine which service ? Use if.. else.. or something more elegant.

  // TODO: Add new service to the cache and return it

};