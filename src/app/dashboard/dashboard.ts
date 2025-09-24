import { Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth';
import { Employee, EmployeeResponse } from '../models/employee.model'; // import the interfaces
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  allEmployees: Employee[] = [];
  message = "";

  constructor(private auth: Auth) {}

  ngOnInit(): void {
    this.auth.getAllEmployees().subscribe((res: any) => {
      this.allEmployees = res.employees; // ✅ now TypeScript knows about employees
      console.log(this.allEmployees);
    });
  }

  delete(id: any): void {
    if (!confirm("Are you sure?")) {
      this.message = "Canceled....!";
      setTimeout(() => this.message = "", 2000);
      return;
    }
    this.auth.deleteEmployee(id).subscribe(() => {
      this.message = "Deleted.....!";
      this.allEmployees = this.allEmployees.filter(emp => emp.id !== id);
      setTimeout(() => this.message = "", 2000);
    });
  }
}