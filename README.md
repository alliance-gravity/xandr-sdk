# Xandr SDK

This package implements a client to interact with several Xandr APIs

## NPM publication

To publish a new version of the package, simply do
```bash
npm publish --access public
```
**Make sure to build the package & to set a correct version in the `package.json` file when publishing a new version**


# Features
## Authentication

For authentication, the package handles the token returned by Xandr Authentication Service, meaning you only have to provide
a username and a password. The token expiration and rate limiting (HTTP 429) are also handled

## Available APIs

The current available APIs are
- advertiser
- apd-api
- custom-model
- line-item
- placement
- publisher
- report
- segment
- segment-billing-category

