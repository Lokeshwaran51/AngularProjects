import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
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
    const name = this.createForm.get('name')?.value;
    console.log('Name entered:', name);

    if (this.createForm.valid) {
      this.auth.createEmployee(this.createForm.value).subscribe({
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
