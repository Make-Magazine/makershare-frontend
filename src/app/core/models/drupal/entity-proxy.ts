import { NodeEntity } from './node-entity';

export class EntityProxy {
  [key: string]: any;
  public entity: NodeEntity;

  constructor(newEntity: NodeEntity) {
    this.entity = newEntity;
    this.implementGetSet();
  }

  private implementGetSet() {
    for (let key in this.entity) {
      if (this.entity[key] instanceof Function) {
        return;
      }
      Object.defineProperty(this, key, {
        get: () => {
          return this.entity.getField(key);
        },
        set: value => {
          this.entity.setField(key, value);
        },
      });
    }
  }
}
