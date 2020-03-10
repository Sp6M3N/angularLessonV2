import {Subject} from 'rxjs/Subject';
import {HttpHandler} from '@angular/common/http';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import {Http, Response} from '@angular/http';
import {TypeDeclaration} from '../models/typeDeclaration.model';

@Injectable()

export class TypeDeclarationService {

  typeDeclarationSubject = new Subject<any[]>();

  error: string;

  public typeDeclarations: TypeDeclaration[] = [];
  private url = 'http://localhost:8000/api/typeDeclarations';

  constructor(private http: Http,
              private handler: HttpHandler) {

  }
  emitTypeDeclarationSubject(){
    this.typeDeclarationSubject.next(this.typeDeclarations.slice());
  }

  getTypeDeclarationFromServer(){
    return this.http.get(this.url)
      .map((res: Response) => {
        this.typeDeclarations = res.json().map(
          (typeDec: TypeDeclaration) => new TypeDeclaration().deserialize(typeDec)
        );
      })
      .subscribe(
        data => {
          this.emitTypeDeclarationSubject();
        },
        error => {
          this.error = error.message;
          console.log(error);
        }
      );
  }

  // addTypeDeclaration(typeDeclaration: TypeDeclaration) {
  //   this.http.post(this.url, typeDeclaration)
  //     .map(
  //       (toto: Response) => {
  //         this.typeDeclarations.push(new TypeDeclaration().deserialize(toto));
  //       }
  //     )
  //     .subscribe(
  //       data => {
  //         this.emitTypeDeclarationSubject();
  //       },
  //       error => {
  //         this.error = error.message;
  //         console.log(error);
  //       }
  //     );
  // }

  getOneTypeDeclarationById(id: number) {
    return this.typeDeclarations.find(
      (obj) => {
        return obj.id === id;
      }
    );
  }

  update(typeDeclaration: TypeDeclaration) {
    this.http.put(this.url, typeDeclaration)
      .map(
        (res: Response) => {
          new TypeDeclaration().deserialize(res)
        }
      )
      .subscribe(
        data => {
          this.typeDeclarations = [];
          this.getTypeDeclarationFromServer();
        },
        error =>{
          this.error = error.message;
          console.log(error);
        }
      )
  }

  delete(id: number) {
    this.http.delete(this.url + "/" + id).subscribe(
      data => {
        this.typeDeclarations = [];
        this.getTypeDeclarationFromServer();
      },
      error =>{
        this.error = error.message;
        console.log(error);
      }
    )
  }
}
