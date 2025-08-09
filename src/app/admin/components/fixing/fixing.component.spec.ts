import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixingComponent } from './fixing.component';

describe('FixingComponent', () => {
  let component: FixingComponent;
  let fixture: ComponentFixture<FixingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
