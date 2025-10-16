import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule, MatFormField, MatInputModule, MatIconModule],
  templateUrl: './update.html',
  styleUrl: './update.css'
})
export class Update implements OnInit{
  constructor(private route:ActivatedRoute, private fb:FormBuilder, private auth:Auth, private router:Router){}
  empId: any;
  empDetails: any;
  isLoaded: boolean = false;
  updateForm!: FormGroup;

ngOnInit():void{
  this.updateForm = this.fb.group({
    name: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    mobile: ['',[Validators.required, Validators.pattern('^[0-9]{10}$')]],
    department: ['',[Validators.required]]
  });

  this.route.params.subscribe(res=>{
    this.empId=res['id'];
    this.getEmployeeById(this.empId);
    console.log(this.empId);
  })
}

getEmployeeById(id:any):void{
  this.auth.getEmployeeById(id).subscribe(res=>{
    this.empDetails=res;
    this.updateForm.patchValue({
      name: this.empDetails.name,
      email: this.empDetails.email,
      mobile: this.empDetails.mobile,
      department: this.empDetails.department
    });
    this.isLoaded = true;
  });
}

message: any;
onSubmit(): void {
  if (this.updateForm.valid) {
    this.auth.updateEmployee(this.empId, this.updateForm.value).subscribe(res => {
      console.log('Updated data:', this.updateForm.value);
      this.message = "Employee updated successfully!";
      // Example: navigate to dashboard
      this.router.navigate(['/dashboard']);
    });
  } else {
    this.message = "Please fill all required fields.";
  }
}


}
