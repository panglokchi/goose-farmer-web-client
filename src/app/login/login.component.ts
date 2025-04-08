import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  gameService = inject(GameService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private router: Router) {

  }

  login() {
    // Handle login logic here
    // this.authService.login(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '');

    this.authService.login(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '').subscribe({
      next: (res) => {
        console.log('res:', res);
        localStorage.setItem('token', res.token)
        localStorage.setItem('tokenExpiry', res.expiry)
        localStorage.setItem('homeTab', "missions")
        this.gameService.updateToken();
      },
      error: (err) => {
        console.log('err:', err)
      },
      complete: () => {
        //this.authenticated = true
        console.log("login success - redirecting")
        this.router.navigate([''])
      }
    });
  }

  signUp() {
    // Navigate to signup
    console.log('Navigate to signup');
    this.router.navigate(['/register']);
  }

  playAsGuest() {
    // Handle guest login
    console.log('Playing as guest');
    this.authService.guestSignup().subscribe({
      next: (res) => {
        console.log('res:', res);
        localStorage.setItem('token', res.token)
        localStorage.setItem('tokenExpiry', res.expiry)
        localStorage.setItem('homeTab', "missions")
        this.gameService.updateToken();
      },
      error: (err) => {
        console.log('err:', err)
      },
      complete: () => {
        //this.authenticated = true
        console.log("login success - redirecting")
        this.router.navigate([''])
      }
    })
  }
}
