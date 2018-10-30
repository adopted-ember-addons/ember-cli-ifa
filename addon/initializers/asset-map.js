import fetch from 'fetch';
import AssetMap from '../services/asset-map';
import { typeOf as getTypeOf } from '@ember/utils';
import getAssetMapData from 'ember-cli-ifa/utils/get-asset-map-data';

export function initialize(app) {
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
    .then(() => {
      app.advanceReadiness();
    });
  }
}

export default {
  name: 'asset-map',
  initialize
};
