import Ember from 'ember';

export default Ember.Service.extend({
  enabled: false,
  map: {},
  prepend: '/',

  resolve(name) {
    const map = this.get('map') || {};
    const prepend = this.get('prepend');
    const enabled = this.get('enabled');
    const assetName = enabled ? map[name] : name;

    return `${prepend}${assetName}`;
  }
});
