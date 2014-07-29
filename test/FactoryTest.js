'use strict';

var should = require('should'),
    EventService = require('event-service'),
    Factory = require('../lib/Factory');

describe('FactoryTest', function() {
  describe('#getInstance', function() {
    var tenant = null;

    before(function() {
      // Create a fake tenant
      tenant = {};
      tenant._id = '123';
    });

    it('should return an instance of the requested service', function(done) {
      var factory = new Factory(),
          service = factory.getInstance(factory.EVENT_SERVICE, tenant);

      // Check if the service is created
      should.exist(service);

      // Check if the instance of the service is correct
      service.should.be.instanceOf(EventService);

      // The service should have a tenant


      done();

    });
  });
});
