'use strict';

var TestService = function(tenant) {
  this.tenant = tenant;
};

TestService.prototype.getTenant = function() {
  return this.tenant;
};

module.exports = TestService;