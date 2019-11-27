import require from 'require';

export default function getAssetMapData() {
  if(typeof FastBoot !== "undefined") {
    let assetMap = require('ember-cli-ifa/fastboot-asset-map');
    return assetMap.default;
  }

  let metaTag = document.querySelector("meta[name='ember-cli-ifa:assetMap']");
  if (!metaTag) {
    console.warn('<meta name="ember-cli-ifa:assetMap"> tag is missing.');
    return;
  }

  const assetMapString = metaTag.content;
  if (assetMapString) {
    return JSON.parse(decodeURIComponent(assetMapString));
  }
}
