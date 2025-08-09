import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true, // si c’est un composant standalone
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // created_by: any = localStorage.getItem('id_user');

  constructor(public Location: Location) {}

  logout() {
    // this.authService.clearToken();
  }
}
