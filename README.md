[![Build Status](https://travis-ci.org/RuslanZavacky/ember-cli-ifa.svg?branch=master)](https://travis-ci.org/RuslanZavacky/ember-cli-ifa)
[![Code Climate](https://codeclimate.com/github/RuslanZavacky/ember-cli-ifa/badges/gpa.svg)](https://codeclimate.com/github/RuslanZavacky/ember-cli-ifa)

# Ember-cli-ifa

Inject fingerprinted assetMap.json file into your app and provide initializer, service, and helper to
dynamically reference fingerprinted assets.

## Installation

```bash
ember install ember-cli-ifa
```

## Configuration

Enable addon in `environment.js` for specific environment.

```javascript
module.exports = function(environment) {
  var ENV = {
    ...
    ifa: {
      enabled: true
    }
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

## Usage

### asset-map helper

If `name` is `tomster-under-construction`:
 
```html
<img src={{asset-map (concat "assets/" name ".png")}} />
```

then it will generate something like `assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png` base on assetMap.json.

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
