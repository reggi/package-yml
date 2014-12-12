# package-yml

This is an attempt to work off of [`npm-yaml`](https://github.com/saschagehlich/npm-yaml). In an effort to use `yml` instead of `json` for npm's package file.

## Important!

**This will delete your existing `.json` file.  Use at your own risk!**

Check the source code, help me make it the best it could be.

## Install

```bash
npm install package-yml --global
npm config set onload-script package-yml
npm build
```

or 

```bash
npm install package-yml --global && npm config set onload-script package-yml && npm build
```

## Why

It's easier to read and write `yml` over `json`.

## How

Every time you run an `npm` command `package-yml` will check for a `yml` file. If one exists it will update the existing `json` file with the contents. When the `npm` process exists the contents from the `json` will update the `yml` file. **It will delete your `json` file when it saves the data to the `yml` file.**

---

Copyright (c) 2014 Thomas Reggi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
