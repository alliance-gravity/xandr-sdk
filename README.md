# Xandr SDK

This package implements a client to interact with several Xandr APIs

## Authentication

For authentication, the package handles the token returned by Xandr Authentication Service, meaning you only have to provide
a username and a password. The token expiration and rate limiting (HTTP 429) are also handled

## Available APIs

The current available APIs are
- apd-api
- custom-model
- line-item
- segment
- segment-billing-category