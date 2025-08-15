import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitFxingComponent } from './init-fixing.component';

describe('InitAchatComponent', () => {
  let component: InitFxingComponent;
  let fixture: ComponentFixture<InitFxingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitFxingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitFxingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
