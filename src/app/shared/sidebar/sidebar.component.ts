import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../admin/services/auth/auth-service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, MatIconModule, MatExpansionModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  InfoUser: any = {};
  // id_user = localStorage.getItem('id_user');
  privilege: string = '';

  constructor(private authService: AuthServiceService) {}

  ngOnInit() {
    // this.getUserConnect();
  }

  // getUserConnect() {
  //   this.authService.getClauseID('utilisateur', 'getOne.php', this.id_user).subscribe({
  //     next: (response: any) => {
  //       this.InfoUser = response;
  //       // console.log(response)
  //       this.privilege = response.privilege;
  //     },
  //     error: (error: any) => {
  //       console.log('Erreur : ', error);
  //     },
  //   });
  // }

  // logout() {
  //   this.authService.clearToken();
  // }
}
