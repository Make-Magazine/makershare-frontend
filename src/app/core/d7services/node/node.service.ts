import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NodeEntity } from '../../models';
import { MainService } from '../main/main.service';

@Injectable()
export class NodeService {
  private entityType = 'node';

  constructor(private mainService: MainService) {}

  getAllNodes(): Observable<NodeEntity[]> {
    return this.mainService.get(this.entityType);
  }

  getNode(nid: number): Observable<NodeEntity> {
    return this.mainService.get(this.entityType, nid);
  }

  createNode(body: NodeEntity): Observable<NodeEntity> {
    return this.mainService.post(this.entityType, body);
  }

  updateNode(body: NodeEntity): Observable<NodeEntity> {
    return this.mainService.put(this.entityType, body['nid'], body);
  }

  deleteNode(nid: number): Observable<NodeEntity> {
    return this.mainService.delete(this.entityType, nid);
  }

  getUrlFromId(nid: number, type: string): Observable<any> {
    const body = {
      nid: nid,
      type: type,
    };
    return this.mainService.custompost('maker_urls/get_url', body);
  }

  getIdFromUrl(url: string, type: string): Observable<any> {
    const body = {
      url: url,
      type: type,
    };
    return this.mainService.custompost('maker_urls/get_id', body);
  }
}
