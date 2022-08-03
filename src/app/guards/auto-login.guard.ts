import { LstorageService } from './../services/lstorage.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor (
    private serStorage: LstorageService,
    private router: Router
  ) { }

  canLoad(): boolean {
    let user = this.serStorage.get('user');
    if (user){
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return false;
    } else {
      return true;
    }
  }
}
