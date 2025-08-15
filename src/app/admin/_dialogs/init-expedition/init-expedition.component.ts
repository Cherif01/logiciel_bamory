import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { PublicServiceService } from '../../../shared/services/public/public-service.service';
import { response } from 'express';

@Component({
  selector: 'app-init-expedition',
  imports: [SHARED_IMPORTS],
  templateUrl: './init-expedition.component.html',
  styleUrl: './init-expedition.component.scss'
})
export class InitExpeditionComponent {
  formExpedition!: FormGroup;

  List: any = [];
  constructor(
    private fb: FormBuilder,
    private service: PublicServiceService,
    private dialogRef: MatDialogRef<InitExpeditionComponent>
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
    this.formExpedition = this.fb.group({
      id_fournisseur: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.formExpedition.valid) {
      const data = this.formExpedition.value;
      this.dialogRef.close(data);
    }
  }
}
