import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalsetComponent } from './finalset.component';

describe('FinalsetComponent', () => {
  let component: FinalsetComponent;
  let fixture: ComponentFixture<FinalsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
