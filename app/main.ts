import './polyfills';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {RootModule} from './root.module';
enableProdMode();
platformBrowserDynamic().bootstrapModule(RootModule);
