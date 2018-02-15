import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Helper.extend({
  assetMap: service(),

  compute(params) {
    const file = params[0] || "";

    if (!file) {
      return;
    }

    return get(this, 'assetMap').resolve(file);
  }
});
