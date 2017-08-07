import { NodeService } from '../../../d7services/node/node.service';
import { Singleton } from '../../../classes/Application/Singleton';

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
  last_comment_name?: undefined|string;
  last_comment_uid?: number;
  comment_count?: number;

  public nodeService: NodeService;

  constructor(newNodeService: NodeService) {
    this.nodeService = newNodeService;
  }

  public setField(field_name: string, value: number|string): void {
    this[field_name] = value;
  }

  public getField(field_name: string): string|number {
    return this[field_name];
  }

  protected Init(node_type: string): void {
    this.title = '';
    this.status = null;
    this.promote = null;
    this.sticky = null;
    this.comment = 2;
    this.type = node_type;
  }

}
