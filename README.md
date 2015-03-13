markdown-it-responsive
===

[![Build Status](https://travis-ci.org/tatsy/markdown-it-responsive.svg)](https://travis-ci.org/tatsy/markdown-it-responsive)
[![NPM version](https://img.shields.io/npm/v/markdown-it-responsive.svg?style=flat)](https://www.npmjs.org/package/markdown-it-responsive)
[![Coverage Status](https://coveralls.io/repos/tatsy/markdown-it-responsive/badge.svg)](https://coveralls.io/r/tatsy/markdown-it-responsive)

> A markdown-it plugin for responsive images. This plugin overloads original image renderer of markdown-it.

# Usage

## Enable plugin

```js
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typography: true
}).use(require('markdown-it-responsive'), options);  // <-- this use(package_name) is required
```

## How to specify options?

The notation to specify responsive sizes is as follows.

```js
var option = { responsive: {
    'srcset': {
      'header-*': [ {
        width: 320,
        rename: {
          suffix: '-small'
        }
      }, {
        width: 640,
        rename: {
          suffix: '-medium'
        }
      } ]
    },
    'sizes': {
      'header-*': '(min-width: 36em) 33.3vw, 100vw'
    }
  }
};
```

## Example

With the options above, a markdown

```md
![test](header-test.png)
```

is rendered as

```html
<p><img src="header-test.png" srcset="header-test-small.png 320w, header-test-medium.png 640w" sizes="(min-width: 36em) 33.3vw, 100vw" alt="test"></p>
```


