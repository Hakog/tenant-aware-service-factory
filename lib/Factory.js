'use strict';

var NodeCache = require('node-cache');

function Factory() {
  this.constructors = new NodeCache();
  this.cache = new NodeCache();
}

Factory.prototype.EVENT_SERVICE = 1;
Factory.prototype.ORDER_SERVICE = 2;
Factory.prototype.TICKET_SERVICE = 3;
Factory.prototype.PAYMENT_SERVICE = 4;
Factory.prototype.CONFIG_SERVICE = 5;

Factory.prototype.registerService = function(serviceId, constructor) {
  this.constructors.set(serviceId, constructor);
};

Factory.prototype.getInstance = function(serviceId, tenant) {
  if (!serviceId || !tenant || !tenant._id) {
    return null;
  }

  var key = tenant._id + '_' + serviceId,
      cachedService = this.cache.get(key)[key],
      ServiceConstructor,
      service;

  // Return from cache if possible
  if (cachedService) {
    return cachedService;
  }

  ServiceConstructor = this.constructors.get(serviceId)[serviceId];
  if (!ServiceConstructor || typeof ServiceConstructor !== 'function') {
    return null;
  }

  service = new ServiceConstructor(tenant);

  // Add to the cache
  this.cache.set(key, service);

  return service;
};

module.exports = Factory;