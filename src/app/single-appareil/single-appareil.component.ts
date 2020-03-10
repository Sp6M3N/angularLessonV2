import { Component, OnInit } from '@angular/core';
import {AppareilService } from "../services/Appareil.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})

export class SingleAppareilComponent implements OnInit {

  id: number;
  name: string = 'Appareil';
  status: string = 'Statut';

  constructor(private appareilService: AppareilService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.name = this.appareilService.getAppareilById(+this.id).name;
    this.status = this.appareilService.getAppareilById(+this.id).status;

  }

  updateAppareil() {
    this.appareilService.updateAppareil(this.id, this.name, this.status);
  }

}
