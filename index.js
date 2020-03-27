'use strict';

const fs = require('fs');
const path = require('path');

const MetaPlaceholder = '__ember-cli-ifa__AssetMapPlaceholder__';

function replacePlaceholder(filePath, assetMap) {
  const assetMapString = assetMap ? encodeURIComponent(JSON.stringify(assetMap)) : '';
  const fileBody = fs.readFileSync(filePath, { encoding: 'utf-8' });
  fs.writeFileSync(filePath, fileBody.replace(MetaPlaceholder, assetMapString));
}

module.exports = {
  name: 'ember-cli-ifa',

  isDevelopingAddon() {
    return false;
  },

  treeForFastBoot(tree) {
    this._isFastBoot = true;

    if (this.project !== this.parent) {
      this.ui.writeLine(
        'ember-cli-ifa currently only supports being a top-level dependency! If you are seeing this message please open an issue on https://github.com/RuslanZavacky/ember-cli-ifa/issues'
      );
    }

    return tree;
  },

  contentFor(type) {
    if (type !== 'head') {
      return;
    }

    if (!this._config().enabled) {
      return '<meta name="ember-cli-ifa:assetMap">';
    }

    return `<meta name="ember-cli-ifa:assetMap" content="${MetaPlaceholder}">`;
  },

  /**
   * By default, during runtime, the asset-map service reads the asset map
   * information from a meta tag on the index.html. As we do not have access to
   * global `document` when running in fastboot, we need to implement a
   * different way to access this asset-map information. See
   * `get-asset-map-data` where we require the `asset-map` module that is
   * generated in the postBuild() below.
   */
  updateFastBootManifest(manifest) {
    manifest.vendorFiles.push('assets/assetMap.js');

    return manifest;
  },

  postBuild(build) {
    this._super.included.apply(this, arguments);

    const ifaConfig = this._config();

    if (!ifaConfig.enabled) {
      return;
    }

    let fingerprintPrepend = '/';

    const files = fs.readdirSync(path.join(build.directory, 'assets'));
    const totalFiles = files.length;

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

    const assetFileNamePath = `${build.directory}/assets/${assetFileName}`;

    // When using fastboot, always use the inline form
    // As ajax is not so easily possible there
    if (!ifaConfig.inline && this._isFastBoot) {
      this.ui.writeLine('When running fastboot, ember-cli-ifa is forced into inline mode.');
    }
    const inline = ifaConfig.inline || this._isFastBoot;

    let assetMap;
    if (inline && fs.existsSync(assetFileNamePath)) {
      let assetMapContent = fs.readFileSync(assetFileNamePath, { encoding: 'utf-8' });
      assetMap = JSON.parse(assetMapContent);

      if (this._isFastBoot) {
        const assetModulePath = assetFileNamePath.replace(/\.json$/, '.js');

        fs.writeFileSync(
          assetModulePath,
          `define('ember-cli-ifa/fastboot-asset-map', [], function () {
          return {
            'default': ${assetMapContent},
            __esModule: true,
          };
        });`
        );
      }
    } else if (assetFileName) {
      assetMap = `${fingerprintPrepend}assets/${assetFileName}`;
    }

    replacePlaceholder(path.join(build.directory, 'index.html'), assetMap);

    let testIndexPath = path.join(build.directory, 'tests/index.html');
    if (fs.existsSync(testIndexPath)) {
      replacePlaceholder(testIndexPath, assetMap);
    }
  },

  _config() {
    const env = process.env.EMBER_ENV;
    return this.project.config(env).ifa;
  },
};
