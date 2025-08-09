import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

export const SHARED_IMPORTS = [
  NgIf,
  NgFor,
  FormsModule,
  RouterModule,
  CommonModule,
  DemoMaterialModule,
  ReactiveFormsModule,
  NavbarComponent,
  SidebarComponent,
];
