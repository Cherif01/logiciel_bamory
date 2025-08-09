import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpeditionComponent } from './add-expedition.component';

describe('AddExpeditionComponent', () => {
  let component: AddExpeditionComponent;
  let fixture: ComponentFixture<AddExpeditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExpeditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExpeditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
