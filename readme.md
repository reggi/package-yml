# package-yml

This is an attempt to work off of [`npm-yaml`](https://github.com/saschagehlich/npm-yaml). In an effort to use `yml` instead of `json` for npm's package file.

## Install

```
npm install package-yml --global && npm set config onload-script package-yml
```
## Why

It's easier to read and write `yml` over `json`.

## How

Every time you run an `npm` command `package-yml` will check for a `yml` file. If one exists it will update the existing `json` file with the contents. When the `npm` process exists the contents from the `json` will update the `yml` file.
