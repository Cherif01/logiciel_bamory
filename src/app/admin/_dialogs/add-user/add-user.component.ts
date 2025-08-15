import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { PublicServiceService } from '../../../shared/services/public/public-service.service';
import { response } from 'express';

@Component({
  selector: 'app-add-user',
  imports: [SHARED_IMPORTS],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  formAddUser!: FormGroup;

  List: any = [];
  constructor(
    private fb: FormBuilder,
    private service: PublicServiceService,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) {
    this.service.getall('fournisseurs', 'readAll.php').subscribe({
      next: (response: any) => {
        // this.List = response;
        this.List = response;
      },
      error: (err: any) => {
        console.log('REPONSE ERROR : ', err);
      },
    });
  }

  ngOnInit(): void {
    this.formAddUser = this.fb.group({
      id_fournisseur: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.formAddUser.valid) {
      const data = this.formAddUser.value;
      this.dialogRef.close(data);
    }
  }
}
