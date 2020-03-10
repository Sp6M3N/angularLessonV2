import {Subject} from 'rxjs/Subject';
import {HttpHandler} from '@angular/common/http';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import {Http, Response} from '@angular/http';
import {Organismes} from '../models/Organismes.model';

@Injectable()

export class OrganismesService {

  organismeSubject = new Subject<any[]>();

  error: string;

  public organismes: Organismes[] = [];
  private url = 'http://localhost:8000/api/organismes';

  constructor(private http: Http,
              private handler: HttpHandler) {

  }
  emitOrganismesSubject(){
    this.organismeSubject.next(this.organismes.slice());
  }

  getOrganismesFromServer(){
    return this.http.get(this.url)
      .map((res: Response) => {
        this.organismes = res.json().map(
          (orga: Organismes) => new Organismes().deserialize(orga)
        );
      })
      .subscribe(
        data => {
          this.emitOrganismesSubject();
        },
        error => {
          this.error = error.message;
          console.log(error);
        }
      );
  }

  // addOrganismes(organisme: Organismes) {
  //   this.http.post(this.url, organisme)
  //     .map(
  //       (toto: Response) => {
  //         this.organismes.push(new Organismes().deserialize(toto));
  //       }
  //     )
  //     .subscribe(
  //       data => {
  //         this.emitOrganismesSubject();
  //       },
  //       error => {
  //         this.error = error.message;
  //         console.log(error);
  //       }
  //     );
  // }

  getOneOrganismesById(id: number) {
    return this.organismes.find(
      (obj) => {
        return obj.id === id;
      }
    );
  }

  update(organisme: Organismes) {
    this.http.put(this.url, organisme)
      .map(
        (res: Response) => {
          new Organismes().deserialize(res)
        }
      )
      .subscribe(
        data => {
          this.organismes = [];
          this.getOrganismesFromServer();
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
        this.organismes = [];
        this.getOrganismesFromServer();
      },
      error =>{
        this.error = error.message;
        console.log(error);
      }
    )
  }
}
