import { Subject } from 'rxjs/Subject';
import { User } from '../models/User.model';

export class UserService {
  private users: User[] = [
    new User('Toto', 'Litoto','toto@gmail.com', 'Rhum', ['pas grand chose', 'rien']),
    new User('Titi', 'Lititi', 'titi@gmail.com', 'Oasis')
  ];
  userSubject = new Subject<User[]>();

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }
}
