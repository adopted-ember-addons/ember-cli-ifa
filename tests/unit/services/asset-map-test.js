import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { set } from '@ember/object';

module('Unit | Service | asset-map', function(hooks) {
  setupTest(hooks);

  module('resolve', function() {
    test('it works with an existing name', function(assert) {
      let service = this.owner.lookup('service:asset-map');
      set(service, 'map', {
        'my/file.png': 'my/file-1234.png',
      });

      let result = service.resolve('my/file.png');
      assert.equal(result, 'my/file-1234.png');
    });

    test('it works with an existing name & prepend', function(assert) {
      let service = this.owner.lookup('service:asset-map');
      set(service, 'map', {
        'my/file.png': 'my/file-1234.png',
      });
      set(service, 'prepend', 'https://cdn.com/');

      let result = service.resolve('my/file.png');
      assert.equal(result, 'https://cdn.com/my/file-1234.png');
    });

    test('it works when disabled', function(assert) {
      let service = this.owner.lookup('service:asset-map');
      set(service, 'map', {
        'my/file.png': 'my/file-1234.png',
      });
      set(service, 'enabled', false);

      let result = service.resolve('my/file.png');
      assert.equal(result, 'my/file.png');
    });

    test('it works with an existing name & prepend when disabled', function(assert) {
      let service = this.owner.lookup('service:asset-map');
      set(service, 'map', {
        'my/file.png': 'my/file-1234.png',
      });
      set(service, 'prepend', 'https://cdn.com/');
      set(service, 'enabled', false);

      let result = service.resolve('my/file.png');
      assert.equal(result, 'https://cdn.com/my/file.png');
    });

    test('it works with a non-existing name', function(assert) {
      let service = this.owner.lookup('service:asset-map');
      set(service, 'map', {
        'my/file.png': 'my/file-1234.png',
      });

      let result = service.resolve('my/file2.png');
      assert.equal(result, 'my/file2.png');
    });

    test('it works with a non-existing name & prepend', function(assert) {
      let service = this.owner.lookup('service:asset-map');
      set(service, 'map', {
        'my/file.png': 'my/file-1234.png',
      });
      set(service, 'prepend', 'https://cdn.com/');

      let result = service.resolve('my/file2.png');
      assert.equal(result, 'https://cdn.com/my/file2.png');
    });
  });
});
