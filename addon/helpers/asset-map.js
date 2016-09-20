import Ember from 'ember';
import service from 'ember-service/inject'

export default Ember.Helper.extend({
  assetMap: service('asset-map'),

  compute(params) {
    const file = params[0] || "";

    if (!file) {
      return;
    }

    return this.get('assetMap').resolve(file);
  }
});
