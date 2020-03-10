import { Component, OnInit, OnDestroy } from '@angular/core';
import { TypeDeclarationService } from '../services/TypeDeclaration.service';
import { Subscription } from 'rxjs';
import {TypeDeclaration} from '../models/typeDeclaration.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-type-declaration-list',
  templateUrl: './type-declaration-list.component.html',
  styleUrls: ['./type-declaration-list.component.scss']
})
export class TypeDeclarationListComponent implements OnInit, OnDestroy {

  aTypeDeclarations: TypeDeclaration[];
  typeDeclarationSubscription: Subscription;

  oTypeDeclaration: TypeDeclaration;
  id: number;

  constructor(private  typeDeclarationService: TypeDeclarationService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.oTypeDeclaration = this.typeDeclarationService.getOneTypeDeclarationById(+this.id);

    this.typeDeclarationService.getTypeDeclarationFromServer();
    this.typeDeclarationSubscription = this.typeDeclarationService.typeDeclarationSubject.subscribe(
      (tab: any[]) => {
        this.aTypeDeclarations = tab;
        console.log(this.aTypeDeclarations);
      }
    );
    this.typeDeclarationService.emitTypeDeclarationSubject();
  }

  ngOnDestroy() {
    this.typeDeclarationSubscription.unsubscribe();
  }

  onDelete() {
    // this.typeDeclarationService.deleteTypeDeclaration(this.id);
  }

}
