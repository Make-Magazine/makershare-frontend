import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import { Node } from '../../Models';

@Injectable()
export class NodeService extends MainService{
  public EntityType = 'node';

  getAllNodes(): Observable<Node>{
  	return super.get();
  }

  getNode(nid): Observable<Node>{
  	return super.get(nid);
  }

  createNode(body): Observable<Node>{
  	return super.post(body);
  }

  updateNode(body): Observable<Node>{
  	return super.put(body.nid, body);
  }

  deleteNode(nid): Observable<Node>{
  	return super.delete(nid);
  }

  getUrlFromId(nid: number, type: string): Observable<any>{
    let body = {
      nid: nid,
      type: type,
    }
    return super.custompost('maker_urls/get_url', body);
  }

  getIdFromUrl(url: string, type: string): Observable<any>{
    let body = {
      url: url,
      type: type,
    }
    return super.custompost('maker_urls/get_id',body);
  }

}
