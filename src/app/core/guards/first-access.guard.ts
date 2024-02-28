import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { AuthDataService } from '../services/auth-data.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class FirstAccessGuard implements CanActivate {
//   constructor(
//     private router: Router,
//     private authDataService: AuthDataService
//   ) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): boolean {
//       const token = this.authDataService.getUserToken();
//       const isFirstAcess = this.authDataService.getIsFirstAcess();

//       if(token && isFirstAcess){
//         return true;
//       }
//       else{
//         this.router.navigate(['autenticacao']);
//         return false;
//       }
//   }
// }
