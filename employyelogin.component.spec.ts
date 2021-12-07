import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployyeloginComponent } from './employyelogin.component';

describe('EmployyeloginComponent', () => {
  let component: EmployyeloginComponent;
  let fixture: ComponentFixture<EmployyeloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployyeloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployyeloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
