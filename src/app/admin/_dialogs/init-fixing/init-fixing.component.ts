import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { PublicServiceService } from '../../../shared/services/public/public-service.service';
import { response } from 'express';

@Component({
  selector: 'app-init-fixing',
  imports: [SHARED_IMPORTS],
  templateUrl: './init-fixing.component.html',
  styleUrl: './init-fixing.component.scss',
})
export class InitFxingComponent {
  formFxing!: FormGroup;

  List: any = [];
  constructor(
    private fb: FormBuilder,
    private service: PublicServiceService,
    private dialogRef: MatDialogRef<InitFxingComponent>
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
    this.formFxing = this.fb.group({
      id_fournisseur: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.formFxing.valid) {
      const data = this.formFxing.value;
      this.dialogRef.close(data);
    }
  }
}
