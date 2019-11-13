import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | asset map', function(hooks) {
  setupApplicationTest(hooks);

  test('asset map is correctly built', async function(assert) {
    await visit('/');

    let assetMapService = this.owner.lookup('service:asset-map');
    assert.ok(assetMapService.enabled, 'asset map is enabled');
    assert.equal(assetMapService.prepend, '', 'prepend is an empty string');

    assert
      .dom('[data-test-img-template-replace]')
      .hasAttribute(
        'src',
        'assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png'
      );

    assert
      .dom('[data-test-img-asset-map-service]')
      .hasAttribute(
        'src',
        'assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png'
      );

    assert
      .dom('[data-test-img-asset-map-helper]')
      .hasAttribute(
        'src',
        'assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png'
      );

    assert
      .dom('[data-test-img-asset-map-helper-string-path]')
      .hasAttribute(
        'src',
        'assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png'
      );
  });
});
