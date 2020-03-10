import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/User.service';
import { User } from '../models/User.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[];
  userSubscrition: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userSubscrition = this.userService.userSubject.subscribe(
      (items: User[]) => {
        this.users = items;
      }
    );
    this.userService.emitUsers();
  }

  ngOnDestroy() {
    this.userSubscrition.unsubscribe();
  }

}
