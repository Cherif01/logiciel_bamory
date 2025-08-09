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

@Component({
  selector: 'app-client',
  imports: [SHARED_IMPORTS],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent {
  title: string = 'Gestion des Clients';
  // created_by = localStorage.getItem('id_user');
  Fournisseur = new FormGroup({
    societe: new FormControl('', Validators.required),
    representant: new FormControl('', Validators.required),
    pays: new FormControl(''),
    ville: new FormControl(''),
    adresse: new FormControl(''),
    telephone: new FormControl('', Validators.required),
    email: new FormControl(''),
    table: new FormControl('clients'),
    // created_by: new FormControl(this.created_by, Validators.required),
  });
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'id',
    'societe',
    'pays',
    'adresse',
    'contact',
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
    this.getAll();
  }

  getAll() {
    this.service.getall('client', 'readAll.php').subscribe({
      next: (reponse: any) => {
        console.log('REPONSE SUCCESS : ', reponse);
        this.dataSource.data = reponse.data;
      },
      error: (err: any) => {
        console.error("ERREUR DANS L'APPEL API : ", err);
        // alert(JSON.stringify(err)); // temporairement, pour tester
      },
    });
  }

  onAjouter() {
    if (this.Fournisseur.valid) {
      const formData = convertObjectInFormData(this.Fournisseur.value);
      this.service.create('public', 'create.php', formData).subscribe({
        next: (response) => {
          // console.log('Fournisseur',response);

          const message =
            response?.message || 'Fournisseur  Enregistrer avec succès !';
          this.snackBar.open(message, 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['bg-success', 'text-white'],
          });
          this.Fournisseur.reset();
          this.getAll();
        },
        error: (err) => {
          this.snackBar.open('Erreur, Veuillez reessayer!', 'Okay', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: ['bg-danger', 'text-white'],
          });
          console.log('Error : ', err);
        },
      });
    }
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
          this.getAll();
        }
      });
  }
}
