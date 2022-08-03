import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private listSource = new BehaviorSubject<any[]>([]);
  $getListSource = this.listSource.asObservable();

  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();

  constructor() { }

  enviarObject(data:any){
    this.objectSource.next(data);
  }
  
  enviarList(list: any[]){
    this.listSource.next(list);
  }
}
