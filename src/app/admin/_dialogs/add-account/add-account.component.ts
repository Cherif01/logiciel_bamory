import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { PublicServiceService } from '../../../shared/services/public/public-service.service';
import { response } from 'express';

@Component({
  selector: 'app-add-account',
  imports: [SHARED_IMPORTS],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.scss'
})
export class AddAccountComponent {
  formAddAccount!: FormGroup;

  List: any = [];
  constructor(
    private fb: FormBuilder,
    private service: PublicServiceService,
    private dialogRef: MatDialogRef<AddAccountComponent>
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
    this.formAddAccount = this.fb.group({
      id_fournisseur: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.formAddAccount.valid) {
      const data = this.formAddAccount.value;
      this.dialogRef.close(data);
    }
  }
}
