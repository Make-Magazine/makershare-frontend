import { Pipe } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReverseArray {
  transform(value) {
    return value.slice().reverse();
  }
}