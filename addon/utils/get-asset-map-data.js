export default function getAssetMapData() {
  const assetMapString = document.querySelector("meta[name='ember-cli-ifa:assetMap']").content;
  if (!assetMapString || assetMapString === 'undefined') {
    return;
  }

  return JSON.parse(decodeURIComponent(assetMapString));
}
