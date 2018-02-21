'use strict';

let fs = require('fs');
let path = require('path');

module.exports = {
  name: 'ember-cli-ifa',

  isDevelopingAddon() {
    return false;
  },

  included(app) {
    this._super.included.apply(this, arguments);

    // You could overwrite the path to replace the placeholder in
    // By default, it looks for a `vendor.js` or `vendor-XXXXX.js` file
    // It looks for that file in the `/assets` folder
    let options = app.options['ember-cli-ifa'] || {};
    this._replacePathRegex = options.replacePathRegex || /^vendor(-(\w|\d)*)?\.js$/i;
  },

  treeForFastBoot: function(tree) {
    this._isFastBoot = true;
    return tree;
  },

  postBuild(build) {
    this._super.included.apply(this, arguments);

    const env = process.env.EMBER_ENV;
    const ifaConfig = this.project.config(env).ifa;

    if (!ifaConfig.enabled) {
      return;
    }

    let fingerprintPrepend = '/';

    let files = fs.readdirSync(path.join(build.directory, 'assets'));
    let totalFiles = files.length;

    let assetFileName = null;
    for (let i = 0; i < totalFiles; i++) {
      if (files[i].match(/^assetMap/i)) {
        assetFileName = files[i];
        break;
      }
    }

    let replacePathRegex = this._replacePathRegex;
    let vendorJsFileName = null;
    for (let i = 0; i < totalFiles; i++) {
      if (files[i].match(replacePathRegex)) {
        vendorJsFileName = files[i];
        break;
      }
    }

    let vendorJsFilePath = path.join(build.directory, 'assets', vendorJsFileName);
    let vendorJsFile = fs.readFileSync(vendorJsFilePath, { encoding: 'utf-8' });

    // Prepend the URL of the assetMap with the location defined in fingerprint
    // options.
    if (this.app && this.app.options && this.app.options.fingerprint) {
      fingerprintPrepend = this.app.options.fingerprint.prepend;
    }

    let assetFileNamePath = `${build.directory}/assets/${assetFileName}`;

    let assetMapPlaceholder;

    // When using fastboot, always use the inline form
    // As ajax is not so easily possible there
    if (!ifaConfig.inline && this._isFastBoot) {
      this.ui.writeLine('When running fastboot, ember-cli-ifa is forced into inline mode.');
    }
    let inline = ifaConfig.inline || this._isFastBoot;

    if (inline && fs.existsSync(assetFileNamePath)) {
      assetMapPlaceholder = fs.readFileSync(assetFileNamePath, { encoding: 'utf-8' });
      assetMapPlaceholder = JSON.stringify(JSON.parse(assetMapPlaceholder));
    } else if (assetFileName) {
      assetMapPlaceholder = `"${fingerprintPrepend}assets/${assetFileName}"`;
    }

    // When minifiying, '__asset_map_placeholder__' may be re-written into "__asset_map_placeholder__"
    // So we need to replace both variants
    fs.writeFileSync(vendorJsFilePath, vendorJsFile.replace(/('|")(__asset_map_placeholder__)('|")/, assetMapPlaceholder));
  }
};
