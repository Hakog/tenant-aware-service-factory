'use strict';

var NodeCache = require('node-cache');

function Factory() {
  this.constructors = new NodeCache();
  this.cache = new NodeCache();
}

Factory.prototype.EVENT_SERVICE = 'event-service';
Factory.prototype.ORDER_SERVICE = 'order-service';
Factory.prototype.TICKET_SERVICE = 'ticket-service';
Factory.prototype.PAYMENT_SERVICE = 'payment-service';
Factory.prototype.CONFIG_SERVICE = 'config-service';

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

  // Construct new service
  service = new ServiceConstructor(tenant);

  // Add to the cache
  this.cache.set(key, service);

  return service;
};

module.exports = Factory;