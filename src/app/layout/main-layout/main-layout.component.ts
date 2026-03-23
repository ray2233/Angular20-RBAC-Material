import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    MatSidenavModule,
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {

@Output() toggleSidebar = new EventEmitter<void>();

onToggle() {
  this.toggleSidebar.emit();
  }
}