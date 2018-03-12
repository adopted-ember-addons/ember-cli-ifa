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
