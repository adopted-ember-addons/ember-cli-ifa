import { module, test } from 'qunit';
import { setup as setupFastBootTest, visit } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot', function(hooks) {
  setupFastBootTest(hooks);

  test('renders the correct asset URLs', async function(assert) {
    const { statusCode, err } = await visit('/');

    assert.equal(200, statusCode, err ? err.message : '');

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
