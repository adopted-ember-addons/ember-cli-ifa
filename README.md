[![Build Status](https://travis-ci.org/RuslanZavacky/ember-cli-ifa.svg?branch=master)](https://travis-ci.org/RuslanZavacky/ember-cli-ifa)
[![Code Climate](https://codeclimate.com/github/RuslanZavacky/ember-cli-ifa/badges/gpa.svg)](https://codeclimate.com/github/RuslanZavacky/ember-cli-ifa)

Ember-cli-ifa
==============================================================================

Inject fingerprinted assetMap.json file into your app and provide initializer, service, and helper to
dynamically reference fingerprinted assets.

**When to use this addon?**

1. If you have dynamic asset file names returned from API and/or you build paths based on several properties.
1. If you can't put your asset file names into css or to have path as static in your .js files.
1. If you build your image/asset paths in a dynamic way, eg.
```js
imagePath: computed(function() {
  return this.get('assetMap').resolve(`${this.get('image')}.png`);
})
```

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above

Installation
------------------------------------------------------------------------------

```bash
ember install ember-cli-ifa
```

Configuration
------------------------------------------------------------------------------

Enable addon in `environment.js` for specific environment.

```javascript
module.exports = function(environment) {
  var ENV = {
    ...
    ifa: {
      enabled: true,
      inline: false,
    }
    ...
  };
```

In case you use s3 and manifest module for ember-cli-deploy, update their configurations in `config/deploy.js`
to include `json` as a valid file.

```javascript
module.exports = function(environment) {
  var ENV = {
    ...
    s3: {
      filePattern: function(context, pluginHelper) {
        let filePattern = pluginHelper.readConfigDefault('filePattern');
        return filePattern.replace('}', ',json}');
      },
      ...
    },
    manifest: {
      filePattern: function(context, pluginHelper) {
        let filePattern = pluginHelper.readConfigDefault('filePattern');
        return filePattern.replace('}', ',json}');
      },
      ...
    },
    ...
  };
```

Configure fingerprinting in `ember-cli-build.js`. Refer to the documentation of ember-cli for [asset-compilation](https://ember-cli.com/asset-compilation#fingerprinting-and-cdn-urls)

```javascript
fingerprint: {
  enabled: true, // set to true only in required environments
  generateAssetMap: true,
  fingerprintAssetMap: true
}
```

Note that if you use fastboot, this addon is automatically forced into `inline: true` mode.
This is necessary, as otherwise fastboot could not easily access that data.

Usage
------------------------------------------------------------------------------

### asset-map helper

If `name` is `tomster-under-construction`:

```html
<img src={{asset-map (concat "assets/" name ".png")}} />
```

then it will generate something like `assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png` based on assetMap.json.

### asset-map service

```javascript
import Component from 'ember-component';
import service from 'ember-service/inject';

export default Component.extend({
  assetMap: service('asset-map'),

  key: null, // key passed as 'tomster-under-construction'

  // result will be assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png
  image: computed('key', function() {
    return this.get('assetMap').resolve(`assets/${this.get('key')}.png`);
  })
});
```

### Storing assets in a sub-directory

If `prepend` option is added in fingerprint configuration block, it will be prepended into
generated asset path in the index.html.

```javascript
// ember-cli-build.js
// ...
var app = new EmberApp(defaults, {
  fingerprint: {
    prepend: '/blog/'
  }
});
```

`/blog` will be prepended to the assetMap file path in the index.html.


### inline option

If `inline: true` is specified in the config, contents of assetMap file will be inline into index.html.

This might save one request to assetMap.json, but will increase overall size of `index.html` file, so use carefully.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
