import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { Observable } from "rxjs";
import * as globals from '../globals';
import { Http, RequestOptionsArgs ,Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Promise} from "@types/q";



@Injectable()
export class ViewService {
    promisehandleError: any;
headers:Headers;
  constructor(private mainService: MainService , private http: Http) {
    this.buildHeaders();
  
   }

public buildHeaders() {
    this.mainService.getOptions(Option);
}

 


 getView(viewName: string, args?: (string | any)[][]): Observable<any>{
    var string_args = '';
    if(args && args.length > 0){
      var string_args = '?';
      args.forEach((item, index) => {
        string_args += item[0] + '=' + item[1] + '&';
      });
    }
    return this.mainService.get(globals.endpoint + '/' + viewName + string_args).map(res => res.json()).catch(err => Observable.throw(err));
  }


getCountProjectByID(viewName: string , id:string): Observable<any>{
    var string_args = '';
    
   // console.log(string_args);
    return this.mainService.get(globals.endpoint + '/' + viewName + '/'+id).map(res => res.json()).catch(err => Observable.throw(err));
  }

 
add(url: string, obj: any): Promise<any> {
        return this.postRequestData(url, obj);
}

private postRequestData(url: string, data: any): Promise<any> {
        this.buildHeaders();

        return (<any>this.http
            .post(globals.domain + globals.endpoint + '/'+ url  , JSON.stringify(data), { headers: this.headers })) 
            .toPromise()
            .then((res: Response) => {
                if (!res.json()) {
                    
                    return res.json();
                }
                return res.json();
            })
            .catch(this.promisehandleError);
    }


}
