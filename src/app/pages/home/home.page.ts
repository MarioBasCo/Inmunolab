import { CommunicationService } from './../../services/communication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  type: string;

  constructor(private serParams: CommunicationService) { }

  ngOnInit(): void {
    this.serParams.$getObjectSource.subscribe(data => {
      this.type = JSON.parse(JSON.stringify(data))
    });
  }
}
