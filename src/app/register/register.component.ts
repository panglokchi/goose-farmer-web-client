import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators, ValidationErrors,　AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  key: string | null = null;
  public valid: boolean | null = true;
  public loading = false;

  authService = inject(AuthService);
  gameService = inject(GameService);

  passwordMatchValidator: ValidatorFn = (g: AbstractControl): ValidationErrors | null =>{ 
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password == confirmPassword ? null : { mismatch: true };
  }

  JSON = JSON;

  passwordForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', Validators.minLength(8)),
    confirmPassword: new FormControl('', Validators.minLength(8))
  }, this.passwordMatchValidator)

  constructor(private _route: ActivatedRoute, private router: Router) {}

  submit() {
    this.loading = true;
    this.authService.signUp(this.passwordForm.value.email as string, this.passwordForm.value.password as string).subscribe({
      next: (res) => {
        console.log('res:', res);
      },
      error: (err) => {
        console.log('err:', err)
        this.loading = false;
      },
      complete: () => {
        this.authService.login(this.passwordForm.value.email as string, this.passwordForm.value.password as string).subscribe({
          next: (res) => {
            console.log('res:', res);
            localStorage.setItem('token', res.token)
            localStorage.setItem('tokenExpiry', res.expiry)
            localStorage.setItem('homeTab', "missions")
            this.gameService.updateToken();
          },
          error: (err) => {
            console.log('err:', err);
          },
          complete: () => {
            console.log("login success - redirecting")
            this.router.navigate([''])
          }
        });
      }
    });
  }

  ngOnInit(): void {

  }
}
