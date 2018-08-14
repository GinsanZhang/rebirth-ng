import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

export interface ComponentDeactivate {
  canDeactivate: (currentRoute?: ActivatedRouteSnapshot,
                  currentState?: RouterStateSnapshot,
                  nextState?: RouterStateSnapshot) => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({ providedIn: 'root' })
export class ComponentDeactivateGuard implements CanDeactivate<ComponentDeactivate> {

  canDeactivate(component: ComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate(currentRoute, currentState, nextState) : true;
  }

}
