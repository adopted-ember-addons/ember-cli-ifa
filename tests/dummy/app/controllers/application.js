import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  assetMap: service(),

  image: 'assets/tomster-under-construction',

  imagePath: computed('image', function() {
    return this.assetMap.resolve(`${this.image}.png`);
  }),
});
