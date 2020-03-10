import { Component, OnInit } from '@angular/core';
import {TypeDeclarationService} from '../services/TypeDeclaration.service';
import {TypeDeclaration} from '../models/typeDeclaration.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-type-declaration-detail',
  templateUrl: './type-declaration-detail.component.html',
  styleUrls: ['./type-declaration-detail.component.scss']
})
export class TypeDeclarationDetailComponent implements OnInit {

  id: number;
  oTypeDeclaration: TypeDeclaration;

  constructor(private typeDeclarationService: TypeDeclarationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.oTypeDeclaration = this.typeDeclarationService.getOneTypeDeclarationById(+this.id)
  }

}
