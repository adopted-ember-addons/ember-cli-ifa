import { get } from '@ember/object';
import fetch from 'fetch';
import AssetMap from '../services/asset-map';

export function initialize(applicationInstance) {
  let fastboot = applicationInstance.lookup('service:fastboot');

  if (!fastboot || !get(fastboot, 'isFastBoot')) {
    return;
  }

  let path = FastBoot.require('path');
  let fs = FastBoot.require('fs');

  console.log('Hello from the instance initializer!', get(fastboot, 'isFastBoot'));

  fastboot.deferRendering(new Promise((resolve) => {
    fs.readdir('dist/assets/', (err, files) => {
      console.log(err);

      let assetFileName;
      for (let i in files) {
        if (/^assetMap/i.test(files[i])) {
          assetFileName = files[i];
          break;
        }
      }

      fetch(`http://localhost:4200/assets/${assetFileName}`)
        .then((result) => result.json())
        .then((map) => {
          AssetMap.reopen({
            map: map.assets,
            prepend: map.prepend,
            enabled: true
          });
        console.log('result', map);
        resolve();
      });

    });
  }));
}

export default {
  initialize,
};