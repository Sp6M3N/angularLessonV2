import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  @Input() oProperties: any;
  @Input() oValue: any;
  @Input() oModalParameters: any;
  idUnique: string;

  constructor() { }

  ngOnInit() {
    this.idUnique = "modal" + Math.floor(Math.random() * 1000000000)
  }

}
