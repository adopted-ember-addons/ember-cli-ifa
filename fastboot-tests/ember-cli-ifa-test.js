var moduleForFastboot = require('ember-fastboot-test-helpers').moduleForFastboot;

moduleForFastboot('Basic rendering');

QUnit.test('it renders', function(assert) {
  assert.expect(2);

  return this.visit('/').then(function(data) {
    var statusCode = data[0];
    var headers = data[1];
    // var document = data[2];

    assert.equal(statusCode, 200, 'Request is successful');
    assert.equal(headers["content-type"], "text/html; charset=utf-8", 'Content type is correct');
  }.bind(this));
});
