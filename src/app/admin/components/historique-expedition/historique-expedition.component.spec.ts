import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueExpeditionComponent } from './historique-expedition.component';

describe('HistoriqueExpeditionComponent', () => {
  let component: HistoriqueExpeditionComponent;
  let fixture: ComponentFixture<HistoriqueExpeditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueExpeditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
