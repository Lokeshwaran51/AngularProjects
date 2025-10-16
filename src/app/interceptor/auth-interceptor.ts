import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const auth = inject(Auth);

  const token = auth.getToken(); // make sure getToken() exists in Auth service
  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    /* console.log('Token in localStorage:', localStorage.getItem('jwtToken'));
    console.log('Authorization header:', cloned.headers.get('Authorization'));
    console.log('All headers keys:', cloned.headers.keys()); */
  

    return next(cloned); // pass modified request
  }

  return next(req); // pass original request
};
