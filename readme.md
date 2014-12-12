# package-yml

This is an attempt to work off of [`npm-yaml`](https://github.com/saschagehlich/npm-yaml). In an effort to use `yml` instead of `json` for npm's package file.

## Important!

**This will delete your existing `.json` file.  Use at your own risk!**

Check the source code, help me make it the best it could be.

## Install

```
npm install package-yml --global && npm config set onload-script package-yml
```
## Why

It's easier to read and write `yml` over `json`.

## How

Every time you run an `npm` command `package-yml` will check for a `yml` file. If one exists it will update the existing `json` file with the contents. When the `npm` process exists the contents from the `json` will update the `yml` file. **It will delete your `json` file when it saves the data to the `yml` file.**
