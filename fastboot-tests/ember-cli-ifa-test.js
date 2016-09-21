var jsdom   = require("jsdom").jsdom;
var FastBoot = require('fastboot');

var app = new FastBoot({
  distPath: 'dist'
});

QUnit.test('it renders fingerprinted image on server', function (assert) {
  assert.expect(2);

  return app.visit('/')
    .then(result => {
      assert.equal(200, result.statusCode);
      return result.html();
    })
    .then(html => {
    let document = jsdom(html).defaultView.document;

    var img = document.getElementsByTagName('img')[0].getAttribute('src');

    assert.equal(img, 'assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png');
  });
});
