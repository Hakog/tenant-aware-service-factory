'use strict';

var NodeCache = require('node-cache'),
    EventService = require('event-service'),
    OrderService = require('order-service'),
    TicketService = require('ticket-service');

function Factory() {
  this.cache = new NodeCache();
}

Factory.prototype.EVENT_SERVICE = 1;
Factory.prototype.ORDER_SERVICE = 2;
Factory.prototype.TICKET_SERVICE = 3;

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

  // Create a new service
  switch(serviceId) {
    case this.EVENT_SERVICE:
      service = new EventService(tenant);
      break;
    case this.ORDER_SERVICE:
      service = new OrderService(tenant);
      break;
    case this.TICKET_SERVICE:
      service = new TicketService(tenant);
      break;
  }

  // Add to the cache
  this.cache.set(key, service);

  return service;
};

module.exports = Factory;