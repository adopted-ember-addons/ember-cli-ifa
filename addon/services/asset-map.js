import Service from '@ember/service';
import { computed, get } from '@ember/object';

export default Service.extend({
  enabled: false,
  map: computed(() => ({})),
  prepend: '/',

  resolve(name) {
    const map = get(this, 'map') || {};
    const prepend = get(this, 'prepend');
    const enabled = get(this, 'enabled');
    const assetName = enabled ? map[name] : name;

    return `${prepend}${assetName}`;
  }
});
