import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import { Http, Response } from '@angular/http';
import { Appareil } from '../models/Appareil.model';

@Injectable()

export class AppareilService {

  appareilsSubject = new Subject<any[]>();

  error:string;

  private appareils: Appareil[] = [];

  constructor(private http: Http,
              private handler: HttpHandler) {

  }

  getAppareilsFromServer(){
    let url = 'http://127.0.0.1:8000/api/appareils';

    let donnees = this.http.get(url)
      .map((res: Response) => {
        this.appareils = res.json().map(
          (titi: Appareil) => new Appareil().deserialize(titi)
        );
        console.log(this.appareils);
      })
      .subscribe(
        data => {
          this.emitAppareilSubject();
        },
        monErreur => {
          this.error = monErreur.message;
          console.log(monErreur);
        }
      );
  }

  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

  toutEnStock() {
    for (const appareil of this.appareils) {
      appareil.status = 'Stock';
      this.emitAppareilSubject();
    }
  }

  toutEnRupture() {
    for (const appareil of this.appareils) {
      appareil.status = 'Rupture';
      this.emitAppareilSubject();
    }
  }

  stockOne(i: number) {
    this.appareils[i].status = 'Stock';
    this.emitAppareilSubject();
  }

  ruptureOne(i: number) {
    this.appareils[i].status = 'Rupture';
    this.emitAppareilSubject();
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(
      (obj) => {
        return obj.id === id;
      }
    );
    return appareil;
  }

  addAppareil(name: string, status: string) {
    let appareilObject = new Appareil();

    appareilObject.name = name;
    appareilObject.status = status;

    let url = 'http://127.0.0.1:8000/api/appareils';
    this.http.post(url, appareilObject)
      .map((toto: Response) => new Appareil().deserialize(toto))
      .subscribe(
        data => {
          this.appareils.push(data);
          this.emitAppareilSubject();
        },
        error => {
          this.error = error.message;
          console.log(error);
        }
      )
  }
  updateAppareil(id:number, name:string, status:string) {
    let appareilOject = {
      id: 0,
      name: '',
      status: ''
    };

    appareilOject.id = id;
    appareilOject.name = name;
    appareilOject.status = status;

    let url = 'http://127.0.0.1:8000/api/appareils/'+id;
    this.http.put(url, appareilOject).subscribe(
      data => {
        this.appareils = [];
        this.getAppareilsFromServer();
      },
      error =>{
        this.error = error.message;
        console.log(error);
      }
    )
  }

  deleteAppareil(id:number) {
    let url = 'http://127.0.0.1:8000/api/appareils/'+id;
    this.http.delete(url).subscribe(
      data => {
        this.appareils = [];
        this.getAppareilsFromServer();
      },
      error =>{
        this.error = error.message;
        console.log(error);
      }
    )
  }
}
