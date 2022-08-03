import { LstorageService } from './../services/lstorage.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor (
    private serStorage: LstorageService,
    private router: Router
  ) { }
  
  canLoad(): boolean {
    let user = this.serStorage.get('user');
    if(user){
      return true;
    } else{
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    }
  }
}
