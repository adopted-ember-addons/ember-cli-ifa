import Service from '@ember/service';
import { computed, get } from '@ember/object';

export default Service.extend({
  enabled: false,
  map: computed(() => ({})),
  prepend: '/',

  fullMap: computed('map', function() {
    const map = get(this, 'map');
    const ret = {};

    const identity = Object.keys(map).forEach(k => {
      const v = map[k];
      ret[k] = v;
      ret[v] = v;
    });

    return ret;
  }),

  resolve(name) {
    const fullMap = get(this, 'fullMap') || {};
    const prepend = get(this, 'prepend');
    const enabled = get(this, 'enabled');
    const assetName = enabled ? fullMap[name] : name;
    console.log({ fullMap, prepend, enabled, assetName });
    return `${prepend}${assetName}`;
  }
});
