import Controller from 'ember-controller';
import service from 'ember-service/inject';
import computed from 'ember-computed';

export default Controller.extend({
  assetMap: service(),

  image: 'assets/tomster-under-construction',

  imagePath: computed(function() {
    return this.get('assetMap').resolve(`${this.get('image')}.png`);
  }),
});
