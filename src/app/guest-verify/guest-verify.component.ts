import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators, ValidationErrors,　AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgIf, NgFor, KeyValuePipe } from '@angular/common';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-verify',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './guest-verify.component.html',
  styleUrl: './guest-verify.component.css'
})
export class GuestVerifyComponent {
  key: string | null = null;
  public valid: boolean | null = null;

  authService = inject(AuthService);
  gameService = inject(GameService);

  passwordMatchValidator: ValidatorFn = (g: AbstractControl): ValidationErrors | null =>{ 
    const password = g.get('password')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return password == confirmPassword ? null : { mismatch: true };
  }

  passwordForm = new FormGroup({
    password: new FormControl('', Validators.minLength(8)),
    confirmPassword: new FormControl('', Validators.minLength(8))
  }, this.passwordMatchValidator)

  constructor(private _route: ActivatedRoute, private router: Router) {}

  submit() {
    this.authService.guestVerification(this.key as string, this.passwordForm.value.password as string).subscribe({
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

  ngOnInit(): void {
    this.key = this._route.snapshot.paramMap.get('key');

    if (this.key == null) {
      this.valid = false;
    } else {
      this.authService.checkGuestVerificationToken(this.key).subscribe({
        next: (res) => {
        },
        error: (err) => {
          console.log('err:', err);
          this.valid = false;
        },
        complete: () => {
          console.log('Guest verification token is valid');
          this.valid = true;
        }
      })

    }
  }
}
