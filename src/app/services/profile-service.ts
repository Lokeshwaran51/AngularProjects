// profile-service.ts
import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private userSignal: WritableSignal<string | null> = signal<string | null>(null);
  

  setUser(user: string) {
    this.userSignal.set(user);
  }

  getUser() {
    return this.userSignal;
  }

  clearUser() {
    this.userSignal.set(null);
  }
}
