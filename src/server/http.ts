import cookieParser = require('cookie-parser');
import express = require('express');
import url = require('url');
import { dist, index } from 'server/paths';

export const configure = (http: express.Application): void => {
  http.use(express.static(dist, { index }));

  http.use(require('express-blank-favicon'));

  http.use(cookieParser());
};

export const listen = (http: express.Application): Promise<number> => {
  const port: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 4200;

  return new Promise<number>((resolve, reject) => {
    http.listen(port, err => {
      if (err) {
        reject(err);
      } else {
        resolve(port);
      }
    });
  });
};

export const absoluteUri = (request: express.Request): string => {
  return url.format({
    protocol: request.protocol,
    host: request.get('host'),
    pathname: request.originalUrl,
  });
};
