import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from './services/Appareil.service';

import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angularLesson';

  counterSubscription: Subscription;
  secondes: number;

  constructor(private appareilService: AppareilService) {

  }

  ngOnInit(){
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log("error");
      },
      () => {
        console.log("complete");
      },
    )
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();

  }

}

