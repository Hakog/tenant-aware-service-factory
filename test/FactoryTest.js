'use strict';

var should = require('should'),
    Factory = require('../lib/Factory'),
    TestService = require('./TestService');

describe('FactoryTest', function() {
  describe('#getInstance', function() {
    var factory = new Factory(),
        tenant = {
            _id: '123'
        };

    before(function(done) {
      factory.registerService('testservice', TestService);
      done();
    });

    it('should return an instance of the requested service', function(done) {
       var testServiceInstance = factory.getInstance('testservice', tenant),
           testServiceTenant = testServiceInstance.getTenant();

      // Check if the service is created
      should.exist(testServiceInstance);

      // Tenant should exist
      should.exist(testServiceTenant);

      // Check if the instance of the service is correct
      testServiceInstance.should.be.instanceOf(TestService);

      done();
    });
  });
});
