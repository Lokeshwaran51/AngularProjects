import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  //private baseUrl = '/db.json';
  private baseUrl = 'http://localhost:3000/employees';
  private jwtUrl = 'http://localhost:3000/admins';
  
  constructor(private http:HttpClient){
  }
  
  getAllEmployees(){
    return this.http.get(this.baseUrl);
  }

  getEmployeeById(id:any){
    return this.http.get(this.baseUrl + "/" + id);
  }

  createEmployee(obj:any){
    return this.http.post(this.baseUrl, obj);  
  }

  updateEmployee(id:any, obj:any){
    return this.http.put(this.baseUrl + "/" + id, obj)
  }

  deleteEmployee(id:any){
    return this.http.delete(this.baseUrl + "/" + id);
  }
  

  SignUp(obj:any):Observable<any>{
    return this.http.post(this.jwtUrl, obj);
  }

private generateToken(payload: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const body = btoa(JSON.stringify(payload));
    const signature = btoa('secret'); // fake signature
    return `${header}.${body}.${signature}`;
  }

  login(email: string, password: string): Observable<string> {
    return this.http.get<any[]>(`${this.jwtUrl}?email=${email}&password=${password}`)
      .pipe(
        map(admins => {
          if (admins.length > 0) {
            const payload = { id: admins[0].id, email: admins[0].email, name: admins[0].name };
            const token = this.generateToken(payload);
            localStorage.setItem('jwtToken', token);
            return token;
          } else {
            alert('Invalid email or password');
            throw new Error('Invalid email or password');
          }
        }),
        catchError(err => throwError(() => err))
      );
  }

   logout() {
    localStorage.removeItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwtToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

 /* signInWithGoogle(user: any) {
  return this.http.get<any[]>(`${this.jwtUrl}?email=${user.email}`).pipe(
    switchMap(users => {
      if (users.length) {
        // Existing user
        const token = btoa(JSON.stringify({ email: users[0].email, id: users[0].id }));
        localStorage.setItem('token', token);
        return of(token); 
      } else {
        // New user: return POST observable
        const newUser = { fullName: user.name, email: user.email, password: '' };
        return this.http.post<any>(this.jwtUrl, newUser).pipe(
          map(createdUser => {
            const token = btoa(JSON.stringify({ email: createdUser.email, id: createdUser.id }));
            localStorage.setItem('token', token);
            return token;
          })
        );
      }
    })
  );
} */

   signInWithGoogle(user: any): void {
    console.log('Google user:', user);
    localStorage.setItem('google_user', JSON.stringify(user));
  }


}
