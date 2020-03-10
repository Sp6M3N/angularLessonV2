import { Component, OnInit, Input } from '@angular/core';

import { AppareilService } from '../services/Appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName:string;

  @Input() appareilStatus:string;

  @Input() index:number;

  @Input() id:number;

  constructor(private appareilService: AppareilService) {

  }

  ngOnInit() {

  }

  getStatus() {
    return this.appareilStatus;
  }

  getColor() {
    if (this.appareilStatus === "Stock"){
      return 'green';
    }else if (this.appareilStatus === "Rupture"){
      return 'red';
    }
  }

  onSwitch() {
    if (this.appareilStatus === 'Stock'){
      this.appareilService.ruptureOne(this.index);
    }else if (this.appareilStatus === 'Rupture'){
      this.appareilService.stockOne(this.index);
    }
  }

  onDelete() {
    this.appareilService.deleteAppareil(this.id);
  }
}
