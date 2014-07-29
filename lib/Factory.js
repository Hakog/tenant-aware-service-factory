'use strict';

var util = require('util'),
    NodeCache = require('node-cache'),
    EventService = require('event-service'),
    TenantAwareService = require('./TenantAwareService');

function Factory() {
  this.cache = new NodeCache();
}

Factory.prototype.EVENT_SERVICE = 1;

Factory.prototype.getInstance = function(serviceId, tenant) {
  if (!serviceId || !tenant || !tenant._id) {
    return null;
  }

  //TODO: Check if tenant is instance of Tenant ?
  var key = tenant._id + '_' + serviceId,
      cachedService = this.cache.get(key)[key],
      service;

  // Return from cache if possible
  if (cachedService) {
    return cachedService;
  }

  console.log('serviceId :' + serviceId);

  // Create a new service
  switch(serviceId) {
    case this.EVENT_SERVICE:
      service = new EventService();
      break;
  }

  // TODO Add to the cache

  // TODO: Create a new instance of the service, extend it from TenantAwareService

  // TODO: How do we determine which service ? Use if.. else.. or something more elegant.

  return service;
};


module.exports = Factory;