[![Build Status](https://travis-ci.org/RuslanZavacky/ember-cli-ifa.svg?branch=master)](https://travis-ci.org/RuslanZavacky/ember-cli-ifa)
[![Code Climate](https://codeclimate.com/github/RuslanZavacky/ember-cli-ifa/badges/gpa.svg)](https://codeclimate.com/github/RuslanZavacky/ember-cli-ifa)

# Ember-cli-ifa

Inject fingerprinted assetMap.json file into your code and provide initializer, service, and helper to
dynamically reference fingerprinted assets.

## Configuration

Enable addon in `environment.js` for specific environment.

```
ifa: {
  enabled: true
}
```

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
