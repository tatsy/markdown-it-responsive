'use strict';

var path = require('path');
var wild2regex = require('../lib/wildcardToRegex.js');

function analyze_options(option) {
  var i;
  var srcset, sizes, keys, reg;
  var temp = {};
  var ret = [];

  srcset = Object.keys(option.srcset);
  for (i = 0; i < srcset.length; i++) {
    reg = wild2regex(srcset[i]);
    temp[srcset[i]] = {};
    temp[srcset[i]].regex = reg;
    temp[srcset[i]].rules = option.srcset[srcset[i]];
  }

  sizes = Object.keys(option.sizes);
  for (i = 0; i < sizes.length; i++) {
    // check if the same key is contained in 'srcset'
    if (temp[sizes[i]]) {
      temp[sizes[i]].sizes = option.sizes[sizes[i]];
    }
  }

  keys = Object.keys(temp);
  for (i = 0; i < keys.length; i++) {
    ret.push(temp[keys[i]]);
  }

  return ret;
}

// Return first pattern to match.
// If not, return -1
function matchPattern(src, patterns) {
  var i;
  for (i = 0; i < patterns.length; i++) {
    if (patterns[i].regex.exec(src)) {
      return i;
    }
  }
  return -1;
}

function renderResponsive(md, tokens, idx, opt, env, self, options) {
  var token = tokens[idx];
  var patterns = analyze_options(options.responsive);
  // normal fields
  var filename = md.utils.escapeHtml(token.attrs[token.attrIndex('src')][1]);
  token.attrs[token.attrIndex('alt')][1] = self.renderInlineAsText(token.children, opt, env);
  var suffix = options.responsive.xhtmlOut ? ' /' : '';

  // responsive fields
  var i, patternId;
  var base, ext, rules, isFirst;
  var srcset = '';
  var sizes = '';
  if ((patternId = matchPattern(filename, patterns)) >= 0) {
    if (options.responsive.removeSrc) {
      token.attrs.splice(token.attrIndex('src'), 1);
    }
    if (patterns[patternId].sizes) {
      token.attrs.unshift(['sizes', patterns[patternId].sizes]);
    }

    rules = patterns[patternId].rules;
    ext = path.extname(filename);
    base = path.basename(filename, ext);
    isFirst = true;

    for (i = 0; i < rules.length; i++) {
      if (!isFirst) { srcset += ', '; }
      if (rules[i].rename && rules[i].rename.prefix) {
        srcset += rules[i].rename.prefix;
      }
      srcset += base;
      if (rules[i].rename && rules[i].rename.suffix) {
        srcset += rules[i].rename.suffix;
      }
      srcset += ext + ' ';
      if (rules[i].width) { srcset += rules[i].width + 'w'; }
      if (rules[i].height) { srcset += rules[i].height + 'h'; }
      isFirst = false;
    }
    token.attrs.unshift(['srcset', srcset]);
  }

  return self.renderToken(tokens, idx, opt);
}

function responsive_image(md, options) {
  return function(tokens, idx, opt, env, self) {
    return renderResponsive(md, tokens, idx, opt, env, self, options);
  };
}

module.exports = function responsive_plugin(md, options) {
  if (!options || !options.responsive) {
    throw new Error('markdown-it-responsive needs options');
  }
  md.renderer.rules.image = responsive_image(md, options);
};
