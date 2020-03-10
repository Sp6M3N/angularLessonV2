import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {TypeDeclarationService} from '../services/TypeDeclaration.service';
import {Router, ActivatedRoute} from '@angular/router';
import {TypeDeclaration} from '../models/typeDeclaration.model';
import {OrganismesService} from '../services/Organismes.service';
import {Organismes} from '../models/Organismes.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-type-declaration-edit',
  templateUrl: './type-declaration-edit.component.html',
  styleUrls: ['./type-declaration-edit.component.scss']
})


export class TypeDeclarationEditComponent implements OnInit {

  typeDeclarationForm: FormGroup;
  id: string;
  oTypeDeclaration: TypeDeclaration;
  sAction: string;
  aOrganismes: Organismes[];
  organismeSubscription: Subscription;
  aOptionsOrganisme: any[] = [];

  constructor(private typeDeclarationService: TypeDeclarationService,
              private organismesService: OrganismesService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.typeDeclarationService.getTypeDeclarationFromServer();
    this.organismesService.getOrganismesFromServer();
    this.organismeSubscription = this.organismesService.organismeSubject.subscribe(
      (tab: Organismes[]) => {
        this.aOrganismes = tab;
        this.aOrganismes.forEach((item) => {
          this.aOptionsOrganisme.push(
            {
              value: item,
              html: item.name
            }
          );
        });
      }
    );
    this.id = this.route.snapshot.params['id'];
    if (this.id != 'new'){
      this.sAction = 'editer';
      this.oTypeDeclaration = this.typeDeclarationService.getOneTypeDeclarationById(+this.id);
    }else {
      this.sAction = 'creer';
      this.oTypeDeclaration = new TypeDeclaration();
    }
    this.formInit();
    console.log(this.oTypeDeclaration);

  }

  formInit(){
    this.typeDeclarationForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        fk_organisme: [this.oTypeDeclaration.fk_organisme, Validators.required],
        valide: ['', Validators.required]
      }
    )
    console.log('formInit', this.typeDeclarationForm);
  }

  // onSubmit() {
  //   if (this.id != 'new'){
  //     this.typeDeclarationService.updateTypeDeclaration(this.oTypeDeclaration);
  //   }else{
  //     this.typeDeclarationService.addTypeDeclaration(this.oTypeDeclaration);
  //   }
  //   this.router.navigate(['/type-declarations']);
  // }

}


