import RSVP from 'rsvp';
import AssetMap from '../services/asset-map';
import { typeOf as getTypeOf } from '@ember/utils';
import getAssetMapData from 'ember-cli-ifa/utils/get-asset-map-data';

export function initialize(app) {
  let assetMapFile = getAssetMapData();

  // This is split out like this, in order to prevent this from being accidentally replaced
  let replacementPath = ['__', 'asset_map_placeholder', '__'].join('');

  if (!assetMapFile || assetMapFile === replacementPath) {
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
    }).then(() => {
      app.register('service:asset-map', AssetMap);
      app.advanceReadiness();
    });
  }
}

export default {
  name: 'asset-map',
  initialize
};
