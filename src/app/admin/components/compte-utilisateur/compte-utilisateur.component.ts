import { Component, ViewChild } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DefaultDeleteComponent } from '../../../shared/default-delete/default-delete.component';
import { PublicServiceService } from '../../../shared/services/public/public-service.service';
import { convertObjectInFormData } from '../../../app.component';
import { AddUserComponent } from '../../_dialogs/add-user/add-user.component';

@Component({
  selector: 'app-compte-utilisateur',
  imports: [SHARED_IMPORTS],
  templateUrl: './compte-utilisateur.component.html',
  styleUrl: './compte-utilisateur.component.scss'
})
export class CompteUtilisateurComponent {
  title: string = 'Liste des Utilisateurs';

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private service: PublicServiceService
  ) {}

  dialogAddUser() {
      this.dialog
        .open(AddUserComponent, {
          width: '450px',
        })
        .afterClosed()
        .subscribe((data: any) => {
          // console.log(data);
          this.service
            .create('initFixing', 'create.php', convertObjectInFormData(data))
            .subscribe({
              next: (response: any) => {
                // console.log(response);
                // this.getFournisseur();
              },
              error: (err: any) => {
                console.log('REPONSE ERROR : ', err);
              },
            });
        });
  }
}
