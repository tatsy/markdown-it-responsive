'use strict';

var path = require('path');
var assert = require('assert');
var should = require('should');
var generate = require('markdown-it-testgen');

describe('markdown-it-responsive', function() {
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
  } };

  var md = require('markdown-it')({
    html: true,
    linkify: true,
    typography: true
  }).use(require('../lib'), option);
  generate(path.join(__dirname, 'fixtures/markdown-it-responsive/responsive.txt'), md);
});

describe('Invalid operations', function() {
  it('No option', function() {
    (function() {
      var md = require('markdown-it')({
        html: true,
        linkify: true,
        typography: true
      }).use(require('../lib'));
    }).should.throw();
  });

  it('No responsive field', function() {
    (function() {
      var md = require('markdown-it')({
        html: true,
        linkify: true,
        typography: true
      }).use(require('../lib', { autofill: true }));
    }).should.throw();
  });
});

describe('Wildcard to RegExp converter', function() {
  var wc2reg = require('../lib/wildcardToRegex.js');

  it('Convert start (*)', function() {
    assert.deepEqual(wc2reg('test-*.png'), /test\-([\s\S]+?)\.png/);
  });

  it('Convert question mark (?)', function() {
    assert.deepEqual(wc2reg('test-??.png'), /test\-(.)(.)\.png/);
  });
});
