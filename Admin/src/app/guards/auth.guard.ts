// frontend/src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, public configService: ConfigService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log("canActivate--", this.authService.isAuthenticated())
    const currentPath = state.url;
    const isAuthenticated = this.authService.isAuthenticated()

    if (isAuthenticated) {
      // If logged in and trying to access /auth, redirect to /admin
      let userInfo: any = localStorage.getItem('userInfo');
      let userData = JSON.parse(userInfo)
      let role = userData.user.role
      console.log("role=",  role)
      if(role == 'admin'){
        if (currentPath === '/auth') {
          this.router.navigate(['/admin']);
          console.log("authenticated", currentPath)
          return false;
          // return true;
        }
      }
      else{
        console.log("role -- user", role, currentPath)
        if(currentPath.startsWith('/admin') || currentPath === '/auth') {
          setTimeout(() => {
            window.open(this.configService.get("Main_Site_Url") , "_self")
          }, 100);
          console.log("authenticated", currentPath)
          return false;
          // return true;
        }
      }
      return true; // Allow access to other routes
    } else {
      // If not logged in and trying to access /auth, allow access
      if (currentPath === '/auth') {
        console.log("not authenticated", currentPath)
        return true;
        // return true;
      }
      else{
        // this.router.navigate(['/auth']);
        console.log("not authenticated 11", currentPath)
        this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
  }
}
