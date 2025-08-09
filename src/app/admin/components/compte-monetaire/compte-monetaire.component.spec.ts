import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteMonetaireComponent } from './compte-monetaire.component';

describe('CompteMonetaireComponent', () => {
  let component: CompteMonetaireComponent;
  let fixture: ComponentFixture<CompteMonetaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompteMonetaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteMonetaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
