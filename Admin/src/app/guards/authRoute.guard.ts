// frontend/src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, public configService: ConfigService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log("canActivate--", this.authService.isAuthenticated())
    const currentPath = state.url;
    const isAuthenticated = this.authService.isAuthenticated()
    if (isAuthenticated){
        setTimeout(() => {
            window.open(this.configService.get("Main_Site_Url") , "_self")
        }, 100);
        return false
    }
    else{
        return true
    }
  }
}
