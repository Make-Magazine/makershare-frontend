import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Node } from '../..//models';
import { MainService } from '../main/main.service';

@Injectable()
export class NodeService extends MainService {
  public EntityType = 'node';

  getAllNodes(): Observable<Node> {
    return super.get();
  }

  getNode(nid: number): Observable<Node> {
    return super.get(nid);
  }

  createNode(body: Node): Observable<Node> {
    return super.post(body);
  }

  updateNode(body: Node): Observable<Node> {
    return super.put(body['nid'], body);
  }

  deleteNode(nid: number): Observable<Node> {
    return super.delete(nid);
  }

  getUrlFromId(nid: number, type: string): Observable<any> {
    const body = {
      nid: nid,
      type: type,
    };
    return super.custompost('maker_urls/get_url', body);
  }

  getIdFromUrl(url: string, type: string): Observable<any> {
    const body = {
      url: url,
      type: type,
    };
    return super.custompost('maker_urls/get_id', body);
  }
}
