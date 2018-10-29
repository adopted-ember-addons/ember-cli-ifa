'use strict';

const fs = require('fs');
const path = require('path');

const MetaPlaceholder = '__ember-cli-ifa__AssetMapPlaceholder__';

function replacePlaceholder(filePath, assetMap) {
  const assetMapString = encodeURIComponent(JSON.stringify(assetMap));
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
    return tree;
  },

  contentFor(type) {
    if (type !== 'head') {
      return;
    }

    return `<meta name="ember-cli-ifa:assetMap" content="${MetaPlaceholder}">`;
  },

  postBuild(build) {
    this._super.included.apply(this, arguments);

    const env = process.env.EMBER_ENV;
    const ifaConfig = this.project.config(env).ifa;

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
      assetMap = JSON.parse(fs.readFileSync(assetFileNamePath, { encoding: 'utf-8' }));
    } else if (assetFileName) {
      assetMap = `${fingerprintPrepend}assets/${assetFileName}`;
    }

    let filePath = path.join(build.directory, 'index.html');
    replacePlaceholder(filePath, assetMap);
    filePath = path.join(build.directory, 'tests/index.html');  // May not exist, eg prod build
    if(fs.existsSync(filePath)) {
      replacePlaceholder(filePath, assetMap);
    }
  }
};
