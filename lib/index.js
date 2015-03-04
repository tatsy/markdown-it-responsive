'use strict';

function analyze_options(option) {
  var i;

  // analyze srcset
  var patterns = [];
  for (i = 0; i < option['srcset'].length; i++) {
    
  }
}

function responsive_image(md, options) {
  var resp = analyze_options(options['responsive']);
  return function(tokens, idx, options, env, self) {
    var src = ' src="' + md.utils.escapeHtml(tokens[idx].src) + '"';
    var title = '';
    if (tokens[idx].title) {
      title = ' title="' + md.utils.escapeHtml(md.utils.replaceEntities(tokens[idx].title)) + '"';
    }
    var alt = ' alt="' + self.renderInlineAsText(tokens[idx].tokens, options, env) + '"';
    var suffix = options.xhtmlOut ? ' /' : '';
    return '<img' + src + alt + title + suffix + '>';
  };
}

module.exports = function responsive_plugin(md, options) {
  if (options === undefined || options['responsive'] === undefined) {
    throw Exception('markdown-it-responsive needs options');
  }
  md.renderer.rules.image = responsive_image(md, options);
}
