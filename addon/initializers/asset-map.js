import RSVP from 'rsvp';
import AssetMap from '../services/asset-map';
import { typeOf as getTypeOf } from '@ember/utils';
import getAssetMapData from 'ember-cli-ifa/utils/get-asset-map-data';
import Application from '@ember/application';

export function initialize(app) {
  // If app is not an Ember Application, we are likely running an engine, which does not have `deferReadiness` or `advanceReadiness` so skip running this.
  if (!(app instanceof Application)) {
    return;
  }

  let assetMapFile = getAssetMapData();

  if (!assetMapFile) {
    app.register('service:asset-map', AssetMap);
    return;
  }

  if (getTypeOf(assetMapFile) === 'object' && assetMapFile.assets) {
    AssetMap.reopen({
      map: assetMapFile.assets,
      prepend: assetMapFile.prepend,
      enabled: true
    });
    app.register('service:asset-map', AssetMap);
  } else {
    app.deferReadiness();

    const promise = fetch(assetMapFile).then(response => response.json());

    promise.then((map = {}) => {
      AssetMap.reopen({
        map: map.assets,
        prepend: map.prepend,
        enabled: true
      });
    })
    .then(() => {
      app.register('service:asset-map', AssetMap);
    })
    .catch((err) => {
      console.error('Failed to register service:asset-map', err);
    })
    .finally(() => {
      app.advanceReadiness();
    });
  }
}

export default {
  name: 'asset-map',
  initialize
};
