import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { catchError, map, of, take} from 'rxjs';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID)
  const router = inject(Router);
  if (isPlatformServer(platformId)) {
    console.log("authGuard server")
    return of(false)
  }
  /*
  if (isPlatformBrowser(platformId)) {
    console.log("b")
    return new Observable(subscriber => {
      console.log("ggg")
      authService.isAuthenticated().subscribe({
        next: (res) => {
          console.log('q:');
        },
        error: (err) => {
          console.log('w:')
        },
        complete: () => {
          //this.authenticated = true
          console.log("e")
        }
      });
    }) 
  }*/
  return authService.validateToken().pipe(
    map(e => {
      if (e) {
        console.log("authGuard success")
        return true;
      } else {
        console.log("authGuard fail")
        return false
      }
    }),
    catchError(err => {
      console.log("authGuard error")
      console.log(err)
      router.navigate(['/login']);
      return of(false)
    })
  )

  /*
  if (authService.isAuthenticated()) {
    return true;
  } else {
    console.log('Not logged in - redirecting')
    router.navigate(['/login']);
    return false;
  }
  */
};
