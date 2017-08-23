// import {join, resolve} from 'path';

const path = require('path');

export const dist = path.resolve(path.join(__dirname, '..', '..', 'dist'));

export const index = path.resolve(path.join(dist, 'index.html'));