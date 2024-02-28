import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
/*import { environment } from 'src/environments/environment';
import { AuthDataService } from '../services/auth-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authDataService: AuthDataService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const token = this.authDataService.getUserToken();
      const isFirstAcess = this.authDataService.getIsFirstAcess();

      if(token && !isFirstAcess){
        return true;
      }
      else if(token && isFirstAcess){
        this.router.navigate(['autenticacao/primeira-vez']);
        return false;
      }
      else{
        this.router.navigate(['autenticacao']);
        return false;
      }
  }

}
*/