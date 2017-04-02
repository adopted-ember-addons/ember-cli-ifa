/* jshint node: true */
'use strict';

let fs = require('fs');

const findRoot = (current) => {
  let app;

  // Keep iterating upward until we don't have a grandparent.
  // Has to do this grandparent check because at some point we hit the project.
  do {
    app = current.app || app;
  } while (current.parent && current.parent.parent && (current = current.parent));

  return app;
};

module.exports = {
  name: 'ember-cli-ifa',

  isDevelopingAddon() {
    return false;
  },

  included(app) {
    this.app = findRoot(this);
    this._super.included.apply(this, arguments);
  },

  postBuild(build) {
    this._super.included.apply(this, arguments);

    const env  = process.env.EMBER_ENV;
    const ifaConfig = this.app.project.config(env).ifa;

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
        assetMapPlaceholder = `"${fingerprintPrepend}assets/${assetFileName}"`;
      }
    }

    fs.writeFileSync(indexFilePath, indexFile.replace(/__asset_map_placeholder__/, assetMapPlaceholder));

    if (testIndexFile) {
      fs.writeFileSync(testIndexFilePath, testIndexFile.replace(/__asset_map_placeholder__/, assetMapPlaceholder));
    }
  },

  contentFor(type, config) {
    if (type === 'head-footer' && config.ifa && config.ifa.enabled) {
      return '<script>var __assetMapPlaceholder__ = __asset_map_placeholder__;</script>';
    }
  }
};
