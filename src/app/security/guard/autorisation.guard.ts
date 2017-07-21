import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {User} from "../user";
import {UserService} from "../user.service";

@Injectable()
export class AutorisationGuard implements CanActivate {

  // utilisateur courant
  constructor(private user: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    // On regarde l'utilisateur connecté (2 méthodes possibles)
    // Solution 1
    return this.user.user$
      .filter(u => u !== undefined)
      .map(u => u !== null)
      .do(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/home']);
        }
      });

    // Autre solution (perso)
    /*
    if (this.user.isLoggedIn() || this.user.getUser$()) {
      return true;
    } else {
      return false;
    }
    */
  }
}
