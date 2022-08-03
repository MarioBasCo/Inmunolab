import { LstorageService } from './../../services/lstorage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: any;

  constructor(private  serStorage: LstorageService) { }

  ngOnInit() {
    this.user = this.serStorage.get('user');
  }

}
