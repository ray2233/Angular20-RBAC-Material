import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-super-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})

export class SuperAdminComponent {

  constructor() {}
}
