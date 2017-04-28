const assert = require('assert');
const app = require('../../src/app');

describe('\'contact\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/contacts');

    assert.ok(service, 'Registered the service');
  });
});
