[![Build Status](https://travis-ci.org/RuslanZavacky/ember-cli-ifa.svg?branch=master)](https://travis-ci.org/RuslanZavacky/ember-cli-ifa)
[![Code Climate](https://codeclimate.com/github/RuslanZavacky/ember-cli-ifa/badges/gpa.svg)](https://codeclimate.com/github/RuslanZavacky/ember-cli-ifa)

# Ember-cli-ifa

Inject fingerprinted assetMap.json file into your app and provide initializer, service, and helper to
dynamically reference fingerprinted assets.

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

## Usage

### asset-map helper

If `name` is `tomster-under-construction`:
 
```
<img src={{asset-map (concat "assets/" name ".png")}} />
```

then it will generate something like `assets/tomster-under-construction-da524c8bc9283f759ae640b68db81f24.png` base on assetMap.json.

### asset-map service

```javascript
import Ember from 'ember';
import service from 'ember-service/inject';

export default Ember.Component.extend({
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

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
