import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { MainService} from '../main/main.service';

@Injectable()
export class CommentService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any>{
    return this.mainService.get('/api/comment').map(response => response.json()).catch(err => Observable.throw(err));
  }

  getCommentById(cid: number): Observable<any>{
    return this.mainService.get('/api/comment/'+ cid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getCommentChildren(cid: number): Observable<any>{
    return this.mainService.get('/api/comment?parameters[pid]=' + cid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getNodeComments(nid: number): Observable<any>{
    return this.mainService.post('/api/comment?parameters[nid]=' + nid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  getUserComments(uid: number): Observable<any>{
    return this.mainService.post('/api/comment?parameters[uid]=' + uid).map(response => response.json()).catch(err => Observable.throw(err));
  }

  createComment(comment): Observable<any>{
    return this.mainService.post('/api/comment', comment).map(response => response.json()).catch(err => Observable.throw(err));
  }

  updateComment(comment): Observable<any>{
    return this.mainService.put('/api/comment/' + comment.cid, comment).map(response => response.json()).catch(err => Observable.throw(err));
  }

  deleteComment(cid: number): Observable<any>{
    return this.mainService.delete('/api/comment/' + cid).map(response => response.json()).catch(err => Observable.throw(err));
  }
}
