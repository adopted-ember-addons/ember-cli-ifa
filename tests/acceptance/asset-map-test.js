import { module, test } from 'qunit';
import { visit, currentURL, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { get } from '@ember/object';

module('Acceptance | asset map', function(hooks) {
  setupApplicationTest(hooks);

  test('asset map is correctly built', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    let assetMapService = this.owner.lookup('service:asset-map');
    assert.equal(get(assetMapService, 'enabled'), true, 'asset map is enabled');
    assert.equal(get(assetMapService, 'prepend'), '', 'prepend is an empty string');

    let imgPaths = [].concat(...findAll('img')).map((img) => img.getAttribute('src'));
    assert.equal(imgPaths[0], imgPaths[1], 'images 1 & 2 have equal paths');
    assert.equal(imgPaths[0], imgPaths[2], 'images 1 & 3 have equal paths');
  });
});
