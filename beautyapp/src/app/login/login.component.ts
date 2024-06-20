import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../app/models/user.model'; // Import the User interface

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private router: Router, private userService: UserService) {}

  login(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      const user = users.find((u: User) => u.username === this.username && u.password === this.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/dashboard']);
      } else {
        this.loginError = true;
      }
    });
  }
}
