/* jshint node: true */
'use strict';

let fs = require('fs');

module.exports = {
  name: 'ember-cli-ifa',

  isDevelopingAddon() {
    return false;
  },

  postBuild(build) {
    this._super.included.apply(this, arguments);

    const env  = process.env.EMBER_ENV;
    const ifaConfig = this.project.config(env).ifa;

    if (!ifaConfig.enabled) {
      return;
    }

    let fingerprintPrepend = '/';
    let indexFilePath = build.directory + '/index.html';
    let testIndexFilePath = build.directory + '/tests/index.html';

    let indexFile = fs.readFileSync(indexFilePath, {encoding: 'utf-8'});

    let testIndexFile;
    if (fs.existsSync(testIndexFilePath)) {
      testIndexFile = fs.readFileSync(testIndexFilePath, {encoding: 'utf-8'});
    }

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

    let assetFileNamePath = `${build.directory}/assets/${assetFileName}`;

    let assetMapPlaceholder;

    if (ifaConfig.inline && fs.existsSync(assetFileNamePath)) {
      assetMapPlaceholder = fs.readFileSync(assetFileNamePath, {encoding: 'utf-8'});
    } else {
      if (assetFileName) {
        assetMapPlaceholder = encodeURIComponent(`${fingerprintPrepend}assets/${assetFileName}`);
      }
    }

    fs.writeFileSync(indexFilePath, indexFile.replace(/__asset_map_placeholder__/, assetMapPlaceholder));

    if (testIndexFile) {
      fs.writeFileSync(testIndexFilePath, testIndexFile.replace(/__asset_map_placeholder__/, assetMapPlaceholder));
    }
  },

  contentFor(type, config) {
    if (type === 'head' && config.ifa && config.ifa.enabled && !config.ifa.inline) {
      return '<meta property="ifa:placeholder" content="__asset_map_placeholder__">';
    } else if (type === 'head-footer' && config.ifa && config.ifa.enabled && config.ifa.inline) {
      return '<script>var __assetMapPlaceholder__ = __asset_map_placeholder__;</script>';
    }
  }
};
