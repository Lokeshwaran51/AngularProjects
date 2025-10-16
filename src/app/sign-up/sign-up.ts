import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatInput } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';


@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, MatCardModule, RouterModule, MatFormField, MatLabel, MatError, ReactiveFormsModule, MatIconModule, MatInputModule, MatInput],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
    signupForm!: FormGroup;

    constructor(private fb: FormBuilder, private authService: Auth, private router: Router) {}

    ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    if (this.signupForm) {
      this.signupForm.reset();
    }
  }

    onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.SignUp(this.signupForm.value).subscribe({
        next: (response: any) => {
          console.log('Registration successful:', response);
          console.log('Form submitted:', this.signupForm.value);
          alert("Sign Up Successful! please login to continue.");
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Registration failed:', error);
          alert("Sign Up Failed! Please try again.");
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
