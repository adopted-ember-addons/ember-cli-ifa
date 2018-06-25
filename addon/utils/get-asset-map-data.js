export default function getAssetMapData() {
  const assetMapString = document.querySelector("meta[name='ember-cli-ifa:assetMap']").content;
  if (!assetMapString) {
    return;
  }

  return JSON.parse(decodeURIComponent(assetMapString));
}
