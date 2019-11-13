import require from 'require';

export default function getAssetMapData() {
  if(typeof FastBoot !== "undefined") {
    let assetMap = require('ember-cli-ifa/fastboot-asset-map');
    return assetMap.default;
  }

  const assetMapString = document.querySelector("meta[name='ember-cli-ifa:assetMap']").content;
  if (!assetMapString) {
    return;
  }

  return JSON.parse(decodeURIComponent(assetMapString));
}
