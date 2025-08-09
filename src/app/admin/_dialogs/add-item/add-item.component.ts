import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { PublicServiceService } from '../../../shared/services/public/public-service.service';

@Component({
  selector: 'app-add-item',
  imports: [SHARED_IMPORTS],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent implements OnInit {
  addItemForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: PublicServiceService,
    private dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      items: this.fb.array([]),
    });

    for (let i = 0; i < 100; i++) {
      this.items.push(this.createItem());
    }
  }

  get items(): FormArray {
    return this.addItemForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      poids: [''],
      carrat: [''],
    });
  }

  onSubmit(): void {
    const allItems = this.addItemForm.value.items;

    let dataToSend = allItems.filter((item: any) => {
      return item.poids !== '' && item.carrat !== '';
    });

    if (dataToSend.length === 0) {
      this.toastr.error('Aucune donnée valide à envoyer !');
      return;
    }

    const id = this.data?.id;

    if (!id) {
      this.toastr.error("ID d'achat manquant !");
      return;
    }

    dataToSend = dataToSend.map((item: any) => ({
      ...item,
      id_init_achat: id,
    }));

    this.dialogRef.close(dataToSend);
  }
}
