import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from "../services/Appareil.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})

export class AppareilViewComponent implements OnInit, OnDestroy {

  isAuth = false;

  lastUpdate = new Promise(
    (resolve, reject) => {
      const date = new Date();
      setTimeout(
        () => {
          resolve(date);
        }, 2000
      );
    }
  );

  appareils: any[];
  appareilSubscription: Subscription;

  constructor(private appareilService: AppareilService) {

  }

  ngOnInit(){
    this.appareilService.getAppareilsFromServer();
    this.appareilSubscription = this.appareilService.appareilsSubject.subscribe(
      (titi: any[]) => {
        this.appareils = titi;
      }
    );
    this.appareilService.emitAppareilSubject();
  }

  ngOnDestroy(){
    this.appareilSubscription.unsubscribe();
  }

  onStock() {
    this.appareilService.toutEnStock();
  }

  onRupture(){
    if (confirm('Les appareils sont il bien en stock')) {
      this.appareilService.toutEnRupture();
    } else {
      return null;
    }
  }

}
