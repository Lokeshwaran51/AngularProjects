import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule, MatCardModule, MatFormField, MatInputModule],
  templateUrl: './create.html',
  styleUrls: ['./create.css']  
})
export class Create {

  createForm!: FormGroup;  
  message: string = "";

  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', Validators.required),
      department: new FormControl('')
    });
  }

  onSubmit(): void {  
    /* const name = this.createForm.get('name')?.value;
    console.log('Name entered:', name); */
    const newEmployee = this.createForm.value; // no 'id'
    console.log('Creating employee:', newEmployee);

    if (this.createForm.valid) {
      this.auth.createEmployee(newEmployee).subscribe({
        next: () => {
          this.message = "Employee created successfully!";
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.message = "Error creating employee.";
        }
      });
    } else {
      this.message = "Please fill all required fields.";
    }
  }
}
