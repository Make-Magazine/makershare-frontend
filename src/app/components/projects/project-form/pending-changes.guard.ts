import {CanDeactivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {Injectable,} from '@angular/core';
import {Observable} from 'rxjs';

declare var swal:any;
export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): boolean | Observable<boolean> {
    // if there are no pending changes, just allow deactivation; else confirm first
    return component.canDeactivate() ?
      true :
      // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
      // when navigating away from your angular app, the browser will show a generic warning message
      // see http://stackoverflow.com/a/42207299/7307355
      // confirm('You have unsaved changes, are you sure you want to leave this page?');
      swal({
        title: "Are you sure?",
        text: "You have unsaved changes, are you sure you want to leave this page?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#4F4F4F",
        confirmButtonText: "Yes, discard changes!",
        closeOnConfirm: false
      },
      (confirm)=>{
        if(confirm)
          window.location.href = nextState.url;
      });
  }
  
}