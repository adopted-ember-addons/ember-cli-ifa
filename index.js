/* jshint node: true */
'use strict';

let fs = require('fs');

module.exports = {
  name: 'ember-cli-ifa',

  isDevelopingAddon: function() {
    return false;
  },

  included: function(app) {
    this.app = app;
    this._super.included.apply(this, arguments);
  },

  postBuild: function (build) {
    let fingerprintPrepend = '/';
    let indexFilePath = build.directory + '/index.html';
    let indexFileBuffer = fs.readFileSync(indexFilePath);
    let indexFile = indexFileBuffer.toString('utf8');

    let files = fs.readdirSync(build.directory + '/assets');
    let totalFiles = files.length;

    let assetFileName = null;
    for (let i = 0; i < totalFiles; i++) {
      if (files[i].match(/^assetMap/i)) {
        assetFileName = files[i];
        break;
      }
    }

    // Prepend the URL of the assetMap with the location defined in fingerprint
    // options.
    if (this.app && this.app.options && this.app.options.fingerprint) {
      fingerprintPrepend = this.app.options.fingerprint.prepend;
    }

    let assetMapContent = 'false';
    if (assetFileName) {
      assetMapContent = `"${fingerprintPrepend + 'assets/' + assetFileName}"`;
    }
    fs.writeFileSync(
      indexFilePath,
      indexFile.replace(/__asset_map_placeholder__/, assetMapContent)
    );
  },

  contentFor(type, config) {
    if (type === 'head-footer' && config.ifa && config.ifa.enabled) {
      return '<script>var __assetMapFilename__ = __asset_map_placeholder__;</script>';
    }
  }
};
