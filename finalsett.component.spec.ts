import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalsettComponent } from './finalsett.component';

describe('FinalsettComponent', () => {
  let component: FinalsettComponent;
  let fixture: ComponentFixture<FinalsettComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalsettComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalsettComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
