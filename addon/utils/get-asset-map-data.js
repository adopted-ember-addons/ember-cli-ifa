import $ from 'jquery';

export default function getAssetMapData() {
  const assetMapString = $("meta[name='ember-cli-ifa:assetMap']").attr('content');
  if (!assetMapString) {
    return;
  }

  return JSON.parse(decodeURIComponent(assetMapString));
}
