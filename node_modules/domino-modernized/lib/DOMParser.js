"use strict";

/* jshint browser: true */

// This implementation only makes sense in the context of angular-ssr!

function DOMParser() {}

DOMParser.prototype.parseFromString = function(markup, mimeType) {
  var element = document.createElement('template');
  element.innerHTML = markup;
  return {documentElement: element.content.childNodes[0]};
};

module.exports = DOMParser;
