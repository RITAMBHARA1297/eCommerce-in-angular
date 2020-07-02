import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EncodeDecodeService } from '../services/encode-decode.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token;
  constructor(private Encode: EncodeDecodeService,private route: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.token = this.Encode.encrypting('token');
      if (this.token) {
        return true;
      } else {
        this.route.navigate(['/login']);
      }
  }
  
}
