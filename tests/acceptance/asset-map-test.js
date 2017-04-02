import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Validate fingerprinting');

test('Validate URLs are fingerprinted correctly', function(assert) {
  visit('/');

  andThen(function() {
    let goodTomsters = [
      '/assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png',
      '/assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png',
      '/assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png',
    ];

    let comparableTomsters = Array.from(document.getElementsByTagName('img')).map((tag) => tag.getAttribute('src'));

    assert.deepEqual(comparableTomsters, goodTomsters);
  });
});
