import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

import { Auth } from '../services/auth';
import { Employee } from '../models/employee.model';
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'mobile', 'department', 'actions'];
  dataSource = new MatTableDataSource<Employee>();
  message = '';
  //user=signal<string|null>(null);
  user='';

  totalEmployees = 0;
  departmentCount = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private auth: Auth,
    private Profile: ProfileService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    const userSignal = this.Profile.getUser();
    /* this.user.set(userSignal());
    console.log("UserSignal: " +userSignal); */
    this.user= localStorage.getItem('user') || 'Guest';
    console.log("LocalStorage: " + localStorage.getItem('user') || 'Guest');
  }

  loadEmployees(): void {
    this.auth.getAllEmployees().subscribe({
      next: (data: Employee[]) => {
        this.dataSource.data = data;
        this.totalEmployees = data.length;
        this.departmentCount = new Set(data.map(e => e.department)).size;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error loading employees:', err);
        this.message = 'Failed to load employees.';
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("FilterValue:" + filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: any): void {
    if (!confirm('Are you sure you want to delete this employee?')) {
      this.message = 'Action canceled.';
      setTimeout(() => (this.message = ''), 2000);
      return;
    }

    this.auth.deleteEmployee(id).subscribe({
      next: () => {
        this.message = 'Deleted successfully!';
        this.dataSource.data = this.dataSource.data.filter((emp) => emp.id !== id);
        setTimeout(() => (this.message = ''), 2000);
      },
      error: (err) => {
        console.error('Delete failed:', err);
        this.message = 'Failed to delete employee.';
      }
    });
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
