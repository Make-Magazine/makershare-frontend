import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MainService } from '../main/main.service';

@Injectable()
export class CommentService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any>{
    return this.mainService.get('comment');
  }

  getCommentById(cid: number): Observable<any>{
    return this.mainService.get('comment/'+ cid);
  }

  getCommentChildren(cid: number): Observable<any>{
    return this.mainService.get('comment?parameters[pid]=' + cid);
  }

  getNodeComments(nid: number): Observable<any>{
    return this.mainService.custompost('comment?parameters[nid]=' + nid);
  }

  getNodeCommentsById(nid: number): Observable<any>{
    return this.mainService.get('comment?nid=' + nid);
  }

  getUserComments(uid: number): Observable<any>{
    return this.mainService.custompost('comment?parameters[uid]=' + uid);
  }

  createComment(comment): Observable<any>{
    return this.mainService.custompost('comment', comment);
  }

  updateComment(comment): Observable<any>{
    return this.mainService.put('comment/' + comment.cid, comment);
  }

  deleteComment(cid: number): Observable<any>{
    return this.mainService.delete('comment/' + cid);
  }
}
