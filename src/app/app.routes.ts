import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { LoginComponent } from './admin/components/auth/login/login.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'apps/dashboard ',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'apps',
    loadChildren: () =>
      import('./admin/components/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'notfound',
    component: NotfoundComponent,
  },
  {
    path: '**',
    redirectTo: '/notfound',
    pathMatch: 'full',
  },
];
