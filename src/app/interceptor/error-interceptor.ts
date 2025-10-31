import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const router=inject(Router);
  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      let ErrorMsg='';
      if(error.error instanceof ErrorEvent){
        ErrorMsg=`Client Error:${error.error.message}`;
      }
      else{
        switch(error.status){
          case 400:
            ErrorMsg=`Bad Request`;
            break;
            case 401:
              ErrorMsg=`Unauthorized.Redirecting to Login.`;
              router.navigate(['/Login']);
              break;
            case 403:
              ErrorMsg=`Forbidden: Access denied.`;
              break;
            case 404:
              ErrorMsg=`Resource Not Found.`;
              break;
            case 500:
              ErrorMsg=`Internal Server Error.`;
              break;
            default:
              ErrorMsg=`Unexpected error: ${error.status}`;
        }
      }
      console.error('Error intercepted:', ErrorMsg);
      alert(ErrorMsg); 
      return throwError(() => new Error(ErrorMsg));
    })
  );
};
