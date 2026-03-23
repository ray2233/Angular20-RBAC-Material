
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Role } from '../../core/models/role';
import { Input } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private auth: AuthService) {}

  @Output() closeSidebar = new EventEmitter<void>();

  close() {
    this.closeSidebar.emit();
  }

  get role(): Role | undefined {
    return this.auth.currentUserValue?.role;
  }

  isAdmin(): boolean {
    return this.role === Role.ADMIN;
  }

  isSuperAdmin(): boolean {
    return this.role === Role.SUPER_ADMIN;
  }

  canAccessAdmin(): boolean {
    return this.role === Role.ADMIN || this.role === Role.SUPER_ADMIN;
  }
}
