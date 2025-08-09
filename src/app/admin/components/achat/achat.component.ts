import { Component, ViewChild } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { convertObjectInFormData } from '../../../app.component';
import { DefaultDeleteComponent } from '../../../shared/default-delete/default-delete.component';
import { PublicServiceService } from '../../../shared/services/public/public-service.service';
import { InitAchatComponent } from '../../_dialogs/init-achat/init-achat.component';
import { AddItemComponent } from '../../_dialogs/add-item/add-item.component';

@Component({
  selector: 'app-achat',
  imports: [SHARED_IMPORTS],
  templateUrl: './achat.component.html',
  styleUrl: './achat.component.scss',
})
export class AchatComponent {
  title: string = 'Gestion des Achats';
  // created_by = localStorage.getItem('id_user');

  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'id',
    'fournisseur',
    'poids',
    'carrat',
    'status',
    'actions',
  ];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private service: PublicServiceService
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAchatInit();
  }

  getAchatInit() {
    this.dataSource.data = [];
    this.service.getall('initAchat', 'readAll.php').subscribe({
      next: (reponse: any) => {
        // console.log('REPONSE SUCCESS : ', reponse);
        this.dataSource.data = reponse;
      },
      error: (err: any) => {
        console.error("ERREUR DANS L'APPEL API : ", err);
        // alert(JSON.stringify(err)); // temporairement, pour tester
      },
    });
  }

  dialogInitAchat() {
    this.dialog
      .open(InitAchatComponent, {
        width: '450px',
      })
      .afterClosed()
      .subscribe((data: any) => {
        // console.log(data);
        this.service
          .create('initAchat', 'create.php', convertObjectInFormData(data))
          .subscribe({
            next: (response: any) => {
              // console.log(response);
              this.getAchatInit();
            },
            error: (err: any) => {
              console.log('REPONSE ERROR : ', err);
            },
          });
      });
  }

  dialogPanierAchat(idinitAchat: any) {
    // console.log(idinitAchat);
    this.dialog
      .open(AddItemComponent, {
        width: '60%',
        height: 'auto',
        data: { id: idinitAchat },
      })
      .afterClosed()
      .subscribe((result: any) => {
        // console.log(result);
        this.service.create('panierAchat', 'create.php', result).subscribe({
          next: (response: any) => {
            // console.log(response);
            this.getAchatInit();
          },
          error: (err: any) => {
            console.log('REPONSE ERROR : ', err);
          },
        });
      });
  }

  voirFactureAchat(id: number) {
    // Exemple : ouvrir une page ou dialog
    console.log('Afficher facture pour :', id);
  }

  deleteFunction(id: any, table: string) {
    this.dialog
      .open(DefaultDeleteComponent, {
        disableClose: true,
        data: {
          title: 'Suppression demandée!',
          message: 'Voulez-vous vraiment supprimer cet élément ?',
          messageNo: 'Non ?',
          messageYes: 'Confirmer !',
        },
      })
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.service.delete('public', 'delete.php', id).subscribe({
            next: (response: any) => {
              const messageClass =
                response.status == 1
                  ? ['bg-success', 'text-white']
                  : ['bg-danger', 'text-white'];
              this.snackBar.open(response.message, 'Okay', {
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: messageClass,
              });
            },
            error: (err: any) => {
              console.error('Error : ', err);
            },
          });
          this.getAchatInit();
        }
      });
  }
}
