import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService } from '../main/main.service';
import * as globals from '../globals';

@Injectable()
export class CommentService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any>{
    return this.mainService.get(globals.endpoint + '/comment').map(response => response.json()).catch(err => Observable.throw(err));
  }

  getCommentById(cid: number): Observable<any>{
    return this.mainService.get(globals.endpoint + '/comment/'+ cid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getCommentChildren(cid: number): Observable<any>{
    return this.mainService.get(globals.endpoint + '/comment?parameters[pid]=' + cid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getNodeComments(nid: number): Observable<any>{
    return this.mainService.post(globals.endpoint + '/comment?parameters[nid]=' + nid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getNodeCommentsById(nid: number): Observable<any>{
    return this.mainService.get(globals.endpoint + '/comment?nid=' + nid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getUserComments(uid: number): Observable<any>{
    return this.mainService.post(globals.endpoint + '/comment?parameters[uid]=' + uid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  createComment(comment): Observable<any>{
    return this.mainService.post(globals.endpoint + '/comment', comment).map(response => response.json()).catch(err => Observable.throw(err));
  }

  updateComment(comment): Observable<any>{
    return this.mainService.put(globals.endpoint + '/comment/' + comment.cid, comment).map(response => response.json()).catch(err => Observable.throw(err));
  }

  deleteComment(cid: number): Observable<any>{
    return this.mainService.delete(globals.endpoint + '/comment/' + cid).map(response => response.json()).catch(err => Observable.throw(err));
  }
}
