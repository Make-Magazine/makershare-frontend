import { APP_BASE_HREF } from '@angular/common';
/// <reference types="node" />
import { NgModule, NgModuleFactory, NgModuleFactoryLoader } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule, AppComponent } from '../app/app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export class ServerFactoryLoader extends NgModuleFactoryLoader {
  load(path: string): Promise<NgModuleFactory<any>> {
    return new Promise((resolve, reject) => {
      const [file, className] = path.split('#');
      const classes = require('../../aot/src/uni' + file.slice(1) + '.ngfactory');
      resolve(classes[className + 'NgFactory']);
    });
  }
}

@NgModule({
  imports: [
    ServerModule,
    NoopAnimationsModule,
    AppModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: NgModuleFactoryLoader, useClass: ServerFactoryLoader },
    {provide: APP_BASE_HREF, useValue: '/'}
  ]
})
export class AppServerModule { }
