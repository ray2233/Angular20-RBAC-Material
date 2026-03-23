import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Role } from './core/models/role';
import { loginGuard } from './core/guards/login.guard';
import { LoginComponent } from './features/auth/login/login.component';


export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },

  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),

    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },

      {
        path: 'admin',
        canActivate: [roleGuard([Role.ADMIN, Role.SUPER_ADMIN])],
        loadComponent: () =>
          import('./features/dashboard/admin/admin.component')
            .then(m => m.AdminComponent)
      },

      {
        path: 'super-admin',
        canActivate: [roleGuard([Role.SUPER_ADMIN])],
        loadComponent: () =>
          import('./features/dashboard/super-admin/super-admin.component')
            .then(m => m.SuperAdminComponent)
      }

    ]
  },

  { path: '**', redirectTo: 'login' }

];
