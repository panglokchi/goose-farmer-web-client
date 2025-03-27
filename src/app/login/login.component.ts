import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  login() {
    // Handle login logic here
    this.authService.login(this.loginForm.value.email ?? '', this.loginForm.value.password ?? '');
  }

  signUp() {
    // Navigate to signup
    console.log('Navigate to signup');
  }

  playAsGuest() {
    // Handle guest login
    console.log('Playing as guest');
  }
}
