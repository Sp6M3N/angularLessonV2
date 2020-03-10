import { Component, OnInit, Input } from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() editForm: FormGroup; //FORM BUILDER DE L'OBJET
  @Input() oValue: any; //OBJET A MODIFIER (NGMODEL)
  @Input() oService: any; //SERVICE ASSOCIÉ À L'OBJET
  @Input() returnLink; //lien de retour
  @Input() aProperties: any[];
  @Input() sAction: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  updateObject() {
    this.oService.update(this.oValue);
    this.router.navigate([this.returnLink])
  }
  fCompare(o1: any, o2:any){
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
