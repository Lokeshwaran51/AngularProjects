import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '../services/auth';
import { ProfileService } from '../services/profile-service';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private profileService: ProfileService
  ) {}

   ngOnInit() {
    this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

   this.loadGoogleScript();

  google.accounts.id.initialize({
    client_id: '114607439195-536ekqgoi9mnfcel8hv1l6q7o2ibrftu.apps.googleusercontent.com',
    callback: (response: any) => this.handleGoogleResponse(response)
  });
}

  onSubmit(): void {
    if (!this.loginForm.valid) {
      console.log('Login form is invalid');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password).subscribe({
      next: (res: any) => {
        if (res.length) {
          alert('Login successful!');
          const payload = JSON.parse(atob(res.split('.')[1]));
          const user = payload.name; 
          this.profileService.setUser(user);
          localStorage.setItem('user', user)
          //localStorage.setItem('user', JSON.stringify(res[0]));
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials');
        }
      },
      error: (err) => console.error(err)
    });
  }

  handleGoogleResponse(response: any) {
    try {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const user = JSON.parse(atob(base64));

      this.auth.signInWithGoogle(user);

      alert('Google login successful!');
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error parsing Google response', error);
    }
  }

  loadGoogleScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof google !== 'undefined') {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}


  signInWithGoogle(): void {
   /*  if (typeof google !== 'undefined') {
      google.accounts.id.prompt(); 
    } else {
      console.error('Google Identity Services not loaded.');
    } */
    google.accounts.id.prompt(); 
  }
}
