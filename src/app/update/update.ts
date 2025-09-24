import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-update',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
  this.route.params.subscribe(res=>{
    this.empId=res['id'];
    console.log(this.empId);
  })
}
message: any;
onSubmit(): void {
  if (this.updateForm.valid) {
    console.log('Updated data:', this.updateForm.value);
    this.message = "Employee updated successfully!";
    // Example: navigate to dashboard
    this.router.navigate(['/dashboard']);
  } else {
    this.message = "Please fill all required fields.";
  }
}


}
