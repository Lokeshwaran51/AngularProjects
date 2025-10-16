import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Auth } from '../services/auth';
import { Employee } from '../models/employee.model'; 
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule,MatTableModule, MatButtonModule, MatIconModule, MatToolbar, MatCardModule ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  allEmployees: Employee[] = [];
  message = "";
  displayedColumns: string[] = ['id','name', 'email', 'mobile', 'department', 'actions'];

  constructor(private auth: Auth, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.auth.getAllEmployees().subscribe((data: any) => {
      this.allEmployees = data;
      this.cd.detectChanges();
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