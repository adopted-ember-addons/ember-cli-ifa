/* global window, __assetMapFilename__ */
import RSVP from 'rsvp';
import $ from 'jquery';
import AssetMap from '../services/asset-map';

export function initialize(app) {
  app.deferReadiness();

  let assetMapFile = window && window.__assetMapFilename__;

  if (!assetMapFile) {
    app.register('service:asset-map', AssetMap);
    app.advanceReadiness();
    return;
  }

  const promise = new RSVP.Promise((resolve, reject) => {
    $.getJSON(assetMapFile, resolve).fail(reject);
  });

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

export default {
  name: 'asset-map',
  initialize: initialize
};
