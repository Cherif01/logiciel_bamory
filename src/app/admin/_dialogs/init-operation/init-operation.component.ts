import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { PublicServiceService } from '../../../shared/services/public/public-service.service';
import { response } from 'express';

@Component({
  selector: 'app-init-operation',
  imports: [SHARED_IMPORTS],
  templateUrl: './init-operation.component.html',
  styleUrl: './init-operation.component.scss'
})
export class InitOperationComponent {
  formOperation!: FormGroup;

  List: any = [];
  constructor(
    private fb: FormBuilder,
    private service: PublicServiceService,
    private dialogRef: MatDialogRef<InitOperationComponent>
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
    this.formOperation = this.fb.group({
      id_fournisseur: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.formOperation.valid) {
      const data = this.formOperation.value;
      this.dialogRef.close(data);
    }
  }
}
