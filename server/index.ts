import express = require('express');

import {applicationBuilderFromModule} from 'angular-ssr';

import {enableProdMode} from '@angular/core';

import {RootModule} from '../app/root.module';
import {absoluteUri, configure, listen} from './http';
import {index} from './paths';

enableProdMode();

const builder = applicationBuilderFromModule(RootModule, index);

builder.preboot({appRoot: 'application'});
// builder.stabilizeTimeout(20000);
const application = builder.build();

const http = express();

configure(http);

http.get(/.*/, async (request, response) => {
  try {
    const snapshot = await application.renderUri(absoluteUri(request));

    response.send(snapshot.renderedDocument);
  }
  catch (exception) {
    console.error('Rendering exception', exception);

    response.send(builder.templateDocument()); // fall back on client document
  }
});

listen(http).then(port => console.log(`Load http://localhost:${port}`));
