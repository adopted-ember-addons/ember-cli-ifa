import fetch from 'fetch';
import AssetMap from '../services/asset-map';

export function initialize(app) {
  console.log('hello from initializer');

  // const config = app.resolveRegistration('config:environment');

  // let config = { ifa: { inline: false } };

  // let assetMapFile;

  // console.log('config.ifa.inline', config.ifa.inline);

  // if (!config.ifa.inline) {
  //   // + fastboot
  //   let ifaPlaceholder = document.querySelector('[property="ifa:placeholder"]');

  //   if (ifaPlaceholder) {
  //     assetMapFile = decodeURIComponent(ifaPlaceholder.getAttribute('content'));
  //   }
  // } else {
  //   assetMapFile = window && window.__assetMapPlaceholder__;

  //   console.log("window?", window);
  //   console.log("HERE?", assetMapFile);
  // }

  // console.log('assetMapFile', assetMapFile);

  // if (!assetMapFile) {
  //   app.register('service:asset-map', AssetMap);
  //   return;
  // }


  // if (config.ifa.inline) {
  //   AssetMap.reopen({
  //     map: assetMapFile.assets,
  //     prepend: assetMapFile.prepend,
  //     enabled: true
  //   });
  //   app.register('service:asset-map', AssetMap);
  // } else {
  //   app.deferReadiness();

  //   fetch(assetMapFile)
  //     .then((map = {}) => {
  //       AssetMap.reopen({
  //         map: map.assets,
  //         prepend: map.prepend,
  //         enabled: true
  //       });
  //     })
  //     .then(() => {
  //       app.register('service:asset-map', AssetMap);
  //       app.advanceReadiness();
  //   });
  // }
}

export default {
  name: 'asset-map',
  initialize
};
