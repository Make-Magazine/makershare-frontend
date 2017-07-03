import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'EntityReferenceNoNid'})
export class EntityReferenceNoNid implements PipeTransform {
  transform(value: string): string {
    return value.replace(/[{()}]\w*/g, '');
  }
}