import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitAchatComponent } from './init-achat.component';

describe('InitAchatComponent', () => {
  let component: InitAchatComponent;
  let fixture: ComponentFixture<InitAchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitAchatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitAchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
