import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { Role } from '../models/role';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  username: string;
  role: Role;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(
    this.getUserFromStorage()
  );

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private baseUrl = environment.apiUrl;

  login(username: string, password: string) {
    return this.http
      .get<User[]>(`${this.baseUrl}/users?username=${username}&password=${password}`)
      .pipe(
        map(users => {
          const user = users[0];

          if (user) {
            // 🔥 Mock JWT
            const token = btoa(`${user.username}:mock-jwt`);
            const userWithToken = { ...user, token };

            localStorage.setItem('user', JSON.stringify(userWithToken));
            this.currentUserSubject.next(userWithToken);

            return userWithToken;
          }

          return null;
        })
      );
  }

  logout() {
  localStorage.removeItem('user');
  this.currentUserSubject.next(null);   
  this.router.navigate(['/login']);
}

  private getUserFromStorage(): User | null {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  hasRole(roles: Role[]): boolean {
    const userRole = this.currentUserValue?.role;
    return !!userRole && roles.includes(userRole);
  }
}
