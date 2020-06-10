# Changelog

## v0.10.0 (2020-06-10)

#### :boom: Breaking Change
* Update minimum supported Node.js version to 10

#### :bug: Bug Fix
* [#176](https://github.com/adopted-ember-addons/ember-cli-ifa/pull/176) Fix error - Inject empty meta tag when addon not enabled ([@mansona](https://github.com/mansona))

#### :house: Internal
* [#101](https://github.com/adopted-ember-addons/ember-cli-ifa/pull/101) Simplify `assetMapString` condition ([@Turbo87](https://github.com/Turbo87))
* [#177](https://github.com/adopted-ember-addons/ember-cli-ifa/pull/177) Update using ember-cli-update ([@mansona](https://github.com/mansona))

#### Committers: 3
- Chris Manson ([@mansona](https://github.com/mansona))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))
- abhilashlr ([@abhilashlr](https://github.com/abhilashlr))

## v0.9.0 (2019-11-27)

#### :boom: Breaking Change
* [#81](https://github.com/adopted-ember-addons/ember-cli-ifa/pull/81) Drop support for Node 6 ([@Turbo87](https://github.com/Turbo87))

#### :rocket: Enhancement
* [#100](https://github.com/adopted-ember-addons/ember-cli-ifa/pull/100) Show warning for missing `<meta>` tag ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#99](https://github.com/adopted-ember-addons/ember-cli-ifa/pull/99) README: Fix spelling mistake ([@Alonski](https://github.com/Alonski))

#### :house: Internal
* [#80](https://github.com/adopted-ember-addons/ember-cli-ifa/pull/80) Remove unused dependencies ([@Turbo87](https://github.com/Turbo87))
* [#79](https://github.com/adopted-ember-addons/ember-cli-ifa/pull/79) Adjust `.npmignore` file ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Alon Bukai ([@Alonski](https://github.com/Alonski))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.8.1 (2019-11-14)

#### :bug: Bug Fix
* [#57](https://github.com/RuslanZavacky/ember-cli-ifa/pull/57) Fix FastBoot support ([@mansona](https://github.com/mansona))

#### :house: Internal
* [#73](https://github.com/RuslanZavacky/ember-cli-ifa/pull/73) Modernise and fix fastboot tests ([@Turbo87](https://github.com/Turbo87))
* [#68](https://github.com/RuslanZavacky/ember-cli-ifa/pull/68) Simplify acceptance test ([@Turbo87](https://github.com/Turbo87))
* [#65](https://github.com/RuslanZavacky/ember-cli-ifa/pull/65) Use prettier to format JS code ([@Turbo87](https://github.com/Turbo87))
* [#64](https://github.com/RuslanZavacky/ember-cli-ifa/pull/64) Add dependabot config file ([@Turbo87](https://github.com/Turbo87))
* [#58](https://github.com/RuslanZavacky/ember-cli-ifa/pull/58) Replace `ember-cli-eslint` with regular ESLint ([@Turbo87](https://github.com/Turbo87))
* [#55](https://github.com/RuslanZavacky/ember-cli-ifa/pull/55) Update `.npmignore` file ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Chris Manson ([@mansona](https://github.com/mansona))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


## v0.8.0 (2019-10-23)

#### :boom: Breaking Change
* Update minimum supported Node.js version to 10

#### :rocket: Enhancement
* [#40](https://github.com/RuslanZavacky/ember-cli-ifa/pull/40) Use HTML meta to store asset map information ([@krallin](https://github.com/krallin))
* [#41](https://github.com/RuslanZavacky/ember-cli-ifa/pull/41) Passthrough fingerprinted paths ([@krallin](https://github.com/krallin))
* [#43](https://github.com/RuslanZavacky/ember-cli-ifa/pull/43) Remove jQuery ([@NullVoxPopuli](https://github.com/NullVoxPopuli))

#### :bug: Bug Fix
* [#54](https://github.com/RuslanZavacky/ember-cli-ifa/pull/54) Ensure that we don't write `undefined` into the `<meta>` element value ([@Turbo87](https://github.com/Turbo87))
* [#51](https://github.com/RuslanZavacky/ember-cli-ifa/pull/51) Fall back to name in resolve ([@mydea](https://github.com/mydea))
* [#53](https://github.com/RuslanZavacky/ember-cli-ifa/pull/53) Fix broken `test/index.html` mutation ([@Turbo87](https://github.com/Turbo87))
* [#42](https://github.com/RuslanZavacky/ember-cli-ifa/pull/42) Catch errors if asset-map fails to load ([@headquarters](https://github.com/headquarters))

#### Committers: 5
- Francesco Novy ([@mydea](https://github.com/mydea))
- L. Preston Sego III ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
- Michael Head ([@headquarters](https://github.com/headquarters))
- Thomas Orozco ([@krallin](https://github.com/krallin))
- Tobias Bieniek ([@Turbo87](https://github.com/Turbo87))


# 0.7.0 
- [ENHANCEMENT] Upgrade to Ember 3.0 (@mydea)
- [ENHANCEMENT] Tests passing (@mydea)

# 0.6.1 
- [FIX] If ifa:placeholder meta tag is missing, do not fail with error

# 0.6.0 
- [ENHANCEMENT] Add is enabled by default
- [ENHANCEMENT] Use meta tag to pass asset file name into the asset-map service to avoid CSP issue with script tag.

# 0.5.2 
- [BUG FIX] Add missing .class in lookupFactory
- [ENHANCEMENT] Safer deployment configuration override

# 0.5.1
- [ENHANCEMENT] Fix deprecation for lookupFactory

# 0.5.0
- [ENHANCEMENT] Ability to include asset map contents at build time (@simonihmig)

# 0.4.0
- [ENHANCEMENT] If there is no asset map file, set variable (__assetMapFilename__) to null (@andreasschacht)
- [BUG FIX] Replace __asset_map_placeholder__ in tests/index.html as well (@trek)

# 0.3.0
- [ENHANCEMENT] Updating ember-cli version to 2.9.1
- [ENHANCEMENT] Addon is disabled by default
- [INTERNAL] Disable Fastboot tests

# 0.2.0
- [FEATURE] Support running application in a sub-directory (@drewtempelmeyer)

# 0.1.0
- [NOOP] Initial release
