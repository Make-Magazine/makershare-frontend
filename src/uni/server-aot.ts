import './polyfills';
import { enableProdMode } from '@angular/core';
import { AppServerModuleNgFactory } from '../../aot/src/uni/app.server.ngfactory';
import * as express from 'express';
import { ngUniversalEngine } from './universal-engine';
import { join } from 'path';
import { ɵServerRendererFactory2 } from '@angular/platform-server';
var path = require('path');

enableProdMode();
const createRenderer = ɵServerRendererFactory2.prototype.createRenderer;

ɵServerRendererFactory2.prototype.createRenderer = function () {
  const result = createRenderer.apply(this, arguments);

  const setProperty = result.setProperty;

  result.setProperty = function () {
    try {
      setProperty.apply(this, arguments);
    } catch (e) {
      if (e.message.indexOf('Found the synthetic') === -1) {
        throw e;
      }
    }
  };

  return result;
}
const server = express();
// set our angular engine as the handler for html files, so it will be used to render them.
server.engine('html', ngUniversalEngine({
    bootstrap: [AppServerModuleNgFactory]
}));
// set default view directory
server.set('views', 'src');
// handle requests for routes in the app.  ngExpressEngine does the rendering.
server.get(['/'], (req, res) => {
    res.render('index-aot.html', {req});
});
// handle requests for static files
server.get(['/*.js','/*.css'], (req, res, next) => {
    let fileName: string = req.originalUrl;
    // console.log(fileName);
    let root = fileName.startsWith('/node_modules/') ? '.' : 'src';
    res.sendFile(fileName, { root: root }, function (err) {
        if (err) {
            next(err);
        }
    });
});
server.get(['/assets/*'], (req, res, next) => {
    let fileName: string = req.originalUrl;
    res.sendFile(fileName, { root: 'src' }, function (err) {
        if (err) {
            next(err);
        }
    });
});

// start the server
server.listen(4200, () => {
    console.log('listening on port 4200...');
});