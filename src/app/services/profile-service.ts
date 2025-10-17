// src/app/services/app-state.service.ts
import { Injectable, EventEmitter } from '@angular/core';

export interface User {
  id?: number;
  name: string;
  email: string;
  picture?: string; 
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  // Holds the current logged-in user
  private currentUser: User | null = null;

  // EventEmitter to notify subscribers when user changes
  userChanged = new EventEmitter<User | null>();

  // Set the user (login or Google login)
  setUser(user: User) {
    this.currentUser = user;
    this.userChanged.emit(this.currentUser); // notify all components
  }

  // Get the current user
  getUser(): User | null {
    return this.currentUser;
  }

  // Clear user info (logout)
  clearUser() {
    this.currentUser = null;
    this.userChanged.emit(null); // notify all components
  }
}
