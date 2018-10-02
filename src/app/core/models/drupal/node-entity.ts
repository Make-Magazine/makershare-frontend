import { Singleton, FieldsFactory } from '../../';

export abstract class NodeEntity {
  title: string;
  status: number;
  promote: number;
  sticky: number;
  type: string;
  comment: number;

  name?: string;
  picture?: number;
  nid?: number;
  vid?: number;
  language?: string = Singleton.Settings.language;
  uid?: number;
  created?: number;
  changed?: number;
  tnid?: number;
  translate?: number;
  uuid?: string;
  uri?: string;
  log?: number;
  vuuid?: string;
  revision_timestamp?: number;
  revision_uid?: number;
  cid?: number;
  last_comment_timestamp?: number;
  last_comment_name?: undefined | string;
  last_comment_uid?: number;
  comment_count?: number;

  protected fieldsFactory: FieldsFactory;

  constructor() {
    this.fieldsFactory = new FieldsFactory();
  }

  protected initFields(node_type: string): void {
    this.title = '';
    this.status = null;
    this.promote = null;
    this.sticky = null;
    this.comment = 2;
    this.type = node_type;
  }

  setField(field_name: string, value: any): void {
    this[field_name] = value;
  }

  getField(field_name: string): any {
    return this[field_name];
  }

  implementSetGet(){
    for (let key in this) {
      if(typeof(this[key]) != ('string'||'number')) {
        return;
      }
      Object.defineProperty(this, key, {
        get: () => { console.log(key);return this[key]; },
        set: (value: string|number) => {
          console.log("test");
          this[key] = value;
        },
      });
    }
  }

  abstract updateField(field_name: string, value: any);

}
