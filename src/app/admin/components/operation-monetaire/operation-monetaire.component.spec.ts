import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationMonetaireComponent } from './operation-monetaire.component';

describe('OperationMonetaireComponent', () => {
  let component: OperationMonetaireComponent;
  let fixture: ComponentFixture<OperationMonetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationMonetaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationMonetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
