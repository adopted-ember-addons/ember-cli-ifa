import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  assetMap: service(),

  image: 'assets/tomster-under-construction',

  imagePath: computed(function() {
    return this.get('assetMap').resolve(`${this.get('image')}.png`);
  }),
});
