import { NgModule }      from '@angular/core';
import { SortOrder }          from './sort-order';
import {EntityReferenceNoNid} from './EntityReferenceWithoutNid'

 @NgModule({
     imports:        [],
     declarations:   [SortOrder,EntityReferenceNoNid],
     exports:        [SortOrder,EntityReferenceNoNid],
 })

 export class PipeModule {

   static forRoot() {
      return {
          ngModule: PipeModule,
          providers: [],
      };
   }
 } 