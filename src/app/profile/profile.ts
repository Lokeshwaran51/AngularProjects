import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router'; 
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  user: any = null;

  constructor(private profile: ProfileService) {}

  ngOnInit() {
    this.user = this.profile.getUser();
    /* this.auth.userChanged.subscribe(u => this.user = u); */
  }

  logout() {
    this.profile.clearUser();
    localStorage.removeItem('user');
  }
}
