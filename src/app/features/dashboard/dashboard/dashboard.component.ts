import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Role } from '../../../core/models/role';

import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  Role = Role;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  canAccessAdmin(): boolean {
    const role = this.auth.currentUserValue?.role;
    return role === Role.ADMIN || role === Role.SUPER_ADMIN;
  }

  canAccessSuperAdmin(): boolean {
    return this.auth.currentUserValue?.role === Role.SUPER_ADMIN;
  }
}
